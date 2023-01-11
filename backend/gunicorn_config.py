
import os

import gunicorn

gunicorn.SERVER_SOFTWARE = "gunicorn"

bind = "0.0.0.0:80"
chdir = "/code"
accesslog = "/var/log/cram/gunicorn-access.log"
errorlog = "/var/log/cram/gunicorn-error.log"

# From https://pythonspeed.com/articles/gunicorn-in-docker/
worker_tmp_dir = "/dev/shm"
workers = os.cpu_count() * 2 + 1
threads = 4

# https://adamj.eu/tech/2019/09/19/working-around-memory-leaks-in-your-django-app/
max_requests = 1000
max_requests_jitter = 50
