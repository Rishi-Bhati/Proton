from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.IntegerField()
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/members_images')
    linkedin = models.URLField()
    github = models.URLField()
    instagram = models.URLField()

    def __str__(self):
        return self.name