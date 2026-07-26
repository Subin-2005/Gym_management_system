from django.shortcuts import render

from datetime import timedelta

from django.db.models import Sum
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from members.models import Member
from membership.models import Membership

class DashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        total_members = Member.objects.filter(trainer = request.user).count()
        active_members = Member.objects.filter(trainer = request.user, is_active = True).count()

        expired_today = Membership.objects.filter(member__trainer=request.user, expiry_date=today).count()

        expiry_1_3 = Membership.objects.filter(
            member__trainer=request.user,
            expiry_date__range = (
                today + timedelta(days=1),
                today + timedelta(days=3),
            )
        ).count()

        expiry_4_7 = Membership.objects.filter(
            member__trainer=request.user,
            expiry_date__range = (
                today + timedelta(days=4),
                today + timedelta(days=7),
            )
        ).count()

        expiry_8_15 = Membership.objects.filter(
            member__trainer=request.user,
            expiry_date__range = (
                today + timedelta(days=8),
                today + timedelta(days=15),
            )
        ).count()


        today_collection = (
            Membership.objects.filter(
                member__trainer=request.user,
                payment_date = today
            ).aggregate(
                total = Sum("amount_paid")
            )["total"] or 0
        )

        current_month = today.month
        current_year = today.year

        monthly_collection = (
            Membership.objects.filter(
                member__trainer=request.user,
                payment_date__month = current_month,
                payment_date__year = current_year,
            ).aggregate(
                total = Sum("amount_paid")
            )["total"] or 0
        )


        if current_month == 1:
            last_month = 12
            last_year = current_year - 1

        else:
            last_month = current_month - 1
            last_year = current_year

        last_month_collection = (
            Membership.objects.filter(
                member__trainer=request.user,
                payment_date__month = last_month,
                payment_date__year = last_year,
            ).aggregate(
                total = Sum("amount_paid")
            )["total"] or 0
        )

        total_collection = (
            Membership.objects.filter(
                member__trainer=request.user,
            ).aggregate(
                total = Sum("amount_paid")
            )["total"] or 0
        )


        return Response({
            "today": today.strftime("%d %b %Y"),

            "today_collection": today_collection,

            "expired_today": expired_today,

            "total_members": total_members,

            "active_members": active_members,

            "expiry_1_3": expiry_1_3,

            "expiry_4_7": expiry_4_7,

            "expiry_8_15": expiry_8_15,

            "monthly_collection": monthly_collection,

            "last_month_collection": last_month_collection,

            "total_collection": total_collection,
        })



