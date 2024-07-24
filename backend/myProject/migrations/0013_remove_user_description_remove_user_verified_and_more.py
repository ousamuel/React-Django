# Generated by Django 4.2.14 on 2024-07-21 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myProject', '0012_alter_project_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='description',
        ),
        migrations.RemoveField(
            model_name='user',
            name='verified',
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='asd', max_length=254, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='linkedin',
            field=models.URLField(blank=True, null=True, unique=True),
        ),
    ]
