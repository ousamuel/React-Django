python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# python manage.py flush --> clears db
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
sudo systemctl restart gunicorn
sudo systemctl restart nginx