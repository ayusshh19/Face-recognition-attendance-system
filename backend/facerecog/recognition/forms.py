from django import forms
from .models import User,Attendance
class registerform(forms.ModelForm):
    class Meta:
        model=User
        fields='__all__'
        # fields=['firstname','lastname','rollno','email','class_in','phone_number','Institute','current_sem']

class usernameForm(forms.ModelForm):
    class Meta:
        model=User
        fields=['username']
        
class subjectform(forms.ModelForm):
    class Meta:
        model=Attendance
        fields=['subject']

        