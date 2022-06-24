from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),

    path('requests/', views.getRequests),
    path('requests/process', views.processRequest),
    path('requests/unhandled', views.getUnhandledRequests),
    path('requests/add', views.addRequest),
    path('requests/<int:pk>', views.getRequest),
    #requests retrieved by the user not admin
    path('requests/userRequests', views.getUserRequests),
    path('requests/userRequests/<int:pk>', views.getUserRequestDetails),



    path('users/', views.getUsers),
    path('users/add', views.adduser),
    path('users/delete/<int:pk>', views.deleteuser),
    path('users/update/<int:pk>', views.updateUser),
    path('users/<int:pk>', views.getUser),
    path('users/idUsername', views.getUserIDdict),

    path('formdata', views.fromData),
    
    path('categories/', views.getCategories),
    path('categories/<int:pk>/', views.categoryDetail),
    path('categories/add', views.addCategory),
    path('categories/update/<int:pk>', views.updateCategory),   
    path('categories/delete/<int:pk>', views.deleteCategory),

    path('articles/', views.getArticles),
    path('articles/<int:pk>', views.articleDetail),
    path('articles/add', views.addArticle),
    path('articles/update/<int:pk>', views.updateArticle),   
    path('articles/delete/<int:pk>', views.deleteArticle),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
