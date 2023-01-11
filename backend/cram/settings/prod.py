from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_NAME'),
        'USER': 'killian',
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'awseb-e-yr8a5qsk9q-stack-awsebrdsdatabase-xoq3yft6cios',
        'PORT': 5432,
    }
}
