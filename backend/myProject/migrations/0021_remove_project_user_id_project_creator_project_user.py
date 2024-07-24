# Generated by Django 4.2.14 on 2024-07-22 16:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myProject', '0020_remove_project_creator_remove_project_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='user_id',
        ),
        migrations.AddField(
            model_name='project',
            name='creator',
            field=models.CharField(default='tes', max_length=15),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='user',
            field=models.ForeignKey(default='3', on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]