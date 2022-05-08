from rest_framework import  serializers 
from .models import *

# pet serializer
class PetSerializer(serializers.ModelSerializer):
    contact = serializers.SerializerMethodField()
    class Meta:
        model = Pet
        fields = "__all__"
        depth = 1
    
    def get_contact(self, obj):
        return obj.owner.profile.contact

# pet image serializer
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

# bookmarks serializer
class BookmarkSerializer(serializers.ModelSerializer):
    contact = serializers.SerializerMethodField()
    class Meta:
        model = BookMark
        fields = ['pet', 'id', 'contact']
        depth = 2

    def get_contact(self, obj):
        return obj.pet.owner.profile.contact
# breed serializer
class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = "__all__"
