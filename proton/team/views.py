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

def get_member_info(request, name):
    try:
        member_obj = member.objects.get(name__iexact=name)
        return JsonResponse({
            'success': True,
            'data': {
                'name': member_obj.name,
                'role': member_obj.role,
                'email': member_obj.email,
                'linkedin': member_obj.linkedin,
                'github': member_obj.github,
                'instagram': member_obj.instagram
            }
        })
    except member.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': f"Member '{name}' not found"
        })