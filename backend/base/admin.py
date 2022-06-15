from django.contrib import admin

# Register your models here.

from .models import * 

class RequestAdmin(admin.ModelAdmin):
    list_display =  ['article','qte','created_at','state','basket']

class BasketAdmin(admin.ModelAdmin):
    list_display =  ['created_by','created_at']


admin.site.register(Note)
admin.site.register(Teacher)
admin.site.register(Request, RequestAdmin)
admin.site.register(Basket,BasketAdmin)
admin.site.register(Category)
admin.site.register(Article)
