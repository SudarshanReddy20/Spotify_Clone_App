from django.db import models

# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=30)
    image = models.ImageField(upload_to='songs/images')
    audio = models.FileField(upload_to='songs/audios')

    def __str__(self):
        return f"{self.title} by {self.artist}"