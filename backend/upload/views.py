from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.conf import settings
import os

class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if file:
            
            upload_dir = os.path.join(settings.MEDIA_ROOT, 'uploads')
            
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir) 
                
            file_path = os.path.join(upload_dir, file.name) 
            #after file processing delte file with os.remove
            # check first with os.path.exists
            with open(file_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)

            return Response({"message": "File uploaded successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
