from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)

class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    category = models.CharField(max_length=255)
    image = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    num_reviews = models.IntegerField()
    count_in_stock = models.IntegerField()
    description = models.TextField()

