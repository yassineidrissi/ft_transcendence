# Generated by Django 4.2.15 on 2024-10-07 09:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ULogin', '0014_user_is_online'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_online',
        ),
    ]
