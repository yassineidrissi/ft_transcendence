from channels.layers import get_channel_layer


async def send_notification_to_user(username, content, link=None):
    channel_layer = get_channel_layer()
    room_group_name = username
    await channel_layer.group_send(
        room_group_name,
        {"type": "send.notification", "content": content, "link": link},
    )
