from django.db import models
from django.conf import settings


class GymSetting(models.Model):

    trainer = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="gym_setting"
    )

    gym_name = models.CharField(
        max_length=150,
        default="GymPro Fitness"
    )

    logo = models.ImageField(
        upload_to="gym/",
        blank=True,
        null=True
    )

    address = models.TextField(
        blank=True
    )

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    def __str__(self):
        return self.gym_name