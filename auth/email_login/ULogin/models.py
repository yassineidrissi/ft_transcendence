from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    level = models.IntegerField(default=1)
    img_url = models.CharField(max_length=255, default="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png")
    full_name = models.CharField(max_length=255, default="")
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)

    USERNAME_FIELD = 'email'  # Set email as the primary identifier
    REQUIRED_FIELDS = ['username']  # Add any other fields that are required
    
    def __str__(self):
        return self.email  # or return self.full_name or another field