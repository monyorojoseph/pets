from django.db import models
from django.utils import timezone
from django.conf import settings

from .choices import *

User = settings.AUTH_USER_MODEL
# Create your models here.

# breed
class Breed(models.Model):
    name = models.CharField(max_length=200)
    cat_dog = models.CharField(max_length=20, choices=PETS_BREEDS_CHOICES, default='c')

    def __str__(self):
        return self.name

# pet
class Pet(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    breed = models.OneToOneField(Breed, on_delete=models.DO_NOTHING)
    sex = models.CharField(max_length=20, choices=PETS_SEX_CHOICES, default='m')
    adoption_sale = models.CharField(max_length=20, choices=ADOPTION_SALE_CHOICES, default='s')
    pub_date = models.DateTimeField(default=timezone.now())
    price = models.CharField(max_length=20, null=True, blank=True)
    age = models.CharField(max_length=20)
    description = models.TextField()

    def __str__(self):
        return str(self.owner)


# images
class  Image(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    pet_image = models.ImageField()

    def __str__(self):
        return str(self.pet)
# review
class Review(models.Model):
    review_text = models.TextField()
    review_text_owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.review_text_owner)
