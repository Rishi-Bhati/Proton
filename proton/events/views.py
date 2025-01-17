from django.shortcuts import render
from .models import Event

# Create your views here.

def events(request):
    events = Event.objects.all().order_by('-created_at')
    return render(request, 'events.html', {'events': events})