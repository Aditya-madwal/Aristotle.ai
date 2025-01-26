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

from .gemini_logic import pdf_summarize,roadmap, flashcards
from .gemini_logic.roadmap import generate_roadmap_data

from dotenv import load_dotenv
import os
load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')


class showMe(APIView) :
    def get(self, request) :
        user = self.request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class EmailVerification(APIView) :
#     OTP = None

#     def get(self, request) :
#         user_email = self.request.user.email
#         self.OTP = generate_otp()
#         try :
#             emailstatus = send_mail(
#                 "email verification",
#                 f"Your OTP to verify email in FriendsBook is {self.OTP}, dont share with any one",
#                 settings.EMAIL_HOST_USER,
#                 [user_email],
#                 fail_silently=False,
#             )
#             try:
#                 already_exists = Otp.objects.filter(email=user_email).exists()
#                 if Otp.objects.filter(email=user_email).exists() :
#                     x = Otp.objects.get(email=user_email)
#                     x.otp = str(self.OTP)
#                     x.save()
#                 else :
#                     Otp.objects.create(email = user_email, otp = str(self.OTP))
#             except Exception as e :
#                 print(e)

#         except :
#             return Response("error")
#         return Response("success")
    
    # def post(self, request) :
    #     user_email = self.request.user.email
    #     recieved_otp = str(request.data["otp"])
    #     print("===============")
    #     print(user_email)
    #     print(request.data)
    #     print("===============")
    #     actual_otp = None
    #     try :
    #         x = Otp.objects.get(email = user_email)
    #         actual_otp = str(x.otp)
    #     except :
    #         return Response("otp request not found, first get email verification otp.")

    #     check = True if recieved_otp==actual_otp else False

    #     if check :
    #         user = CustomUser.objects.get(email = user_email)
    #         user.verified = True
    #         # Otp.objects.get(email = user_email).delete()
    #         user.save()
    #         return Response({"status" : "verified"})
    #     else :
    #         return Response(f"some error occured")


from django.shortcuts import get_object_or_404

class RoadmapDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, roadmap_uid, format=None):
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
    
    def post(self, request) :
        topic = request.data["topic"]
        duration = request.data["duration"]
        difficulty = request.data["difficulty"]
        result = generate_roadmap_data(topic=topic, duration=duration, difficulty=difficulty)

        roadmap_obj = Roadmap.objects.create(subject = topic, duration = duration, user = request.user)

        for ms in result["milestones"] :
            x = MileStone.objects.create(title = ms["title"], duration = ms["duration"], status = False, topics = ms["topics"], parent_roadmap = roadmap_obj)
            for r in ms["resources"] :
                Resource.objects.create(type = r["type"], title = r["title"], url = r["url"], description = r["description"], estimated_time = r["estimated_time"], parent_milestone = x)
            for p in ms["projects"] :
                Project.objects.create(title = p["title"], description = p["description"], difficulty = p["difficulty"], parent_milestone = x)
        
        first_milestone = MileStone.objects.filter(parent_roadmap = roadmap_obj)[0]
        roadmap_obj.current_milestone = first_milestone
        roadmap_obj.save()

        serializer = RoadmapSerializer(roadmap_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyCalender(APIView) :
    permission_classes = [IsAuthenticated]

    def get(self, request) :
        events = Calendar.objects.filter(user = request.user)
        serializer = CalenderSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) :
        name = request.data["event_name"]
        start_date = request.data["start_date"]
        end_date = request.data["end_date"]
        color = request.data["color"]
        description = request.data["description"]
        status = request.data["status"]

        event = Calendar.objects.create(event_name = name, start_date = start_date, end_date = end_date, color = color, description = description, status = status, user = request.user)

        serializer = CalenderSerializer(event)

        return Response({"calendar event saved" : serializer})

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

            # Create a PDF instance in the database
            pdf_instance = PDF.objects.create(
                url=pdf_file,
                size=pdf_file.size / 1024,  # File size in KB
                user=self.request.user,
                notes=notes_result,
                parent_roadmap=parent_roadmap
            )

            # Return the generated notes as a response
            return JsonResponse({
                "message": "Notes generated successfully",
                "pdf_uid": pdf_instance.uid,
                "notes": notes_result
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    
    def get(self,request,roadmap_uid, pdf_uid) :
        pdf = PDF.objects.get(uid = pdf_uid)
        pdf_chats = PDFChats.objects.filter(pdf = pdf)

        serializer = PDFSerializer(pdf)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Flashcard_operations(APIView) :
    permission_classes = [IsAuthenticated]

    def get(self, request, roadmap_uid, flashcard_uid) :
        json_content = FlashCardSet.objects.get(uid = flashcard_uid)
        serializer = FlashCardSetSerializer(json_content)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, roadmap_uid) :
        roadmap = Roadmap.objects.get(uid = roadmap_uid)
        topic = request.data["topic"]
        data = flashcards.generate_flashcards_for_topic(topic)
        x = FlashCardSet.objects.create(parent_roadmap=roadmap, content = data)
        serializer = FlashCardSetSerializer(x)
        return Response(serializer.data, status=status.HTTP_200_OK)