from django.urls import path
from .views import ReceiptAPIView

urlpatterns = [
    path("<int:member_id>/", ReceiptAPIView.as_view()),
]