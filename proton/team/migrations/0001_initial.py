# Generated by Django 5.1.4 on 2025-01-19 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.IntegerField()),
                ('role', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='team/members_images')),
                ('fb', models.URLField()),
                ('linkedin', models.URLField()),
                ('github', models.URLField()),
                ('twitter', models.URLField()),
            ],
        ),
    ]
