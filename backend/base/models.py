from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User 


# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=50, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()

    def __str__(self) -> str:
       return self.title




class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=False, null=False)
    
    def __str__(self) -> str:
      return self.name

class Article(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=300, blank=False, null=False)
    quantity = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(200)], default=0
    )
    category = models.ForeignKey(Category, null=False, on_delete = models.CASCADE)

    def __str__(self) -> str:
      return self.name




class Teacher(models.Model):#could be the profile class, one to one relationship with User class
    name = models.CharField(max_length=50)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    

    def __str__(self) -> str:
        return self.name


class Basket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=False)

    def __str__(self) -> str:
      return self.created_by.user.username
    

class Request(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    article = models.ForeignKey(Article, null=False, on_delete = models.CASCADE)
    qte = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(200)], default=0
    )
    basket = models.ForeignKey(Basket, null=False, on_delete=models.CASCADE)
    observation = models.TextField(blank=True, null=True)
    class Type(models.TextChoices):
        being_processed = 'BP'
        accepted = 'A'        
        rejected  = 'R' 
    state = models.fields.CharField(max_length=20, choices=Type.choices, null=True, default='BR')

    def __str__(self) -> str:
      return self.basket.created_by.user.username
    