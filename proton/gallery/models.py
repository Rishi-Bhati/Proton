from django.db import models

# Create your models here.

class Photo(models.Model):
    caption = models.CharField(max_length=100)
    image = models.ImageField(upload_to='event_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.caption