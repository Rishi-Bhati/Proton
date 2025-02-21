"""
Django settings for proton project.

Generated by 'django-admin startproject' using Django 5.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
import os
# from dotenv import load_dotenv


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = os.getenv('SECRET_KEY')
SECRET_KEY="django-insecure-*zmywd*=nj0n$4al*a()s@@s19k$tjp07e*41gi%ln8wf8#y3h"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# ALLOWED_HOSTS = ['*']

ALLOWED_HOSTS = ['proton-nmamit.azurewebsites.net', '127.0.0.1', 'localhost']

#, 'proton-nmamit.onrender.com', 'protonnmamit.pythonanywhere.com'

# CSRF_TRUSTED_ORIGINS = [
#     "https://proton-nmamit.azurewebsites.net",
# ]

# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True


# Application definition

# Define the list of installed Django applications
INSTALLED_APPS = [
    # Django admin interface
    'django.contrib.admin',
    # Django authentication system for user authentication
    'django.contrib.auth', 
    # Django content type system
    'django.contrib.contenttypes',
    # Django session framework
    'django.contrib.sessions',
    # Django messaging system
    'django.contrib.messages',
    # Live reload for development
    # 'livereload',
    # Django static file serving
    'django.contrib.staticfiles',
    # Custom 'home' application
    'cloudinary_storage',  # Add this
    'cloudinary',         # And this
    'home', #home app
    'contact', #send email
    'team', #team app
    'events', #events app
    'gallery', #gallery app
]


MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'livereload.middleware.LiveReloadScript',
    'django_user_agents.middleware.UserAgentMiddleware',
]

ROOT_URLCONF = 'proton.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            # Add your template directories here
            BASE_DIR / 'templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'proton.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        # "USER": os.getenv('DB_USER'),
        "USER" : "PrAdmin",
        # "PASSWORD": os.getenv('DB_PASSWORD'),
        "PASSWORD" : "ThisIs@Proton25",
        # "HOST": os.getenv('DB_HOST'),
        "HOST" : "proton-cloud-db.postgres.database.azure.com",
        "PORT": "5432",
        "OPTIONS": {
            "sslmode": "require",
            "sslrootcert": "/path/to/root.crt",  # Path to your root certificate
        },
    }
}

# CLOUDINARY_STORAGE = {
#     'CLOUD_NAME': os.getenv('CLOUD_NAME'),
#     'API_KEY': os.getenv('CLOUDINARY_API_KEY'),
#     'API_SECRET': os.getenv('CLOUDINARY_API_SECRET'),
# }

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': "dzcwrwx30",
    'API_KEY': "615689283988577",
    'API_SECRET': "Q3dJETTt8bGDLyK2kkgB26gcQMA",
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
MEDIA_URL = '/media/'  # This can stay as is
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]




# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

# STATIC_URL = '/static/'
# STATIC_ROOT = BASE_DIR / "staticfiles"
# STATICFILES_DIRS = [
#     BASE_DIR / "static",
# ]

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Custom settings
# Define the URL that will be used to serve media files
# MEDIA_URL = '/media/'

# # Define the root directory where media files will be stored
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# # Define the URL that will be used to serve static files

# Define the directories where static files will be stored



# LOGIN_URL = '/terminal_login/'
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/home'
LOGOUT_REDIRECT_URL = '/home'

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # For Gmail
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# load_dotenv()

EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
