from django.contrib import admin
from .models import User, Friend, FriendRequest
# Register your models here.

admin.site.register(User)
admin.site.register(Friend)
admin.site.register(FriendRequest)

