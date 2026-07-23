from django.db import models
from members.models import Member
from dateutil.relativedelta import relativedelta
from datetime import timedelta
from django.utils import timezone

# Create your models here.

class Membership(models.Model):

    DURATION_CHOICES = [
        (1, '1 Month'),
        (2, '2 Months'),
        (3, '3 Months'),
        (4, '4 Months'),
        (5, '5 Months'),
        (6, '6 Months'),
        (7, '7 Months'),
        (8, '8 Months'),
        (9, '9 Months'),
        (10, '10 Months'),
        (11, '11 Months'),
        (12, '1 Year'),
    ]

    PAYMENT_CHOICES = [
        ('Cash', 'Cash'),
        ('UPI', 'UPI'),
        ('Card', 'Card'),
        ('Bank', 'Bank'),
    ]

    member = models.ForeignKey(
        Member,
        on_delete=models.CASCADE,
        related_name="memberships"
    )

    membership_duration = models.PositiveSmallIntegerField(
        choices=DURATION_CHOICES
    )

    payment_date = models.DateField(default=timezone.now)

    expiry_date = models.DateField()

    amount_paid = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES
    )

    remarks = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.expiry_date = (
            self.payment_date
            + relativedelta(months=self.membership_duration)
            - timedelta(days=1)
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member.member_name} - {self.get_membership_duration_display()}"
