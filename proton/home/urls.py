# Import necessary modules from Django for URL routing and configuration
from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include
from django.contrib.auth.urls import views as auth_views
from . import views
from home.views import register

# Define URL patterns for the application, mapping URLs to specific views
urlpatterns = [
    # Define the URL pattern for the home page, mapping to the 'index' view
    path('', views.index, name='home'),
    path('team/', include('team.urls')),
    path('events/', include('events.urls')),
    #gui home
    # path("home/", views.home, name="gui-home"),
    path('home/', views.home, name='home'),
 
    # Define the URL pattern for user registration, mapping to the 'register' view
    path("register/", register, name="register"), 
    path("about/", views.about, name="about"),
    path('accounts/login/', views.terminal_login, name='terminal_login'),
    
]