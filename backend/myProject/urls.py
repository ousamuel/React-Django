# backend/myProject/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.project_list, name='project_list'),
    # Add other paths for your app here
]
