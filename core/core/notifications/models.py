from django.db import models
from users.models import User


class Notification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    link = models.CharField(max_length=255, blank=True, null=True)
    is_read = models.BooleanField(default=False)
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
