from django.contrib import admin
from .models import Member

# Register your models here.


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = (
        "member_name",
        "phone",
        "email",
        "joining_date",
        "is_active",
    )

    search_fields = (
        "member_name",
        "phone",
        "email",
    )

    list_filter = (
        "gender",
        "is_active",
    )


    ordering = ("member_name",)
