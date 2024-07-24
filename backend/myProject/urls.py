from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MyTokenObtainPairView, MyTokenRefreshView, UserView, ProjectView, ProfileView, project_search, user_profile

router = DefaultRouter()
router.register(r'users', UserView)
router.register(r'projects', ProjectView)
router.register(r'profiles', ProfileView)  


urlpatterns = [
    path('', include(router.urls)),
    path('projects/search/', project_search, name='project-search'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('profile1/', user_profile, name='user_profile'),

]
