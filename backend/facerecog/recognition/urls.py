from django.urls import path
from .views import registeruser,train,mark,registerapi

urlpatterns = [
    path('register/',registerapi,name='register'),
    # path('thanks/',thanks.as_view(),name='thanks'),
    # path('getfaces/',getfaces,name='getfaces'),
    # path('addphoto/',add_photos,name='add_photos'),
    path('traindata/',train,name='traindata'),
    path('mark/',mark,name='mark'),
    
]