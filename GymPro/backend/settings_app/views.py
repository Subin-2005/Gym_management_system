from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import GymSetting
from .serializers import GymSettingSerializer


class GymSettingAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        setting, created = GymSetting.objects.get_or_create(trainer=request.user)

        serializer = GymSettingSerializer(
            setting,
            context={"request": request}
        )

        return Response(serializer.data)

    def put(self, request):

        setting, created = GymSetting.objects.get_or_create(trainer=request.user)

        serializer = GymSettingSerializer(
            setting,
            data=request.data,
            # files = request.FILES,
            partial=True,
            context = {"request": request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)