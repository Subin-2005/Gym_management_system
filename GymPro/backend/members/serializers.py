from rest_framework import serializers
from .models import Member
from membership.serializers import MembershipSerializer


class MemberSerializer(serializers.ModelSerializer):

    photo = serializers.ImageField(required=False, allow_null=True)
    current_membership = serializers.SerializerMethodField()
    membership_history = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id",
            "membership_id",
            "photo",
            "member_name",
            "dob",
            "gender",
            "phone",
            "email",
            "joining_date",
            "is_active",
            "current_membership",
            "membership_history",
        ]
        read_only_fields = [
            "id",
            "membership_id",
            "joining_date",
            "is_active",
        ]


    # def validate_phone(self, value):
    #     if Member.objects.filter(phone=value).exists():
    #         raise serializers.ValidationError("Phone number already exists")
    #     return value

    def validate_phone(self, value):

        queryset = Member.objects.filter(phone=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Phone number already exists")

        return value
    
    # def validate_email(self, value):
    #     if Member.objects.filter(email=value).exists():
    #         raise serializers.ValidationError("Email already exists")
    #     return value

    def validate_email(self, value):

        queryset = Member.objects.filter(email=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Email already exists")

        return value
    
    def get_current_membership(self, obj):
        membership = obj.memberships.order_by("-payment_date").first()

        if membership:
            return MembershipSerializer(membership).data
        
        return None
    
    def get_membership_history(self, obj):
        memberships = obj.memberships.order_by("-payment_date")
        return MembershipSerializer(memberships, many=True).data
    

    def to_representation(self, instance):

        data = super().to_representation(instance)

        request = self.context.get("request")

        if instance.photo:
            if request:
                data["photo"] = request.build_absolute_uri(instance.photo.url)
            else:
                data["photo"] = instance.photo.url

        return data