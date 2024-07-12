from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=15)
    description = models.TextField()
    verified = models.BooleanField(default=False)

    def _str_(self):
        return self.name