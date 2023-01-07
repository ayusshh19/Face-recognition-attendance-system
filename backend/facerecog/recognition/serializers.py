from rest_framework import serializers
from .models import User,Attendance

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        
class Attendanceserializer(serializers.ModelSerializer):
    class Meta:
        model=Attendance
        fields='__all__'