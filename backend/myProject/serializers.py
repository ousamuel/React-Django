from rest_framework import serializers
from .models import User, Project

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

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