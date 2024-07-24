from django.db import models
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.exceptions import ValidationError
import magic
from django.dispatch import receiver
from django.db.models.signals import post_save

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(blank = False, null = False)
    last_name = models.CharField(blank = True, null = True)
    linkedin = models.URLField(unique=True, blank=True, null=True)
    # description = models.TextField(blank=True,null=True)

     
    
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()    
    
    
def validate_file_type(value):
    file_mime_type = magic.from_buffer(value.read(), mime=True)
    value.seek(0)  
    allowed_mime_types = ['image/png', 'image/jpeg', 'image/jpg']
    
    if file_mime_type not in allowed_mime_types:
        raise ValidationError('Invalid file type. Only PNG, JPG, and JPEG files are allowed.', code=405)
        
class Project(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects')
    creator = models.CharField(max_length = 15)
    title = models.CharField(max_length=15, unique = True, blank = False, null = False)
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
    
    