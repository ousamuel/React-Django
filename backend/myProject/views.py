from django.shortcuts import render
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from .serializers import UserSerializer, ProjectSerializer
from .models import User, Project
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
import os


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'])
    def project_list(self, request):
        projects = list(Project.objects.values())
        return JsonResponse(projects, safe=False)
    
    @action(detail=False, methods=['delete'])
    def delete_everything(self, request):
        Project.objects.all().delete()
        return Response({"message": "All projects deleted"}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)