from django.shortcuts import render

from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer


class LoginAPIView(APIView):

    permission_classes = []
    authentication_classes = []

    def post(self, request):

        serializer = LoginSerializer(data = request.data)

        serializer.is_valid(raise_exception = True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(
            username = username,
            password = password
        )

        if user is None:

            return Response(
                {
                    "message": "Invalid Username or Password"
                },
                status = status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),

            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role,
            }
        })


# from django.contrib.auth import get_user_model


# User = get_user_model()

# class CreateAdminAPIView(APIView):
#     permission_classes = []
#     authentication_classes = []

#     def get(self, request):
#         if not User.objects.filter(username="admin").exists():
#             User.objects.create_superuser(
#                 username="admin",
#                 email="admin@gmail.com",
#                 password="Admin@123"
#             )
#         return Response({"message": "Admin created"})
