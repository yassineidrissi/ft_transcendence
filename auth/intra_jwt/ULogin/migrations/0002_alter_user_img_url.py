# Generated by Django 4.2.15 on 2024-09-09 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ULogin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='img_url',
            field=models.ImageField(default='profile_pics/default.jpg', upload_to='profile_pics'),
        ),
    ]
