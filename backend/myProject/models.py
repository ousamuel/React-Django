from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=15)
    description = models.TextField()
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Project(models.Model):
    title = models.CharField(max_length=15)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(unique = False, blank = False, null = False)
    image = models.ImageField(upload_to = 'images', blank = True, null = True)
    def __str__(self):
        return self.title
    
    