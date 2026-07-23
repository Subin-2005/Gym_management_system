from django.urls import path
from .views import AddMemberAPIView, RenewMembershipAPIView, MemberListAPIView, MemberDetailAPIView

urlpatterns = [
    path(
        "members/add/",
        AddMemberAPIView.as_view(),
        name="add-member",
    ),
    path(
        "members/<int:member_id>/renew/",
        RenewMembershipAPIView.as_view(),
        name="renew-membership",
    ),

    path(
        "members/<int:pk>/",
        MemberDetailAPIView.as_view(),
        name="member-detail",
    ),

    path(
        "members/",
        MemberListAPIView.as_view(),
        name="member-list",
    ),

    
]