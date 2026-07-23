from rest_framework import serializers


class LoginSerializer(serializers.Serializer):

    username = serializers.charField()

    password = serializers.charField(write_only = True)