from django.db import models


class Object(models.Model):
    object_id = models.AutoField(primary_key=True)
    parent_root = models.ForeignKey(
        'object', on_delete=models.CASCADE, null=True, blank=True)
    key = models.CharField(max_length=250, null=False, blank=True)
    name = models.CharField(max_length=100)
    is_file = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def exists(cls):
        setting = Object.objects.all()
        return True if setting.count() > 0 else False

    @classmethod
    def init_object(cls):
        if not cls.exists():
            Object.objects.create(name='root')
        return

    def __str__(self) -> str:
        return f'{self.object_id} {self.name}'

    class Meta:
        db_table = 'object'
        unique_together = ['key', 'name']
