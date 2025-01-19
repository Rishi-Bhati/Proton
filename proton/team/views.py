from django.shortcuts import render
from .models import member

# Create your views here.
def team(request):
    members = member.objects.all()
    return render(request, 'team.html', {'members': members})