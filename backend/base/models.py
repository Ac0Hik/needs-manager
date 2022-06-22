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
    description = models.CharField(max_length=300, blank=False, null=False, default='no description')
    quantity = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(200)], default=0
    )
    category = models.ForeignKey(Category, null=False, on_delete = models.CASCADE)

    def __str__(self) -> str:
      return self.name




class Profile(models.Model):#could be the profile class, one to one relationship with User class
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='profiles', null=True)
    is_manager = models.BooleanField(default=False)
    
    def __str__(self) -> str:
        return self.user.username


class Basket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    class Type(models.TextChoices):
        Being_proccessed = 'BP'
        Processed = 'P'   

    basket_state = models.fields.CharField(max_length=10, choices=Type.choices, default='BP')
    def __str__(self) -> str:
       return self.created_at.strftime("%m/%d/%Y, %H:%M:%S")
   
    
class Item(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE, related_name='items')
    article = models.ForeignKey(Article, null=False, on_delete = models.CASCADE)
    qte_requested = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(200)], default=0
    )
    observation = models.TextField(blank=True, null=True)
    class Type(models.TextChoices):
        being_processed = 'BP'
        accepted = 'A'        
        rejected  = 'R' 
    state = models.fields.CharField(max_length=20, choices=Type.choices, null=True, default='BP')
    def __str__(self) -> str:
       return self.state

class Request(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
    basket = models.OneToOneField(Basket, null=False, on_delete=models.CASCADE)

    def __str__(self) -> str:
      return self.created_by.username
    