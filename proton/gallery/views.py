from django.shortcuts import render
from .models import Photo

# Create your views here.

def photos(request):
    photos = Photo.objects.all().order_by('-created_at')
    return render(request, 'gallery.html', {'photos': photos})