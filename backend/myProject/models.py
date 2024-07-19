from django.db import models
from django.db import IntegrityError
from django.core.exceptions import ValidationError
import magic

class User(models.Model):
    name = models.CharField(max_length=15)
    linkedin = models.URLField(unique=True, blank=True, null=True)
    descripton = models.TextField(max_length= 50, blank=True,null=True)

    def __str__(self):
        return self.name
    
    
    
def validate_file_type(value):
    file_mime_type = magic.from_buffer(value.read(), mime=True)
    value.seek(0)  
    allowed_mime_types = ['image/png', 'image/jpeg', 'image/jpg']
    
    if file_mime_type not in allowed_mime_types:
        raise ValidationError('Invalid file type. Only PNG, JPG, and JPEG files are allowed.', code=405)
        
class Project(models.Model):
    title = models.CharField(max_length=15, unique = True, blank = False, null = False)
    creator = models.CharField(max_length=15, blank = False, null = False)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(unique = True, blank = False, null = False)
    # for dev
    # image = models.ImageField(validators=[validate_file_type], upload_to = 'images', blank = True, null = True)
    image = models.ImageField(validators=[validate_file_type], upload_to='projects/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.full_clean()  # This will call the validators
        super().save(*args, **kwargs)
    

    def __str__(self):
        return self.title
    
    