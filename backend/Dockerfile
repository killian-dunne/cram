FROM python:3

ENV DJANGO_SETTINGS_MODULE cram.settings.prod
ENV SECRET_KEY ***REMOVED***
ENV POSTGRES_PASSWORD ***REMOVED***
ENV POSTGRES_NAME ebdb
ENV PYTHONPATH /code

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r /code/requirements.txt

COPY . /code/

RUN mkdir -p /var/log/cram
RUN touch /var/log/cram/django.log

COPY ./start.sh /code/
COPY ./gunicorn_config.py /code/
EXPOSE 80

CMD ["sh", "/code/start.sh"]