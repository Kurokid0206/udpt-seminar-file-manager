from rest_framework import serializers
from fileManager.models import Object


class ObjectSerializer(serializers.ModelSerializer):
    key = serializers.CharField(read_only=True)
    class Meta:
        model = Object
        fields = '__all__'
