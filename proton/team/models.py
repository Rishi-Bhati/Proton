from django.db import models
from django.contrib.auth.models import User
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.core.validators import MinValueValidator, MaxValueValidator  # Added import


# Create your models here.

class member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    position = models.IntegerField(null=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.BigIntegerField(null=True, validators=[
            MinValueValidator(1000000000),  # Ensures phone number has at least 10 digits
            MaxValueValidator   # Ensures phone number has at most 10 digits
        ])
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/members_images', storage=MediaCloudinaryStorage())
    linkedin = models.URLField()
    github = models.URLField()
    instagram = models.URLField()

    def __str__(self):
        return self.name