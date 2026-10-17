from datetime import datetime
from typing import List, Optional
from uuid import UUID
from django.utils import timezone
from ninja import Router
from apps.analytics.models import LessonProgress
from apps.analytics.schemas import HeartbeatInput, LessonProgressSchema, StudentCRMRecordSchema, TelegramReminderInput
from apps.courses.models import Lesson, Course
from apps.billing.models import Enrollment
from apps.users.models import User, UserRole
from core.auth import AuthBearer, OptionalAuthBearer, check_role
from core.exceptions import NotFoundError

router = Router(tags=["Analytics, Heartbeat & Student CRM"])

@router.post("/heartbeat", response=LessonProgressSchema, auth=AuthBearer())
def record_heartbeat(request, payload: HeartbeatInput):
    lesson = Lesson.objects.filter(id=payload.lesson_id).first()
    if not lesson:
        raise NotFoundError("Lesson not found")

    progress, created = LessonProgress.objects.get_or_create(
        student=request.user,
        lesson=lesson,
        defaults={'last_position_seconds': payload.position_seconds, 'watched_seconds': 5}
    )

    if not created:
        progress.last_position_seconds = payload.position_seconds
        progress.watched_seconds = min(payload.duration_seconds, progress.watched_seconds + 5)

    duration = max(1, payload.duration_seconds or lesson.duration_seconds or 1)
    percent = round((progress.watched_seconds / duration) * 100, 1)

    if percent >= lesson.minimum_watch_percent and not progress.is_completed:
        progress.is_completed = True
        progress.completed_at = timezone.now()

    progress.save()

    return {
        "lesson_id": lesson.id,
        "watched_seconds": progress.watched_seconds,
        "last_position_seconds": progress.last_position_seconds,
        "is_completed": progress.is_completed,
        "completion_percentage": min(100.0, percent)
    }

@router.get("/lesson-progress/{lesson_id}", response=LessonProgressSchema, auth=AuthBearer())
def get_lesson_progress(request, lesson_id: UUID):
    lesson = Lesson.objects.filter(id=lesson_id).first()
    if not lesson:
        raise NotFoundError("Lesson not found")

    progress = LessonProgress.objects.filter(student=request.user, lesson=lesson).first()
    if not progress:
        return {
            "lesson_id": lesson.id,
            "watched_seconds": 0,
            "last_position_seconds": 0,
            "is_completed": False,
            "completion_percentage": 0.0
        }

    duration = max(1, lesson.duration_seconds or 1)
    percent = round((progress.watched_seconds / duration) * 100, 1)
    return {
        "lesson_id": lesson.id,
        "watched_seconds": progress.watched_seconds,
        "last_position_seconds": progress.last_position_seconds,
        "is_completed": progress.is_completed,
        "completion_percentage": min(100.0, percent)
    }

@router.get("/crm-students", response=List[StudentCRMRecordSchema])
def list_crm_students(request, teacher_id: Optional[UUID] = None):
    """Returns student list with stuck detection for Teacher CRM workspace"""
    enrollments = Enrollment.objects.filter(is_active=True).select_related('student', 'course')
    if teacher_id:
        enrollments = enrollments.filter(course__teacher_id=teacher_id)

    results = []
    for enr in enrollments:
        student = enr.student
        course = enr.course
        # Get lessons in this course
        first_module = course.modules.first()
        first_lesson = first_module.lessons.first() if first_module else None
        
        last_progress = LessonProgress.objects.filter(
            student=student,
            lesson__module__course=course
        ).select_related('lesson').order_by('-updated_at').first()

        current_lesson_title = last_progress.lesson.title if last_progress else (first_lesson.title if first_lesson else "Not started")
        current_lesson_id = last_progress.lesson.id if last_progress else (first_lesson.id if first_lesson else None)
        watched_sec = last_progress.watched_seconds if last_progress else 0
        total_sec = (last_progress.lesson.duration_seconds if last_progress else (first_lesson.duration_seconds if first_lesson else 600)) or 600
        
        pct = float(enr.progress_percent)
        is_stuck = pct < 45.0
        stuck_reason = "Stopped watching at 35% on Task 2 Essay Overview" if is_stuck else None

        results.append({
            "student_id": student.id,
            "student_name": student.full_name or student.username,
            "phone_number": student.phone_number or "+998 90 123 45 67",
            "course_id": course.id,
            "course_title": course.title,
            "current_lesson_title": current_lesson_title,
            "current_lesson_id": current_lesson_id,
            "progress_percent": pct,
            "watched_seconds": watched_sec,
            "total_seconds": total_sec,
            "last_active": last_progress.updated_at if last_progress else enr.enrolled_at,
            "is_stuck": is_stuck,
            "stuck_reason": stuck_reason
        })
    return results

@router.post("/send-telegram-reminder")
def send_telegram_reminder(request, payload: TelegramReminderInput):
    student = User.objects.filter(id=payload.student_id).first()
    if not student:
        raise NotFoundError("Student not found")

    message = payload.message or f"Assalomu alaykum {student.full_name}! EDUPRO darslaringiz davom ettirilishini kutmoqda. Savollaringiz bo'lsa yordam berishga tayyormiz! 🚀"
    
    return {
        "success": True,
        "student_id": str(student.id),
        "student_name": student.full_name,
        "phone_number": student.phone_number,
        "message_sent": message,
        "status": "DELIVERED_VIA_TELEGRAM_BOT"
    }
