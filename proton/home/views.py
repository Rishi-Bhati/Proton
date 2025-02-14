from django.shortcuts import render
from .models import *
from .forms import UserRegistrationForm
from django.shortcuts import redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from events.models import Event  # Import the Event model
from team.models import member  # Import the Team model
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login as auth_login
import json


# Define a view function to handle the index page
def index(request):
    # Render the index.html template
    return render(request, 'index.html')

def home(request):
    # Render the home.html template'
    events = Event.objects.all().order_by('-created_at')[:4]
    return render(request, 'home.html',{'events': events})

# Define a view function to handle user registration
@login_required
def register(request):
    # Check if the request method is POST
    if request.method == 'POST':
        # Create a UserRegistrationForm instance with the POST data
        form = UserRegistrationForm(request.POST)
        
        # Check if the form is valid
        if form.is_valid():
            # Save the form data to the database, but don't commit yet
            user = form.save(commit=False)
            
            # Set the user's password
            user.set_password(form.cleaned_data['password1'])
            
            # Save the user to the database
            user.save()
            
            # Log the user in
            login(request, user)
            
            # Redirect the user to the profile creation page
            return redirect('profile')
    else:
        # Create an empty UserRegistrationForm instance
        form = UserRegistrationForm()
        
    # Render the registration/register.html template with the form
    return render(request, 'registration/register.html', {'form': form})

def about(request):
    # Render the about.html template
    members = member.objects.all()[:6]
    return render(request, 'about.html', {'members': members})

@ensure_csrf_cookie
def terminal_login(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/x-www-form-urlencoded':
                username = request.POST.get('username')
                password = request.POST.get('password')
            else:
                data = json.loads(request.body)
                username = data.get('username')
                password = data.get('password')

            if not username or not password:
                return JsonResponse({
                    'success': False,
                    'message': 'Both username and password are required'
                })

            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'success': True,
                    'message': 'Login successful',
                    'redirect': '/home/'
                })
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'Invalid credentials'
                })

        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Invalid request format'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            })

    return JsonResponse({
        'success': False,
        'message': 'Method not allowed'
    }, status=405)
