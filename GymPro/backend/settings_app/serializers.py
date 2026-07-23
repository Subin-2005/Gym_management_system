from rest_framework import serializers
from .models import GymSetting


class GymSettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = GymSetting
        fields = "__all__"