
from rest_framework import viewsets, status

from rest_framework.response import Response

from fileManager.serializers.object import ObjectSerializer
from fileManager.models import Object
from rest_framework.decorators import action


class ObjectViewSet(viewsets.ModelViewSet):
    serializer_class = ObjectSerializer
    queryset = Object.objects.all()

    @action(detail=True, methods=['GET'], url_path='get-dir')
    def get_sub_dir(self, request, pk=None):
        sub_dir = Object.objects.filter(parent_root=pk)
        serializer = ObjectSerializer(sub_dir, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['POST'], url_path='create-dir')
    def create_sub_dir(self, request, pk=None):
        root = Object.objects.get(object_id=pk)

        request_data = request.data
        request_data['key'] = root.key+'/'+root.name+'/'
        request_data['parent_root'] = pk
        print(request_data)
        serializer = ObjectSerializer(data=request_data)

        if serializer.is_valid():
            serializer.create(validated_data=serializer.validated_data)
            return Response({'status': status.HTTP_200_OK, 'message': 'success'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'], url_path='upload-file')
    def upload_file(self, request, pk=None):
        root = Object.objects.get(object_id=pk)

        request_data = request.data
        request_data['key'] = root.key+root.name+'/'
        request_data['parent_root'] = pk
        file = request.FILES['file']
        request_data['name'] = file.name

        serializer = ObjectSerializer(data=request_data)

        if serializer.is_valid():
            # Upload file
            serializer.create(validated_data=serializer.validated_data)
            return Response({'status': status.HTTP_200_OK, 'message': 'success'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
