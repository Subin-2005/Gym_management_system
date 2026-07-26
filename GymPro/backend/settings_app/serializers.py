from rest_framework import serializers
from .models import GymSetting


class GymSettingSerializer(serializers.ModelSerializer):

    logo = serializers.ImageField(required=False)

    class Meta:
        model = GymSetting
        fields = [
            "id",
            "gym_name",
            "logo",
            "address",
            "phone",
            "email",
        ]

    def to_representation(self, instance):

        data = super().to_representation(instance)

        request = self.context.get("request")

        if instance.logo:
            data["logo"] = request.build_absolute_uri(instance.logo.url)

        return data