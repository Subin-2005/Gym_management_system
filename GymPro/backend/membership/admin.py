from django.contrib import admin
from .models import Membership

# Register your models here.

@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):

    list_display = (
        "member",
        "membership_duration",
        "payment_date",
        "expiry_date",
        "amount_paid",
        "payment_type",
    )

    search_fields = (
        "member_member_name",
        "member_phone",
    )

    list_filter = (
        "membership_duration",
        "payment_type",
    )

    readonly_fields = (
        "expiry_date",
    )

    ordering = ("-payment_date",)
