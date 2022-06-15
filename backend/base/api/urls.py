from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes),
    path('users/', views.getUsers),
    path('userProfile/', views.getUserInfo),
    path('formdata/', views.fromData),
    path('addRequest/', views.addRequest),
    
    path('categories/', views.getCategories),
    path('categories/<int:pk>/', views.categoryDetail),
    path('categories/add/', views.addCategory),
    path('categories/update/<int:pk>', views.updateCategory),   
    path('categories/delete/<int:pk>', views.deleteCategory),

    path('articles/', views.getArticles),
    path('articles/<int:pk>/', views.articleDetail),
    path('articles/add/', views.addArticle),
    path('articles/update/<int:pk>', views.updateArticle),   
    path('articles/delete/<int:pk>', views.deleteArticle),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
