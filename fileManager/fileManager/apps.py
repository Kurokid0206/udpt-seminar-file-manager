from django.apps import AppConfig
from django.core.management import call_command


class FileManagerConfig(AppConfig):
    name = "fileManager"
    verbose_name = "fileManager application"

    def ready(self):
        call_command("migrate")
        from fileManager.models import Object
        objs = Object.objects.all()
        if len(objs) == 0:
            Object.objects.create(name='root')
