# Generated by Django 5.1 on 2024-11-01 16:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('game', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='matchgame',
            name='p1',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='p1', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='matchgame',
            name='p2',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='p2', to=settings.AUTH_USER_MODEL),
        ),
    ]
