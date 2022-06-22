from unicodedata import category
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

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
        token['is_manager'] = user.profiles.is_manager
        
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
@permission_classes([IsAuthenticated, IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def adduser(request):
   data = request.data
   username = data['username']#username and the password
   first_name = data['first_name']
   last_name = data['last_name']
   email = data['email']
   is_staff = data['is_staff']
   is_manager = data['is_manager']
   if user := User.objects.create(username=username, password=make_password(username), first_name=first_name, last_name=last_name, email=email, is_staff=is_staff):
      if profile := Profile.objects.create(user=user,is_manager=is_manager):
        return Response('data has been posted successfully')
      return Response('something went wrong with profile')
   return Response('something went wrong with profile')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def deleteuser(request, pk):
    try:
      User.objects.get(id=pk).delete()
      return Response('user has been deleted successufully')
    except:
        return Response('an error has occured')

#retrieves one user's information
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request, pk):
    user = User.objects.get(id = pk )
    serializer = UserSerializer(user, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
   data = request.data
   username = data['username']#username and the password
   first_name = data['first_name']
   last_name = data['last_name']
   email = data['email']
   is_staff = data['is_staff']
   is_manager = data['profiles']['is_manager']
   if user := User.objects.get(id=pk):
       user.username = username
       user.first_name=first_name
       user.last_name=last_name
       user.email=email
       user.is_staff=is_staff
       user.save()
       if profile := Profile.objects.get(user=user):
        profile.is_manager = is_manager
        profile.save()
        return Response('user has been updated successfully')
       return('could not update the profile')
   return Response('an error has occured')

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



@api_view(['GET'])
def getRequests(request):
    requests = Request.objects.all()
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRequest(request,pk):
    requests = Request.objects.get(id=pk)
    serializer = RequestSerializer(requests, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addRequest(request):
    basket = Basket.objects.create()
    userRequest = Request.objects.create(basket=basket,created_by=request.user)
    print(request.user)
    items = request.data["basket"]["items"]
    for item in items:
        quantity = item['qte_requested']
        observation = item['observation']
        articleId = item['article']
        Item.objects.create(basket = basket, qte_requested=quantity, observation=observation, article_id=articleId)
        print(item)

    return Response('data has been posted')

    
    

@api_view(['GET'])
def getUnhandledRequests(request):
    requests = Request.objects.filter(basket__basket_state ='BP')
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)
    


@api_view(['PUT'])
def processRequest(request):
    basket_pk = request.data['basket']['id']
    reqItems=request.data['basket']['items']
    for  item in reqItems:#update items' states an articles' quantities
        itemID = item["id"]
        state = "A" if item["state"]== "A" else "R"
        qteRequested = item["qte_requested"]
        articleID = item["article"]
        try:
            Item.objects.filter(id = itemID).update(state=state)
            if state == "A":#request was accepted
                article = Article.objects.get(id=articleID)
                article.quantity -= qteRequested
                if article.quantity >= 0:
                  article.save()
        except:
            return Response('an error has occured')

    Basket.objects.filter(id=basket_pk).update(basket_state = 'P')
    return Response('request has been proccessed successfully')
#----------------------------------manager views ------------------------------------ 

#categories   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCategories(request):
    categories = Category.objects.all()
    serializer =  CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categoryDetail(request,pk):
    categories = Category.objects.get(id=pk)
    serializer =  CategorySerializer(categories, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCategory(request):
    #(name, description)
    serializer = CategorySerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been saved successfully")
    return Response('an error has occured')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCategory(request,pk):
    #(name, description)
    category = Category.objects.get(id=pk)
    serializer = CategorySerializer(instance = category, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been updated successfully")
    return Response('an error has occured')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCategory(request, pk):
    try:
      Category.objects.get(id=pk).delete()
      return Response('category has been deleted successufully')
    except:
        return Response('an error has occured')

#categories-end

#articles
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getArticles(request):
    articles = Article.objects.all()
    serializer =  ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def articleDetail(request, pk):
    article = Article.objects.get(id=pk)
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addArticle(request):
    #(name, description)
    data = request.data
    category = Category.objects.get(id=data['category_id'])
    articleName = data['name']
    articledescription = data['description']
    articlequanity = data['quantity']
    if Article.objects.create(name=articleName, description = articledescription, quantity=articlequanity, category = category):
        return Response("information has been saved successfully")
    return Response('an error has occured')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateArticle(request,pk):
    #(name, description)
    article = Article.objects.get(id=pk)
    serializer = ArticleSerializer(instance = article, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("information has been updated successfully")
    return Response('an error has occured')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteArticle(request, pk):
    try:
      Article.objects.get(id=pk).delete()
      return Response('the article has been deleted successufully')
    except:
        return Response('an error has occured')

#articles end

#----------------------------------------------------------------------------------



       

