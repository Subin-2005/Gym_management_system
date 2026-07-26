from django.db import models
from django.conf import settings

# Create your models here.

class WhatsAppSetting(models.Model):

    trainer = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="whatsapp_setting"
    )

    enable_reminder = models.BooleanField(default=True)

    reminder_days = models.PositiveIntegerField(default=3)

    template = models.TextField(
        default= """

        Hello {member_name},

        Your membership will expire on {expiry_date}.

        Membership ID : {membership_id}

        Please renew your membership.

        Thank you,
        {gym_name}

        """

    )

    def __str__(self):
        return "Whatsapp Settings"
