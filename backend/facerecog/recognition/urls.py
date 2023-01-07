from django.urls import path
from .views import registeruser,train,mark,registerapi,visualisation

urlpatterns = [
    path('register/',registerapi,name='register'),
    path('traindata/',train,name='traindata'),
    path('mark/',mark,name='mark'),
    path('visual/',visualisation,name='visual'),
    
    
    
]