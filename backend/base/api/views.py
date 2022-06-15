
from unicodedata import category
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import *
from base.models import *
from django.contrib.auth.models import User



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = User.objects.get(id = request.user.id )
    serializer = UserSerializer(user, many=False)
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fromData(request):
    #fetch all catergories and add their names to a categories list (cats)
    cats = []
    formObject = {}
    categories = Category.objects.all()

    for category in categories:
       cats.append(category)
    
    #creating the dict that will be sent to the front end 
    for category in cats:
        id = Category.objects.get(name=category)
        articles = Article.objects.filter(category=id)
        temp = {}
        for article in articles:
           temp[article.id] = {  "article name ":article.name, "article quantity" : article.quantity, "cateogryid" :article.category.id} 
        formObject[category.name] = temp
    #response dict structure { categoryname: {"articleid": {articlename: article quantity } } }


    return Response(formObject)



@api_view(['POST'])
def addRequest(request):
    #(atricle_id,qte,basket)
    data = request.data
    requested_quantity  = data['article quantity']
    observation = data['observation']

    teacher = Teacher.objects.get(user_id = data['userid'])        
    article = Article.objects.get(id = data['article_id'])

    if basket := Basket.objects.create(created_by = teacher):#needs to be saved:
        if request := Request.objects.create(article= article, qte = requested_quantity, basket= basket, observation = observation ):
            return Response('data has been posted successfully')
        return Response('somehting went wrong with the request object')
    return Response('somehting went wrong with the basket object')

#----------------------------------admin views ------------------------------------ 

#categories   
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getCategories(request):
    categories = Category.objects.all()
    serializer =  CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def categoryDetail(request,pk):
    categories = Category.objects.get(id=pk)
    serializer =  CategorySerializer(categories, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def addCategory(request):
    #(name, description)
    serializer = CategorySerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been saved successfully")
    return Response('an error has occured')


@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def updateCategory(request,pk):
    #(name, description)
    category = Category.objects.get(id=pk)
    serializer = CategorySerializer(instance = category, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been updated successfully")
    return Response('an error has occured')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def deleteCategory(request, pk):
    try:
      Category.objects.get(id=pk).delete()
      return Response('category has been deleted successufully')
    except:
        return Response('an error has occured')

#categories-end

#articles
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getArticles(request):
    articles = Article.objects.all()
    serializer =  ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def articleDetail(request, pk):
    article = Article.objects.get(id=pk)
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def addArticle(request):
    #(name, description)
    serializer = ArticleSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been saved successfully")
    return Response('an error has occured')


@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def updateArticle(request,pk):
    #(name, description)
    article = Article.objects.get(id=pk)
    serializer = ArticleSerializer(instance = article, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been updated successfully")
    return Response('an error has occured')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def deleteArticle(request, pk):
    try:
      Article.objects.get(id=pk).delete()
      return Response('the article has been deleted successufully')
    except:
        return Response('an error has occured')

#articles end

#----------------------------------------------------------------------------------


       

