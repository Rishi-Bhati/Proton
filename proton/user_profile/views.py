from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from team.models import member
from team.forms import memberForm

@login_required
def profile(request):
    user = request.user
    # Get or create the member instance for the logged-in user
    profile, created = member.objects.get_or_create(user=user)
    
    if request.method == 'POST':
        form = memberForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = memberForm(instance=profile)
    
    return render(request, 'profile.html', {'form': form})