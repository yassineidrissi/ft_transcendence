# Generated by Django 5.1 on 2024-11-02 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=255)),
                ('is_read', models.BooleanField(default=False)),
                ('is_invite', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('fulfill_link', models.CharField(blank=True, max_length=255, null=True)),
                ('reject_link', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
