from django.db import models
from .choices import *
from django.conf import settings

# User = settings

# Create your models here.
class Breed(models.Model):
    breed_name = models.CharField(max_length=200, unique=True)
    cat_dog = models.CharField(max_length=20, choices=CAT_DOG_CHOICES, default='Cat')

    def __str__(self):
        return self.breed_name


class Pet(models.Model):
    # owner = models.ForeignKey(User, on_delete=models.CASCADE)
    pet_name = models.SlugField(max_length=200, unique=True, null=True, blank=True)
    breed = models.ForeignKey(Breed, models.SET_NULL, null=True)
    age = models.CharField(max_length=200)
    gender = models.CharField(max_length=200, choices=SEX_CHOICES, default='Male')
    sale_adoption = models.CharField(max_length=200, choices=SALE_ADOPT, default='Sale')
    price = models.PositiveBigIntegerField(default=0)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='cover/', default='cover/default.png')


    def __str__(self):
        return self.pet_name

class Image(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    pet_image = models.ImageField(upload_to="pets/")

    def __str__(self):
        return str(self.pet)    