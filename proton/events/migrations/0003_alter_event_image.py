# Generated by Django 5.1.4 on 2025-02-18 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_registration_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.ImageField(upload_to='event/event_images/'),
        ),
    ]
