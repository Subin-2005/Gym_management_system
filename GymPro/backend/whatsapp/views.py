from django.shortcuts import render

from django.shortcuts import get_object_or_404
from django.utils.http import urlencode

from members.models import Member
from membership.models import Membership

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import WhatsAppSetting
from .serializers import WhatsAppSettingSerializer

class WhatsAppSettingAPIView(APIView):

    def get(self, request):

        setting = WhatsAppSetting.objects.first()

        if not setting:

            setting = WhatsAppSetting.objects.create()

        serializer = WhatsAppSettingSerializer(setting)
        return Response(serializer.data)
    

    def put(self, request):

        setting = WhatsAppSetting.objects.first()

        serializer = WhatsAppSettingSerializer(
            setting,
            data = request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=400)
    

class WhatsAppMessageAPIView(APIView):

    def get(self, request, member_id):

        setting = WhatsAppSetting.objects.first()

        if not setting:
            setting = WhatsAppSetting.objects.create(
                # enable_reminder = True,
                # reminder_days = 3,
                # template = """
                #     Hi {member_name},

                #     Your Gym membership will expire on {expiry_date}.

                #     plan: {plan}
                #     Membership ID: {membership_id}

                #     Please renew your membership.

                #     Thank You.

                # """
            )

        member = get_object_or_404(Member, pk=member_id, trainer = request.user)

        membership = member.memberships.order_by("-payment_date").first()

        message = setting.template

        message = message.replace(
            "{member_name}",
            member.member_name
        )

        message = message.replace(
            "{membership_id}",
            member.membership_id
        )

        message = message.replace(
            "{phone}",
            member.phone
        )

        if membership:

            message = message.replace(
                "{expiry_date}",
                str(membership.expiry_date)
            )

            message = message.replace(
                "{plan}",
                f"{membership.membership_duration} Month(s)"
            )

        url = (
            f"https://wa.me/91{member.phone}"
            f"?text={urlencode({'': message})[1:]}"
        )

        return Response({"url": url})
