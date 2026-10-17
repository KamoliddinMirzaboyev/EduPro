from uuid import UUID
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class LessonMaterialSchema(BaseModel):
    id: UUID
    title: str
    file_url: str
    file_size: str

class LessonSchema(BaseModel):
    id: UUID
    module_id: UUID
    title: str
    order: int
    video_provider_id: Optional[str] = None
    duration_seconds: int
    is_free_preview: bool
    stop_lesson_required: bool
    minimum_watch_percent: int
    materials: List[LessonMaterialSchema] = []

class ModuleSchema(BaseModel):
    id: UUID
    title: str
    order: int
    lessons: List[LessonSchema] = []

class CourseTariffSchema(BaseModel):
    id: UUID
    title: str
    price_uzs: float
    features: List[str] = []
    is_popular: bool

class TeacherMinimalSchema(BaseModel):
    id: UUID
    full_name: str
    avatar: Optional[str] = None
    is_verified: bool
    specialization: Optional[str] = None

class CourseListSchema(BaseModel):
    id: UUID
    title: str
    slug: str
    description: str
    category: str
    price: float
    status: str
    has_drip_lock: bool
    thumbnail_url: Optional[str] = None
    teacher: TeacherMinimalSchema
    total_modules: int = 0
    total_lessons: int = 0
    total_students: int = 0
    created_at: datetime

class CourseDetailSchema(BaseModel):
    id: UUID
    title: str
    slug: str
    description: str
    category: str
    price: float
    status: str
    has_drip_lock: bool
    thumbnail_url: Optional[str] = None
    teacher: TeacherMinimalSchema
    tariffs: List[CourseTariffSchema] = []
    modules: List[ModuleSchema] = []
    created_at: datetime

class CourseCreateInput(BaseModel):
    title: str
    slug: Optional[str] = None
    description: str = ""
    category: str = "IELTS"
    price: float = 0.0
    has_drip_lock: bool = False
    thumbnail_url: Optional[str] = None

class LessonCreateInput(BaseModel):
    title: str
    order: Optional[int] = None
    video_provider_id: Optional[str] = None
    duration_seconds: int = 600
    is_free_preview: bool = False
    stop_lesson_required: bool = False
    minimum_watch_percent: int = 85

class ModuleCreateInput(BaseModel):
    title: str
    order: Optional[int] = None

class CourseModerationInput(BaseModel):
    status: str # PUBLISHED, DRAFT, etc.
    feedback: Optional[str] = None
