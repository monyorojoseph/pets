from django.db import models
from .choices import *
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.
class Breed(models.Model):
    breed_name = models.CharField(max_length=200, unique=True)
    cat_dog = models.CharField(max_length=20, choices=CAT_DOG_CHOICES, default='Cat')

    def __str__(self):
        return self.breed_name


class Pet(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_query_name='pets')
    pet_name = models.SlugField(max_length=200, unique=True, null=True, blank=True)
    breed = models.ForeignKey(Breed, models.SET_NULL, null=True)
    age = models.CharField(max_length=200)
    gender = models.CharField(max_length=200, choices=SEX_CHOICES, default='Male')
    sale_adoption = models.CharField(max_length=200, choices=SALE_ADOPT, default='Sale')
    price = models.CharField(max_length=20, default=0)
    description = models.TextField()
    total = models.CharField(max_length=20, default=1)
    cover_image = ProcessedImageField(upload_to='cover/',
                                    default='cover/default.png',
                                    processors=[ResizeToFill(300, 300)],
                                    format='JPEG',
                                    options={'quality': 100})


    def __str__(self):
        return self.pet_name

class Image(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_query_name='images')
    pet_image = ProcessedImageField(upload_to='pets/',
                                    processors=[ResizeToFill(250, 250)],
                                    format='JPEG',
                                    options={'quality': 100})

    def __str__(self):
        return str(self.pet)    

class BookMark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_query_name='bookmarks')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.user)