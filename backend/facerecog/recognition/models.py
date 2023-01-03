from django.db import models

# Create your models here.

class User(models.Model):
    CLASS_CHOICES=[('A','A'),('B','B'),('C','C')]
    SEMESTER_CHOICES = (
    ("1", "1"),
    ("2", "2"),
    ("3", "3"),
    ("4", "4"),
    ("5", "5"),
    ("6", "6"),
    ("7", "7"),
    ("8", "8"),
    )
    username=models.CharField(max_length=20,unique=True,default='user')
    firstname=models.CharField(max_length=30)
    lastname=models.CharField(max_length=30)
    rollno=models.CharField(max_length=10)
    email=models.EmailField()
    class_in=models.CharField(max_length=20,choices=CLASS_CHOICES)
    phone_number=models.CharField(max_length=20)
    Institute=models.CharField(max_length=100)
    current_sem=models.CharField(max_length=10,choices=SEMESTER_CHOICES)
    createdat=models.DateTimeField(auto_now_add=True)
    
class Attendance(models.Model):
    SUBJECTS=[('TCS','TCS'),('SE','SE'),('IP','IP'),('CN','CN'),('DWM','DWM')]
    username=models.ForeignKey(User,on_delete=models.CASCADE,default='1')
    present=models.BooleanField()
    todaysdate=models.DateField(auto_now_add=True)
    currenttime=models.DateTimeField(auto_now_add=True)
    subject=models.CharField(max_length=20,choices=SUBJECTS)