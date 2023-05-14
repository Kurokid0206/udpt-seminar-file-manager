from django.contrib import admin
from django.urls import path
from fileManager.views import object
from rest_framework import routers

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'api/v1/objects', object.ObjectViewSet, basename='object')


urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls
