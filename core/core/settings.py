"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
from pathlib import Path
from datetime import timedelta
from logging.handlers import SysLogHandler

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "chat",
    "game",
    "users",
    "tournament",
    "notifications",
    "daphne",
    "channels",
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

# rest framework

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=45),
    "REFRESH_TOKEN_LIFETIME": timedelta(weeks=2),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "BLACKLIST_AFTER_ROTATION": True,
}


MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# channel layers
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}


ASGI_APPLICATION = "core.asgi.application"
WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "transcendence",
        "HOST": "db",
        "POST": "5432",
        "USER": "pfister",
        "PASSWORD": "password",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'syslog': {
            'level': 'DEBUG',
            'class': 'logging.handlers.SysLogHandler',
            'address': ('logstash', 5045),
            'facility': SysLogHandler.LOG_LOCAL0,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['syslog'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}


AUTH_USER_MODEL = "users.User"

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Media Url
MEDIA_URL = "/media/"

# Media files
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "https://127.0.0.1",
    "https://localhost",
]

# for 42 API
FORTYTWO_CLIENT_ID = os.getenv("FORTYTWO_CLIENT_ID") 
FORTYTWO_CLIENT_SECRET = os.getenv("FORTYTWO_CLIENT_SECRET")


# FORTYTWO_REDIRECT_URI = 'https://api.intra.42.fr/oauth/authorize'
FORTYTWO_REDIRECT_URI = "http://127.0.0.1:8000/api/callback/"
