from channels.layers import get_channel_layer


async def send_notification_to_user(data):
    channel_layer = get_channel_layer()
    if not data.get("username"):
        return
    room_group_name = data.get("username")
    await channel_layer.group_send(
        room_group_name,
        {"type": "send.notification", **data},
    )
