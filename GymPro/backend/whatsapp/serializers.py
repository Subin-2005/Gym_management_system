from rest_framework import serializers
from .models import WhatsAppSetting


class WhatsAppSettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatsAppSetting
        fields = "__all__"