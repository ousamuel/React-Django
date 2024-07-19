# backend/myProject/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserView, ProjectView

router = DefaultRouter()
router.register(r'users', UserView)
router.register(r'projects', ProjectView)

urlpatterns = [
    path('', include(router.urls)),
    path('projects/list/', ProjectView.as_view({'get': 'project_list'}), name='project_list'),
]
