from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginAPIView
# from .views import CreateAdminAPIView

urlpatterns = [
    # path("login/", TokenObtainPairView.as_view(), name="login"),
    # path("refresh/", TokenRefreshView.as_view(), name="refresh"),

    path("login/", LoginAPIView.as_view()),
    # path("create-admin/", CreateAdminAPIView.as_view()),
]