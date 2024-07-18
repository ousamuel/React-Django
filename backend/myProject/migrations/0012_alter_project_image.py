# Generated by Django 4.2.14 on 2024-07-18 18:59

from django.db import migrations, models
import myProject.models


class Migration(migrations.Migration):

    dependencies = [
        ('myProject', '0011_project_creator_alter_project_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='projects/', validators=[myProject.models.validate_file_type]),
        ),
    ]