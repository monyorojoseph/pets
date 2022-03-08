# Generated by Django 4.0.3 on 2022-03-07 23:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Breed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('breed_name', models.CharField(max_length=200, unique=True)),
                ('cat_dog', models.CharField(choices=[('Cat', 'Cat'), ('Dog', 'Dog')], default='Cat', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Pet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pet_name', models.SlugField(blank=True, max_length=200, null=True, unique=True)),
                ('age', models.CharField(max_length=200)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default='Male', max_length=200)),
                ('sale_adoption', models.CharField(choices=[('Sale', 'Sale'), ('Adoption', 'Adoption')], default='Sale', max_length=200)),
                ('price', models.PositiveBigIntegerField(default=0)),
                ('description', models.TextField()),
                ('cover_image', models.ImageField(default='cover/default.png', upload_to='cover/')),
                ('breed', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pet.breed')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pet_image', models.ImageField(upload_to='pets/')),
                ('pet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pet.pet')),
            ],
        ),
    ]
