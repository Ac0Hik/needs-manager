
from dataclasses import fields
from pyexpat import model
from rest_framework.serializers import ModelSerializer
from base.models import *
from django.contrib.auth.models import User


class NoteSerializer(ModelSerializer):

    class Meta:
        model = Note
        fields = '__all__'

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['is_manager']

class UserSerializer(ModelSerializer):
    profiles = ProfileSerializer(read_only = True, many=False)
    class Meta:
        model = User 
        fields = ['id','username', 'first_name', 'last_name','email','is_staff', 'profiles']


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        #fields = ['id','name']
        fields = '__all__'

class ArticleSerializer(ModelSerializer):
    category = CategorySerializer(read_only = True, many=False)
    class Meta:
        model = Article
        #fields = ['id','name','quantity','category']
        fields = '__all__'

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields= '__all__'
    
class BaketSerializer(ModelSerializer):
    items = ItemSerializer(read_only = True, many=True)
    class Meta:
        model = Basket
        fields = ['id','created_at','items']
        depth = 3


class RequestSerializer(ModelSerializer):
    basket = BaketSerializer(read_only = True, many=False)
    class Meta:
        model = Request 
        fields = ['id','created_by','created_at', 'basket']
        depth = 3