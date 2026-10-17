from uuid import UUID
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class HeartbeatInput(BaseModel):
    lesson_id: UUID
    position_seconds: int
    duration_seconds: int

class LessonProgressSchema(BaseModel):
    lesson_id: UUID
    watched_seconds: int
    last_position_seconds: int
    is_completed: bool
    completion_percentage: float

class StudentCRMRecordSchema(BaseModel):
    student_id: UUID
    student_name: str
    phone_number: Optional[str] = None
    course_id: UUID
    course_title: str
    current_lesson_title: str
    current_lesson_id: Optional[UUID] = None
    progress_percent: float
    watched_seconds: int
    total_seconds: int
    last_active: datetime
    is_stuck: bool
    stuck_reason: Optional[str] = None

class TelegramReminderInput(BaseModel):
    student_id: UUID
    message: Optional[str] = None
