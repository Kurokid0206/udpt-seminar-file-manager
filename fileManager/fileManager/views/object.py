
import datetime
from rest_framework import viewsets, status

from rest_framework.response import Response
from rest_framework.decorators import action

from fileManager.serializers.object import ObjectSerializer
from fileManager.models import Object
from fileManager.utils.s3 import uploadFile2S3


class ObjectViewSet(viewsets.ModelViewSet):
    serializer_class = ObjectSerializer
    queryset = Object.objects.all()

    @action(detail=True, methods=['GET'], url_path='get-sub')
    def get_sub_dir(self, request, pk=None):
        sub_dir = Object.objects.filter(
            parent_root=pk).order_by('is_file', 'name')
        serializer = ObjectSerializer(sub_dir, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'], url_path='create-dir')
    def create_sub_dir(self, request, pk=None):
        root = Object.objects.get(object_id=pk)
        request_data = request.data
        request_data['key'] = root.key + '/' + root.name
        request_data['parent_root'] = pk
        serializer = ObjectSerializer(data=request_data)

        if serializer.is_valid():
            object = serializer.create(
                validated_data=serializer.validated_data)
            result = ObjectSerializer(object).data
            return Response({'status': status.HTTP_200_OK,
                             'message': 'success',
                             'data': result})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'], url_path='upload-file')
    def upload_file(self, request, pk=None):
        root = Object.objects.get(object_id=pk)

        request_data = request.data
        request_data['key'] = (root.key + '/' + root.name).replace('//', '')
        if request_data['key'][0] == '/':
            request_data['key'] = request_data['key'][1:]
        print(request_data['key'])
        request_data['parent_root'] = pk
        file = request.FILES['file']
        request_data['name'] = file.name
        request_data['is_file'] = True
        serializer = ObjectSerializer(data=request_data)

        if serializer.is_valid():
            # Upload file
            try:
                uploadFile2S3(file, request_data['key'])
                object = serializer.create(
                    validated_data=serializer.validated_data)
                result = ObjectSerializer(object).data
                return Response({'status': status.HTTP_200_OK,
                                'message': 'success',
                                 'data': result})
            except Exception as e:
                print(f'error: {e}')
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'error': 'File name has been taken',
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'error': 'Invalid file',
            },  status=status.HTTP_400_BAD_REQUEST)
