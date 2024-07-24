from rest_framework import serializers
from .models import Profile, Project
from django.contrib.auth.models import User

# {
#     "username": "new_username",
#     "email": "new_email@example.com",
#     "password": "new_password",  # This can be omitted if not changing the password
#     "profile": {
#         "linkedin": "new_linkedin_url"
#     }
# }
# example of body in a PUT request

    
class ProjectSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id') 
    class Meta:
        model = Project
        fields = ['id', 'title', 'creator', 'description', 'link', 'user_id']

    # Field-level validation: Django Rest Framework (DRF) will automatically call any validate_<Field_name> function
    # for any specified field in the serializer, which is used in views.py
    # Serializer-level validation: DRF will call "validate" method on the serializer, if it is defined
    # you can add multiple validation checkers altogether here
    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value
    
    def validate_link(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value
    
    # Optionally, you can also add general validation for the whole serializer
    # def validate(self, data):
    #     # Add any cross-field validation here
    #     return data
    
class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')  # To display the associated username
    projects = ProjectSerializer(many=True, read_only=True)  # Nesting the ProjectSerializer

    class Meta:
        model = Profile
        fields = "__all__"
            
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Nesting the ProfileSerializer

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        if profile_data:
            # Ensure that profile exists and update its fields
            profile = getattr(instance, 'profile', None)
            if profile:
                profile.linkedin = profile_data.get('linkedin', profile.linkedin)
                profile.save()
            else:
                # If profile does not exist, handle the case or create one
                Profile.objects.create(user=instance, **profile_data)

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()


        return instance
