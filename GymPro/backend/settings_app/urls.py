from django.urls import path
from .views import GymSettingAPIView

urlpatterns = [
    path("", GymSettingAPIView.as_view()),
]