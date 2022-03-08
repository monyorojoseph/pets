from django.db.models.signals import post_save, pre_save
from django.template.defaultfilters import slugify
from .models import *

# create slug field (pet_name)
def create_pet_name(sender, instance, created, **kwargs):
    if created:
        instance.pet_name = slugify(f"{instance.breed.cat_dog} {(instance.breed)} {instance.gender} {instance.pk}")
        instance.save()


post_save.connect(create_pet_name, sender=Pet)

# create cover image
def create_cover_image(sender, instance, **kwargs):
    if instance.pet.cover_image == "cover/default.png":
        instance.pet.cover_image = instance.pet_image
        instance.pet.save()

post_save.connect(create_cover_image, sender=Image)