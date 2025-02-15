from django.shortcuts import render
from django.http import JsonResponse
from .models import member

# Create your views here.
def team(request):
    members = member.objects.all()
    return render(request, 'team.html', {'members': members})

def terminal_members(request):
    members = member.objects.all().order_by('position')
    members_list = [
        {
            'name': m.name,
            'role': m.role
        } for m in members
    ]
    return JsonResponse({'members': members_list})