# Generated by Django 4.2.14 on 2024-07-22 17:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myProject', '0022_rename_user_project_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='user_id',
            new_name='user',
        ),
    ]
