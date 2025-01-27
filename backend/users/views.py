from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import UserRegistrationSerializer, UserSerializer

from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# CORS error :
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status


@method_decorator(csrf_exempt, name='dispatch')
class RegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({'errors': serializer.errors})

        serializer.save()

        user = CustomUser.objects.get(username=serializer.data['username'])
        user.save()

        if user.pfp == "" or user.pfp == None:
            user.pfp = "/pfps/default.png"

        user.save()

        refresh = RefreshToken.for_user(user)

        return Response({'status': 200, 'payload': serializer.data, 'message': "your data has been saved", 'refresh_token': str(refresh), 'access_token': str(refresh.access_token)})


class IsAuthenticated(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = self.request.user
            pfp = user.pfp.url if user.pfp else None
            data = {
                "isAuthenticated": True,
                "message": "Token is valid",
                "user": {
                    "name": f"{user.first_name} {user.last_name}",
                    "pfp": pfp,
                    "email": user.email,
                    "username": user.username,
                    "bio": user.bio,
                    "course": user.course,
                }
            }
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "isAuthenticated": False,
                "message": "Invalid token or authentication failed",
                "error": str(e)
            }, status=status.HTTP_401_UNAUTHORIZED)
