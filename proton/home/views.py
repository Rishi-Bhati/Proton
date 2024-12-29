from django.shortcuts import render
from .models import *
from .forms import UserRegistrationForm
from django.shortcuts import redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

# Define a view function to handle the index page
def index(request):
    # Render the index.html template
    return render(request, 'index.html')

def home(request):
    # Render the home.html template
    return render(request, 'home.html')

# Define a view function to handle user registration
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
            
            # Redirect the user to the home page
            return redirect('home')
    else:
        # Create an empty UserRegistrationForm instance
        form = UserRegistrationForm()
        
    # Render the registration/register.html template with the form
    return render(request, 'registration/register.html', {'form': form})