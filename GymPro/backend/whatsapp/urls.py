from django.urls import path
from .views import WhatsAppSettingAPIView, WhatsAppMessageAPIView

urlpatterns = [
    path("whatsapp/settings/", WhatsAppSettingAPIView.as_view()),
    path("whatsapp/message/<int:member_id>/", WhatsAppMessageAPIView.as_view()),
]