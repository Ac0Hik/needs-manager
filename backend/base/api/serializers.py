from dataclasses import field, fields
from rest_framework.serializers import ModelSerializer
from base.models import *
from django.contrib.auth.models import User


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        #fields = ['id','name']
        fields = '__all__'

class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        #fields = ['id','name','quantity','category']
        fields = '__all__'

    
class BaketSerializer(ModelSerializer):
    class Meta:
        model = Basket
        fields = '__all__'


class RequestSerializer(ModelSerializer):
    class Meta:
        model = Request 
        fields = '__all__'