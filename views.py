from django.http import JsonResponse
from .models import Student, Attendance
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import date

@csrf_exempt
def get_students(request):
    students = list(Student.objects.values())
    return JsonResponse(students, safe=False)

@csrf_exempt
def mark_attendance(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        for entry in data:
            student = Student.objects.get(id=entry['id'])
            Attendance.objects.create(student=student, present=entry['present'], date=date.today())
        return JsonResponse({'message': 'Attendance marked'})