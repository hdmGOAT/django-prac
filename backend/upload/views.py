from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if file:
            with open(f'uploads/{file.name}', 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)

            return Response({"message": "File uploaded successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
