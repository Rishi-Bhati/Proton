from django.shortcuts import render
from django.http import JsonResponse
from .models import member

# Create your views here.
def team(request, year=None):
    if year is None:
        latest_member = member.objects.order_by('-year').first()
        if latest_member:
            year = latest_member.year
        else:
            year = 2024

    years = member.objects.values_list('year', flat=True).distinct().order_by('-year')
    
    members = member.objects.filter(year=year).order_by('position')
    
    context = {
        'members': members,
        'years': years,
        'selected_year': str(year),
        'selected_year_color': '#00ff00',
        'other_year_color': '#cccccc',
    }
    return render(request, 'team.html', context)

def terminal_members(request):
    latest_member = member.objects.order_by('-year').first()
    if latest_member:
        year = latest_member.year
    else:
        year = 2024
    members = member.objects.filter(year=year).order_by('position')
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