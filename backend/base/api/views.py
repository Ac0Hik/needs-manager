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
#@permission_classes([IsAuthenticated])
def fromData(request):
    categories = Category.objects.all().values('id','name')
    articles = Article.objects.all().values('id','name','quantity','category_id')
    dt = {
        "categories" : categories,
        "articles" : articles
    }
    return Response(dt)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUserIDdict(request):
    users = User.objects.all().values('id','username')
    return Response(users)

#all requests
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getRequests(request):
    requests = Request.objects.all().order_by('-created_at')
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)

#user's requets
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserRequests(request):
    requests = Request.objects.filter(created_by=request.user).order_by('created_at')
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)

#single request sent to a user for following up on his request
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserRequestDetails(request,pk):
    requests = Request.objects.get(id=pk, created_by=request.user)
    serializer = RequestSerializer(requests, many=False)
    return Response(serializer.data)

#single request -- sent by an admin user !!!!
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getRequest(request,pk):
    requests = Request.objects.get(id=pk)
    serializer = RequestSerializer(requests, many=False)
    return Response(serializer.data)


#unhandled requests
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUnhandledRequests(request):
    requests = Request.objects.filter(basket__basket_state ='BP')
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addRequest(request):
    items = request.data
    basket = Basket.objects.create()
    Request.objects.create(basket=basket,created_by=request.user)
    for item in items:
      Item.objects.create(basket = basket, qte_requested=item['qte'], observation=item['observation'], article_id=item['article']['id'])

    return Response('data has been posted')

    
    



@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def processRequest(request):
    basket_pk = request.data['basket_id']
    reqItems=request.data['items']
    for item in reqItems:#update items' states an articles' quantities
        itemID = item["id"]
        qteRequested = item["qte_requested"]
        articleID = item["article"]["id"]
        Item.objects.filter(id = itemID).update(state=item["state"])
        if item["state"] == "A":#request was accepted
            article = Article.objects.get(id=articleID)
            article.quantity -= qteRequested
            try:
              if article.quantity >= 0:
                article.save()
            except:
                return Response('article quantity constraint')

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



       

