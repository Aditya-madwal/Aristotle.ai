from django.shortcuts import get_object_or_404
from httpx import delete
from rest_framework import status
from .logic import *
from django.db.models import Q
from django.conf import settings

from .models import *
from django.http import JsonResponse
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import *

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .gemini_logic import pdf_summarize, roadmap, flashcards
from .gemini_logic.roadmap import generate_roadmap_data
from .gemini_logic.flashcards import FlashcardsSet, generate_flashcards_for_topic
import random

from .ipfs_logic.ipfsServices import IPFSService

from dotenv import load_dotenv
import os
load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')


class showMe(APIView):
    def get(self, request):
        user = self.request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RoadmapDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, roadmap_uid):
        try:
            roadmap = Roadmap.objects.get(uid=roadmap_uid)
            current_milestone = roadmap.current_milestone
            current_milestone.status = True
            current_milestone.save()
            current_milestone = None

            for ms in roadmap.milestones.all():
                if ms.status == False:
                    current_milestone = ms
                    break

            roadmap.current_milestone = current_milestone
            if roadmap.current_milestone is None:
                roadmap.status = True
            roadmap.save()

            return Response(
                {"message": "Milestone completed successfully"},
                status=status.HTTP_200_OK
            )

        except Roadmap.DoesNotExist:
            return Response(
                {"error": "Roadmap not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    # Get all roadmaps
    def get_all_roadmaps(self, request):
        try:
            roadmaps = Roadmap.objects.filter(user=request.user)
            serializer = RoadmapSerializer(roadmaps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": "Failed to get roadmaps", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # Get specific roadmap
    def get_specific_roadmap(self, request, roadmap_uid):
        try:
            roadmap = Roadmap.objects.get(uid=roadmap_uid)
            serializer = RoadmapSerializer(roadmap)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Roadmap.DoesNotExist:
            return Response(
                {"error": "Roadmap not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request, roadmap_uid=None):
        if roadmap_uid is None:
            return self.get_all_roadmaps(request)
        return self.get_specific_roadmap(request, roadmap_uid)

    # create roadmap
    def post(self, request):
        topic = request.data["topic"]
        duration = request.data["duration"]
        difficulty = request.data["difficulty"]
        result = generate_roadmap_data(
            topic=topic, duration=duration, difficulty=difficulty)

        roadmap_obj = Roadmap.objects.create(
            subject=topic, duration=duration, user=request.user)

        for ms in result["milestones"]:
            x = MileStone.objects.create(
                title=ms["title"], duration=ms["duration"], status=False, topics=ms["topics"], parent_roadmap=roadmap_obj)
            for r in ms["resources"]:
                Resource.objects.create(type=r["type"], title=r["title"], url=r["url"],
                                        description=r["description"], estimated_time=r["estimated_time"], parent_milestone=x)
            for p in ms["projects"]:
                Project.objects.create(
                    title=p["title"], description=p["description"], difficulty=p["difficulty"], parent_milestone=x)

        first_milestone = MileStone.objects.filter(
            parent_roadmap=roadmap_obj)[0]
        roadmap_obj.current_milestone = first_milestone
        roadmap_obj.save()

        serializer = RoadmapSerializer(roadmap_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CalendarOperations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        events = Event.objects.filter(user=request.user)
        serializer = CalendarSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data["user"] = request.user.id
        serializer = CalendarSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Calendar event saved", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class PDFoperations(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, roadmap_uid):
        try:
            # Get the uploaded PDF file
            pdf_file = request.FILES.get('file')
            if not pdf_file:
                return JsonResponse({"error": "No file provided"}, status=400)

            # Ensure the parent roadmap exists
            try:
                parent_roadmap = Roadmap.objects.get(uid=roadmap_uid)
            except Roadmap.DoesNotExist:
                return JsonResponse({"error": "Roadmap not found"}, status=404)

            # Initialize the generator
            generator = pdf_summarize.PDFNotesGenerator(api_key=GOOGLE_API_KEY)

           # Generate notes from the uploaded PDF
            notes_result = generator.generate_notes(pdf_file)

            # Reset file pointer to the beginning
            pdf_file.seek(0)

            # Upload file to IPFS
            random_id = ''.join([str(random.randint(0, 9)) for _ in range(9)])
            ipfs_service = IPFSService()
            cid = ipfs_service.upload_file(file=pdf_file, filename=random_id)

            # Create a PDF instance in the database
            pdf_instance = PDF.objects.create(
                url=pdf_file.name,
                size=pdf_file.size / 1024,  # File size in KB
                user=request.user,
                notes=notes_result,
                cid=cid,
                parent_roadmap=parent_roadmap
            )

            # print(ipfs_service.get_file_metadata(pdf_instance.cid))

            # Return response
            return JsonResponse({
                "message": "Notes generated successfully",
                "pdf_uid": pdf_instance.uid,
                "notes": notes_result,
                "cid": cid
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


    # Get all PDFs related to the user and roadmap
    def get_all_pdfs_for_roadmap(self, request, roadmap_uid):
        try:
            roadmap = Roadmap.objects.get(uid=roadmap_uid)
            pdfs = PDF.objects.filter(
                user=request.user, parent_roadmap__uid=roadmap_uid)
            serializer = PDFSerializer(pdfs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": "Failed to get PDFs", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_recent_pdfs(self, request):
        try:
            RECENT_PDFS_LIMIT = 10
            pdfs = PDF.objects.filter(
                user=request.user
            ).order_by(
                '-date_uploaded'
            )[:RECENT_PDFS_LIMIT]

            serializer = PDFSerializer(pdfs, many=True)
            return Response({
                "pdfs": serializer.data,
                "total_count": PDF.objects.filter(user=request.user).count(),
                "limit": RECENT_PDFS_LIMIT
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": "Failed to get PDFs", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_specific_pdf(self, request, roadmap_uid, pdf_uid):
        try:
            pdf = PDF.objects.get(uid=pdf_uid)
            pdf_chats = PDFChats.objects.filter(pdf=pdf)
            serializer = PDFSerializer(pdf)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except PDF.DoesNotExist:
            return Response(
                {"error": "PDF not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request, roadmap_uid=None, pdf_uid=None):
        if pdf_uid is None and roadmap_uid is not None:
            return self.get_all_pdfs_for_roadmap(request, roadmap_uid)
        elif pdf_uid is None and roadmap_uid is None:
            return self.get_recent_pdfs(request)
        return self.get_specific_pdf(request, roadmap_uid, pdf_uid)

    def delete(self, request, roadmap_uid=None, pdf_uid=None):
        try:
            pdf = PDF.objects.get(uid=pdf_uid)
            pdf.delete()
            return Response("messsage: PDF deleted successfully", status=status.HTTP_200_OK)
        except pdf.DoesNotExist:
            return Response("messsage: PDF not found", status=status.HTTP_404_NOT_FOUND)



class Flashcard_operations(APIView):
    permission_classes = [IsAuthenticated]

    def get_all_flashcards(self, request, roadmap_uid):
        try:
            # Get all flashcard sets belonging to the roadmap
            flashcard_sets = FlashCardSet.objects.filter(
                parent_roadmap__uid=roadmap_uid
            )

            serializer = FlashCardSetSerializer(flashcard_sets, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"message": "Failed to get flashcard sets", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_specific_flashcard(self, request, roadmap_uid, flashcard_uid):
        try:
            flashcard_set = FlashCardSet.objects.get(
                uid=flashcard_uid,
                parent_roadmap__uid=roadmap_uid,
            )
            serializer = FlashCardSetSerializer(flashcard_set)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except FlashCardSet.DoesNotExist:
            return Response(
                {"error": "Flashcard set not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request, roadmap_uid, flashcard_uid=None):
        if flashcard_uid is None:
            return self.get_all_flashcards(request, roadmap_uid)
        return self.get_specific_flashcard(request, roadmap_uid, flashcard_uid)

    def post(self, request, roadmap_uid):
        try:
            roadmap = Roadmap.objects.get(uid=roadmap_uid)
            topic = request.data.get("topic")

            if not topic:
                return Response(
                    {"error": "Topic is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            data = generate_flashcards_for_topic(topic)

            # Create flashcard set
            flashcard_set = FlashCardSet.objects.create(
                parent_roadmap=roadmap,
                content=data
            )

            serializer = FlashCardSetSerializer(flashcard_set)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Roadmap.DoesNotExist:
            return Response(
                {"error": "Roadmap not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, roadmap_uid, flashcard_uid):
        try:
            flashcardset = FlashCardSet.objects.get(uid=flashcard_uid)
            flashcards = Flashcard.objects.filter(set_fk=flashcardset)
            flashcards.delete()
            flashcardset.delete()
            return Response({
                "message": "Flashcard deleted successfully"
            }, status=status.HTTP_200_OK)
        except Flashcard.DoesNotExist:
            return Response({
                "error": "Flashcard not found"
            })


class TodoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        todos = Todo.objects.filter(user=request.user)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            # todo = Todo.objects.get(pk=pk, user=request.user)
            # todo.delete()
            todo = Todo.objects.all().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, uid):
        try:
            todo = Todo.objects.get(uid=uid, user=request.user)
            todo.status = not todo.status
            todo.save()
            serializer = TodoSerializer(todo)  # Return updated data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response(
                {"error": "Todo not found"},
                status=status.HTTP_404_NOT_FOUND
            )
