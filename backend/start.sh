cd /code

# Migrate
./manage.py migrate --noinput

# Create cache table
./manage.py createcachetable

./manage.py collectstatic --noinput

echo "RUNNING NEW"

gunicorn -c gunicorn_config.py cram.wsgi:application