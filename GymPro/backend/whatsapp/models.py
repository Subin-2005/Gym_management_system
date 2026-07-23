from django.db import models

# Create your models here.

class WhatsAppSetting(models.Model):

    enable_reminder = models.BooleanField(default=True)

    reminder_days = models.PositiveIntegerField(default=3)

    template = models.TextField(
        default= """

        Hello {member_name},

        Your membership will expire on {expiry_date}.

        Membership ID : {membership_id}

        Please renew your membership.

        Thank you,
        GymPro

        """

    )

    def __str__(self):
        return "Whatsapp Settings"
