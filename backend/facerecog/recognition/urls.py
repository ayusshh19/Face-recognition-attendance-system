from django.urls import path
from .views import registeruser,thanks,getfaces,add_photos,train_data,mark

urlpatterns = [
    path('register/',registeruser.as_view(),name='register'),
    path('thanks/',thanks.as_view(),name='thanks'),
    path('getfaces/',getfaces,name='getfaces'),
    path('addphoto/',add_photos,name='add_photos'),
    path('traindata/',train_data,name='traindata'),
    path('mark/',mark,name='mark'),
    
]