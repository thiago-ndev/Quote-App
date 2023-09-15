"""
Django settings for Structures_Project project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from . import secret_manager

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-#r&^&dr%r3$2pkw=294!jg15+y&my6k*z!udeq0rp@hwgyztex'

AWS_SECRET_MANAGER_CREDENTIALS = {
    'SECRET_NAME': 'mind-dev-secrets',
    'REGION_NAME': 'us-east-1',
    'ACCESS_KEY': 'AKIAZV5PCL2XRDLYWM4V',
    'SECRET_KEY': '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',
    
}


SECRETS = secret_manager.get_secret(**AWS_SECRET_MANAGER_CREDENTIALS)
SECRET_KEY = SECRETS.get('django_secret_key')
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'mathfilters',
    'Quote_App',
    'django_user_agents'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_user_agents.middleware.UserAgentMiddleware'
]

ROOT_URLCONF = 'Structures_Project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
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

WSGI_APPLICATION = 'Structures_Project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL='media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')






TOKEN_OPLAB = SECRETS.get('token_oplab')
AWS_POOL_ID = SECRETS.get('aws_user_pool_id')
AWS_CLIENT_ID = SECRETS.get('aws_client_id')
AWS_CLIENT_SECRET = SECRETS.get('aws_client_secret')
SELIC_RATE = SECRETS.get('selic_rate_tax')
S3_BUCKET_NAME = SECRETS.get('s3_bucket_name')
S3_PATH_CONTACTS = SECRETS.get('s3_path_contacts')
S3_PATH_STRUCTURES = SECRETS.get('s3_path_structures')
S3_PATH_VOLATILITY = SECRETS.get('s3_path_volatility')
S3_PATH_VOL_BALIZATION = SECRETS.get('s3_path_vol_balization')
AWS_ACCESS_KEY = AWS_SECRET_MANAGER_CREDENTIALS.get('ACCESS_KEY')
AWS_SECRET_KEY = AWS_SECRET_MANAGER_CREDENTIALS.get('SECRET_KEY')
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')