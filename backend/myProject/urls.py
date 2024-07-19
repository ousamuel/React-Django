# backend/myProject/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserView, ProjectView

router = DefaultRouter()
router.register(r'users', UserView)
router.register(r'projects', ProjectView)

urlpatterns = [
    path('users/', UserView.as_view({'get': 'list', 'post': 'create'})),
    path('projects/', ProjectView.as_view({'get': 'list', 'post': 'create', 'delete':'destroy'})),
]