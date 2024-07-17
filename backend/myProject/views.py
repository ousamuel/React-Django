from django.shortcuts import render
from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from .serializers import UserSerializer, ProjectSerializer
from .models import User, Project
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
import os
from groq import Groq

# client = Groq(api_key=os.environ.get("API_KEY"))

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

# @api_view(['POST'])
# def chat_completion_view(request):
#     input_data = request.data.get('input', 'return a list of filters')
#     try:
#         chat_completion = client.chat.completions.create(
#             messages=[
#                 {"role": "system", "content": "you are a helpful assistant."},
#                 {"role": "user", "content": input_data},
#             ],
#             model="llama3-8b-8192",
#         )
#         response_data = chat_completion.choices[0].message.content
#         return Response({"message": response_data}, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
