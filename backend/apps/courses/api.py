import re
from typing import List, Optional
from uuid import UUID
from django.utils.text import slugify
from ninja import Router, Query
from apps.courses.models import Course, CourseTariff, Module, Lesson, LessonMaterial, CourseStatus
from apps.courses.schemas import (
    CourseListSchema, CourseDetailSchema, CourseCreateInput,
    ModuleSchema, LessonSchema, ModuleCreateInput, LessonCreateInput,
    CourseModerationInput
)
from apps.users.models import UserRole
from core.auth import AuthBearer, OptionalAuthBearer, check_role
from core.exceptions import NotFoundError, PermissionDeniedError

router = Router(tags=["Courses & Curriculum"])

def course_to_detail_dict(course: Course) -> dict:
    teacher_spec = None
    if hasattr(course.teacher, 'teacher_profile'):
        teacher_spec = course.teacher.teacher_profile.specialization

    modules_data = []
    for mod in course.modules.all().prefetch_related('lessons__materials'):
        lessons_data = []
        for l in mod.lessons.all():
            mats = [
                {"id": m.id, "title": m.title, "file_url": m.file_url, "file_size": m.file_size}
                for m in l.materials.all()
            ]
            lessons_data.append({
                "id": l.id,
                "module_id": mod.id,
                "title": l.title,
                "order": l.order,
                "video_provider_id": l.video_provider_id,
                "duration_seconds": l.duration_seconds,
                "is_free_preview": l.is_free_preview,
                "stop_lesson_required": l.stop_lesson_required,
                "minimum_watch_percent": l.minimum_watch_percent,
                "materials": mats,
            })
        modules_data.append({
            "id": mod.id,
            "title": mod.title,
            "order": mod.order,
            "lessons": lessons_data
        })

    tariffs_data = [
        {
            "id": t.id,
            "title": t.title,
            "price_uzs": float(t.price_uzs),
            "features": t.features or [],
            "is_popular": t.is_popular
        }
        for t in course.tariffs.all()
    ]

    return {
        "id": course.id,
        "title": course.title,
        "slug": course.slug,
        "description": course.description,
        "category": course.category,
        "price": float(course.price),
        "status": course.status,
        "has_drip_lock": course.has_drip_lock,
        "thumbnail_url": course.thumbnail_url,
        "teacher": {
            "id": course.teacher.id,
            "full_name": course.teacher.full_name,
            "avatar": course.teacher.avatar,
            "is_verified": course.teacher.is_verified,
            "specialization": teacher_spec
        },
        "tariffs": tariffs_data,
        "modules": modules_data,
        "created_at": course.created_at
    }

@router.get("/", response=List[CourseListSchema])
def list_courses(
    request,
    category: Optional[str] = None,
    status: Optional[str] = None,
    teacher_id: Optional[UUID] = None
):
    qs = Course.objects.all().select_related('teacher')
    if category:
        qs = qs.filter(category__iexact=category)
    if status:
        qs = qs.filter(status=status)
    if teacher_id:
        qs = qs.filter(teacher_id=teacher_id)

    results = []
    for c in qs:
        spec = getattr(getattr(c.teacher, 'teacher_profile', None), 'specialization', None)
        total_mods = c.modules.count()
        total_less = sum(m.lessons.count() for m in c.modules.all())
        total_students = getattr(c, 'enrollments', []).count() if hasattr(c, 'enrollments') else 0

        results.append({
            "id": c.id,
            "title": c.title,
            "slug": c.slug,
            "description": c.description,
            "category": c.category,
            "price": float(c.price),
            "status": c.status,
            "has_drip_lock": c.has_drip_lock,
            "thumbnail_url": c.thumbnail_url,
            "teacher": {
                "id": c.teacher.id,
                "full_name": c.teacher.full_name,
                "avatar": c.teacher.avatar,
                "is_verified": c.teacher.is_verified,
                "specialization": spec
            },
            "total_modules": total_mods,
            "total_lessons": total_less,
            "total_students": total_students,
            "created_at": c.created_at
        })
    return results

@router.post("/upload-simulation")
def simulate_bunny_upload(request):
    """Simulates Bunny.net TUS direct video upload endpoint returning video_id and playback url"""
    import random
    video_id = f"b_stream_{random.randint(100000, 999999)}"
    return {
        "success": True,
        "video_id": video_id,
        "embed_url": f"https://iframe.mediadelivery.net/embed/edupro/{video_id}",
        "mp4_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "message": "Direct Bunny.net TUS upload initialized successfully"
    }

