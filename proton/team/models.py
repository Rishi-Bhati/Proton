from django.db import models

# Create your models here.

class member(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.IntegerField()
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/members_images')
    linkedin = models.URLField()
    github = models.URLField()
    twitter = models.URLField()

    def __str__(self):
        return self.name