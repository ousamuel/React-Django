from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserView, ProjectView, project_search

router = DefaultRouter()
router.register(r'users', UserView)
router.register(r'projects', ProjectView)

urlpatterns = [
    path('', include(router.urls)),
    path('projects/delete-everything/', ProjectView.as_view({'delete': 'delete_everything'})),
    path('projects/search/', project_search, name='project_search'),

]
