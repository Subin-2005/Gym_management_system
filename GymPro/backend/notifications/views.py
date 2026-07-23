from django.shortcuts import render
from datetime import timedelta
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response

from membership.models import Membership

# Create your views here.


class NotificationAPIView(APIView):

    def get(self, request):

        today = timezone.now().date()

        notifications = []

        memberships = Membership.objects.filter(member__trainer=request.user).select_related("member")

        for membership in memberships:
            days = (membership.expiry_date - today).days

            if days < 0:
                notifications.append({
                    "member_id": membership.member.id,
                    "member_name": membership.member.member_name,
                    "membership_id": membership.member.membership_id,
                    "message": "Membership Expired",
                    "days": abs(days),
                    "status": "expired",
                })  

            elif(days == 0):

                notifications.append({
                    "member_id": membership.member.id,
                    "member_name": membership.member.member_name,
                    "membership_id": membership.member.membership_id,
                    "message": "Expires Today",
                    "days": 0,
                    "status": "today",
                })

            elif(days <=15):

                notifications.append({
                    "member_id": membership.member.id,
                    "member_name": membership.member.member_name,
                    "membership_id": membership.member.membership_id,
                    "message": f"Expires in {days} day(s)",
                    "days": days,
                    "status": "upcoming",
                })

        notifications.sort(key=lambda x: x["days"])

        return Response(notifications)


