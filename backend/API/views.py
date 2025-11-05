from rest_framework.decorators import api_view
from API.models import Song
from API.serializers import SongSerializer
from rest_framework.response import Response

# Create your views here.
@ api_view(['GET'])
def song_list(request):
    songs = Song.objects.all()
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)