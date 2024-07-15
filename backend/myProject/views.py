from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import UserSerializer, ProjectSerializer
from .models import User, Project
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action
import os
from groq import Groq
client = Groq(
    api_key=os.environ.get("API_KEY"),
)

# Create your views here.

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "you are a helpful assistant."
        },
        {
            "role": "user",
            "content": "return a list of filters",
        }
    ],
    model="llama3-8b-8192",
)
print(chat_completion.choices[0].message.content)
# def ai_view(request):
#     if request.method == 'POST':
#         input_data = request.POST.get('input')
#         api_key = os.getenv('API_KEY')

#         # Call the third-party API with the API key
#         response = requests.post(
#             'https://third-party-api.com/endpoint',
#             headers={'Authorization': f'Bearer {api_key}'},
#             json={'input': input_data}
#         )

#         data = response.json()
#         return JsonResponse(data, status=response.status_code)

#     return JsonResponse({'error': 'Invalid request method'}, status=400)
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
    
    
    @action(detail=False, methods=['delete'])
    def delete_everything(self, request):
        Project.objects.all().delete()
        return Response({"message": "All projects deleted"}, status=status.HTTP_204_NO_CONTENT)