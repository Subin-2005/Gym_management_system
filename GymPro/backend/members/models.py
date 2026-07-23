from django.db import models
from dateutil.relativedelta import relativedelta
from datetime import timedelta
from django.utils import timezone
from django.conf import settings

# Create your models here.

class Member(models.Model):

    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Others', 'Others'),
    ]

    
    membership_id = models.CharField(
        max_length=10,
        unique=True,
        blank=True
    )

    trainer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete= models.CASCADE,
        related_name= "members"
    )


    photo = models.ImageField(
        upload_to='member/',
        blank=True,
        null=True
    )

    member_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES
    )

    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    joining_date = models.DateField(default=timezone.now)

    # membership_duration = models.PositiveSmallIntegerField(
    #     choices=DURATION_CHOICES,
    #     verbose_name= "Membership Duration"
    # )

    # payment_date = models.DateField()

    # expiry_date = models.DateField()

    # payment_type = models.CharField(
    #     max_length=20,
    #     choices=PAYMENT_CHOICES
    # )

    # amount_paid = models.DecimalField(
    #     max_digits=10,
    #     decimal_places=2
    # )

    # remark = models.TextField(
    #     blank=True,
    #     null=True
    # )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    

    def save(self, *args, **kwargs):

        creating = self.pk is None

        super().save(*args, **kwargs)

        if creating and not self.membership_id:
            self.membership_id = f"GYM{self.id:04d}"

            Member.objects.filter(pk=self.pk).update(
                membership_id=self.membership_id
            )

            self.membership_id = f"GYM{self.id:04d}"

    def __str__(self):
        return self.member_name
