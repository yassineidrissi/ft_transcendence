# Generated by Django 5.1 on 2024-11-01 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0005_notification_is_read'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='fulfill_label',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='reject_label',
        ),
    ]
