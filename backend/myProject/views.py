import os
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db.models import Q
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import UserSerializer, ProjectSerializer, ProfileSerializer
from .models import Project, Profile

# Choices are: date_joined, email, first_name, groups, id, 
# is_active, is_staff, is_superuser, last_login, last_name, logentry, 
# password, user_permissions, username

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        responseT = super().post(request, *args, **kwargs)
        refresh = responseT.data['refresh']
        access = responseT.data['access']

        response = HttpResponse({'message': 'Login successful'})
        response.set_cookie('refresh_token', refresh, httponly=True, secure=False, samesite='Lax')
        response.set_cookie('access_token', access, httponly=True, secure=False, samesite='Lax')
        # in dev, set secure = False, production --> True
        # response.set_cookie('refresh_token', refresh, httponly=True, secure=True, samesite='Lax')
        # response.set_cookie('access_token', access, httponly=True, secure=True, samesite='Lax')
        
        return response
class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        responseT = super().post(request, *args, **kwargs)
        access = responseT.data['access']

        response = JsonResponse({'message': 'Token refreshed successfully'})
        # in dev, set secure = False, production --> True
        response.set_cookie('access_token', access, httponly=True, secure=False, samesite='Lax')
        
        return response
    
class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    if request.user.is_anonymous:
        return Response({'error': 'User not authenticated'}, status=401)
    try:
        profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)
    
    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return JsonResponse(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = ProfileSerializer(profile, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


    @action(detail=False, methods=['delete'], url_path='delete-everything')
    def delete_everything(self, request):
        User.objects.all().delete()
        return Response({"message": "All users deleted"}, status=status.HTTP_204_NO_CONTENT)


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    @permission_classes([IsAuthenticated])
    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'])
    @permission_classes([IsAdminUser])
    def project_list(self, request):
        projects = list(Project.objects.values())
        return JsonResponse(projects, safe=False)
    
    @action(detail=False, methods=['delete'], url_path='delete-everything')
    @permission_classes([IsAuthenticated])
    def delete_everything(self, request):
        Project.objects.all().delete()
        return Response({"message": "All projects deleted"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def project_search(request):
    query = request.GET.get('search', None)
    if query:
        projects = Project.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
        serializer = ProjectSerializer(projects, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"message": "Please provide a search query"}, status=400)



