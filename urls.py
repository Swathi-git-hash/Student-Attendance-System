from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.get_students),
    path('mark/', views.mark_attendance),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('attendance.urls')),
]