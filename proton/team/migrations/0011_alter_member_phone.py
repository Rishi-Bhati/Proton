# Generated by Django 5.1.6 on 2025-02-20 08:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0010_alter_member_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='phone',
            field=models.BigIntegerField(null=True, validators=[django.core.validators.MinValueValidator(1000000000), django.core.validators.MaxValueValidator]),
        ),
    ]
