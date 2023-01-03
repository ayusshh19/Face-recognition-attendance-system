from django.contrib import admin
from .models import User,Attendance

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Admin View for User'''

    list_display = ('firstname','lastname','rollno','email','class_in','phone_number','Institute','current_sem','createdat')
    ordering = ('rollno',)
    
@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display=('id','present','todaysdate','currenttime','subject')
    
    

    