@router.get("/{course_id_or_slug}", response=CourseDetailSchema)
def get_course_detail(request, course_id_or_slug: str):
    try:
        uuid_val = UUID(course_id_or_slug)
        course = Course.objects.filter(id=uuid_val).first()
    except ValueError:
        course = Course.objects.filter(slug=course_id_or_slug).first()

    if not course:
        raise NotFoundError("Course not found")

    return course_to_detail_dict(course)

@router.post("/", response=CourseDetailSchema, auth=AuthBearer())
def create_course(request, payload: CourseCreateInput):
    check_role(request.user, [UserRole.TEACHER, UserRole.SUPERADMIN])
    
    slug_base = slugify(payload.slug or payload.title)
    slug = slug_base
    count = 1
    while Course.objects.filter(slug=slug).exists():
        slug = f"{slug_base}-{count}"
        count += 1

    course = Course.objects.create(
        teacher=request.user,
        title=payload.title,
        slug=slug,
        description=payload.description,
        category=payload.category,
        price=payload.price,
        has_drip_lock=payload.has_drip_lock,
        thumbnail_url=payload.thumbnail_url,
        status=CourseStatus.DRAFT
    )
    # Default tariffs
    CourseTariff.objects.create(
        course=course,
        title="Self-Study",
        price_uzs=payload.price,
        features=["All video lessons", "Homework checks by AI", "Course PDF materials"]
    )
    CourseTariff.objects.create(
        course=course,
        title="With Curator Support",
        price_uzs=payload.price * 1.5 if payload.price > 0 else 450000,
        features=["Everything in Self-Study", "Dedicated Curator Review", "Weekly Q&A Live Session", "Telegram VIP Group"],
        is_popular=True
    )
    return course_to_detail_dict(course)

@router.post("/{course_id}/modules", response=ModuleSchema, auth=AuthBearer())
def add_module(request, course_id: UUID, payload: ModuleCreateInput):
    course = Course.objects.filter(id=course_id).first()
    if not course:
        raise NotFoundError("Course not found")
    if request.user.role != UserRole.SUPERADMIN and course.teacher_id != request.user.id:
        raise PermissionDeniedError("Cannot modify another teacher's course")
    
    order = payload.order or (course.modules.count() + 1)
    mod = Module.objects.create(course=course, title=payload.title, order=order)
    return {"id": mod.id, "title": mod.title, "order": mod.order, "lessons": []}

@router.post("/modules/{module_id}/lessons", response=LessonSchema, auth=AuthBearer())
def add_lesson(request, module_id: UUID, payload: LessonCreateInput):
    mod = Module.objects.filter(id=module_id).select_related('course').first()
    if not mod:
        raise NotFoundError("Module not found")
    if request.user.role != UserRole.SUPERADMIN and mod.course.teacher_id != request.user.id:
        raise PermissionDeniedError("Cannot modify another teacher's course")

    order = payload.order or (mod.lessons.count() + 1)
    lesson = Lesson.objects.create(
        module=mod,
        title=payload.title,
        order=order,
        video_provider_id=payload.video_provider_id or "bunny_sim_7894",
        duration_seconds=payload.duration_seconds,
        is_free_preview=payload.is_free_preview,
        stop_lesson_required=payload.stop_lesson_required,
        minimum_watch_percent=payload.minimum_watch_percent
    )
    return {
        "id": lesson.id,
        "module_id": mod.id,
        "title": lesson.title,
        "order": lesson.order,
        "video_provider_id": lesson.video_provider_id,
        "duration_seconds": lesson.duration_seconds,
        "is_free_preview": lesson.is_free_preview,
        "stop_lesson_required": lesson.stop_lesson_required,
        "minimum_watch_percent": lesson.minimum_watch_percent,
        "materials": []
    }

@router.patch("/{course_id}/moderate", response=CourseDetailSchema, auth=AuthBearer())
def moderate_course(request, course_id: UUID, payload: CourseModerationInput):
    check_role(request.user, [UserRole.SUPERADMIN])
    course = Course.objects.filter(id=course_id).first()
    if not course:
        raise NotFoundError("Course not found")
    course.status = payload.status
    course.save()
    return course_to_detail_dict(course)

