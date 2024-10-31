import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .serializers import NotificationSerializer

from .misc import send_notification_to_user


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = None
        self.user = self.scope["user"]
        if self.user.is_authenticated:
            self.room_group_name = self.user.username
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
            send_notification_to_user(self.user.username, "Hola", "https://localhost")
        else:
            self.close()

    async def disconnect(self, code):
        if self.room_group_name:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )

    async def send_notification(self, event):
        notification_data = await self.save_notification(event)
        if notification_data:
            await self.send(
                text_data=json.dumps(
                    {
                        "link": notification_data.link,
                        "message": notification_data.message,
                        "is_read": notification_data.is_read,
                        "timestamp": str(notification_data.timestamp),
                    }
                )
            )

    @database_sync_to_async
    def save_notification(self, notification):
        notification_data = {
            "user": self.user.id,
            "link": notification["link"],
            "message": notification["message"],
        }
        serialized = NotificationSerializer(data=notification_data)
        if serialized.is_valid():
            return serialized.save()
        return None
