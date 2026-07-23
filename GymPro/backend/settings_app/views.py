from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import GymSetting
from .serializers import GymSettingSerializer


class GymSettingAPIView(APIView):

    def get(self, request):

        setting = GymSetting.objects.first()

        if not setting:
            setting = GymSetting.objects.create()

        serializer = GymSettingSerializer(
            setting,
            context={"request": request}
        )

        return Response(serializer.data)

    def put(self, request):

        setting = GymSetting.objects.first()

        serializer = GymSettingSerializer(
            setting,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)