
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
    article = ArticleSerializer(read_only = True, many=False)
    class Meta:
        model = Item
        fields= ['id','basket','article','qte_requested','state','observation']
    
class BaketSerializer(ModelSerializer):
    items = ItemSerializer(read_only = False, many=True)
    class Meta:
        model = Basket
        fields = ['id','created_at','basket_state','items']


class RequestSerializer(ModelSerializer):
    basket = BaketSerializer(read_only = False, many=False)
    class Meta:
        model = Request 
        fields = ['id','created_by_id','created_at', 'basket']
        depth = 2