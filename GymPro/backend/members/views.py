from django.shortcuts import get_object_or_404
from datetime import timedelta

from django.db import transaction
from django.utils import timezone
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView



from .models import Member
from membership.models import Membership

from .serializers import MemberSerializer
from membership.serializers import MembershipSerializer


class AddMemberAPIView(APIView):

    @transaction.atomic
    def post(self, request):

        member_data = {
            "photo": request.data.get("photo"),
            "member_name": request.data.get("member_name"),
            "dob": request.data.get("dob"),
            "gender": request.data.get("gender"),
            "phone": request.data.get("phone"),
            "email": request.data.get("email"),
        }

        member_serializer = MemberSerializer(data=member_data)

        if not member_serializer.is_valid():
            return Response(
                member_serializer.errors,
                status = status.HTTP_400_BAD_REQUEST
            )
        
        member = member_serializer.save(trainer = request.user)

        membership_data = {
            "member": member.id,
            "membership_duration": request.data.get("membership_duration"),
            "payment_date": timezone.now().date(),
            "amount_paid": request.data.get("amount_paid"),
            "payment_type": request.data.get("payment_type"),
            "remarks": request.data.get("remarks"),
        }

        membership_serializer = MembershipSerializer(data=membership_data)

        if not membership_serializer.is_valid():
            transaction.set_rollback(True)

            return Response(
                membership_serializer.errors,
                status = status.HTTP_400_BAD_REQUEST
            )
        
        membership_serializer.save()

        return Response(
            {
                "message": "Member Added Successfully",
                "membership_id": member.membership_id,
            },
            status = status.HTTP_201_CREATED
        )
    

class RenewMembershipAPIView(APIView):

    @transaction.atomic
    def post(self, request, member_id):

        member = get_object_or_404(Member, id=member_id, trainer = request.user)

        membership_data = {
            "member": member.id,
            "membership_duration": request.data.get("membership_duration"),
            "payment_date": timezone.now().date(),
            "amount_paid": request.data.get("amount_paid"),
            "payment_type": request.data.get("payment_type"),
            "remarks": request.data.get("remarks"),
        }

        serializer = MembershipSerializer(data=membership_data)

        if serializer.is_valid():
            membership = serializer.save()

            return Response(
                {
                    "message": "Membership Renewed Successfully",
                    "membership_id": member.membership_id,
                    "expiry_date": membership.expiry_date,
                },
                status = status.HTTP_201_CREATED,
            )
        
        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST,
        )
    

class MemberListAPIView(ListAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = MemberSerializer

    queryset = Member.objects.all().order_by("-created_at")

    def get_queryset(self):

        queryset = Member.objects.filter(trainer = self.request.user).order_by("-created_at")

        search = self.request.GET.get("search", "")
        filter = self.request.GET.get("filter", "")
        today = timezone.now().date()

        if search:
            queryset = queryset.filter(
                Q(member_name__icontains=search) | 
                Q(phone__icontains=search) | 
                Q(email__icontains=search) | 
                Q(membership_id__icontains=search)
            )

        if filter == "active":
            queryset = queryset.filter(is_active = True)

        elif filter == "inactive":
            queryset = queryset.filter(is_active = False)

        if filter in ["expired", "today", "1-3", "4-7", "8-15"]:
            member_ids = []
            for member in queryset:
                membership = member.memberships.order_by("-expiry_date").first()

                if not membership:
                    continue

                days = (membership.expiry_date - today).days

                if filter == "expired" and days<0:
                    member_ids.append(member.id)

                elif filter == "today" and days == 0:
                    member_ids.append(member.id)

                elif filter == "1-3" and 1<= days <= 3:
                    member_ids.append(member.id)

                elif filter == "4-7" and 4<= days <= 7:
                    member_ids.append(member.id)

                elif filter == "8-15" and 8<= days <=15:
                    member_ids.append(member.id)

            queryset = queryset.filter(id__in=member_ids)

        return queryset.distinct()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    
    


class MemberDetailAPIView(APIView):

    def get(self, request, pk):

        member = get_object_or_404(Member, pk=pk, trainer = request.user)

        serializer = MemberSerializer(member, context={"request": request})

        return Response(serializer.data)


    def put(self, request, pk):

        member = get_object_or_404(Member, pk=pk, trainer = request.user)

        serializer = MemberSerializer(
            member,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    def delete(self, request, pk):

        member = get_object_or_404(Member, pk=pk, trainer = request.user)

        member.delete()

        return Response(
            {"message": "Member deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )




