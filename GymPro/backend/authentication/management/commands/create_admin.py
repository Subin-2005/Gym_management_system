import os

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Create admin user if it does not exist"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        username = os.getenv("ADMIN_USERNAME", "admin")
        password = os.getenv("ADMIN_PASSWORD")
        email = os.getenv("ADMIN_EMAIL", "admin@example.com")

        if not password:
            self.stdout.write(
                self.style.ERROR(
                    "ADMIN_PASSWORD environment variable is not set."
                )
            )
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(
                    f"User '{username}' already exists."
                )
            )
            return

        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
            role="admin",
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Admin user '{username}' created successfully."
            )
        )