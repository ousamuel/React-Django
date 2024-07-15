from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import UserSerializer, ProjectSerializer
from .models import User, Project
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    
    def create(self, request, *args, **kwargs):
        name = request.data["title"]
        description = request.data["description"]
        verified = request.data["verified"]
        image = request.data["image"]
        
        Project.objects.create(name = name, description = description, verified = verified, image = image)
        return Response("Created project", status=status.HTTP_200_OK)
        