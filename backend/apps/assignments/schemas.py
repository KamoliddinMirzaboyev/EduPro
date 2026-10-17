from uuid import UUID
from typing import Optional, Any, Dict
from pydantic import BaseModel
from datetime import datetime

class AssignmentSchema(BaseModel):
    id: UUID
    lesson_id: UUID
    title: str
    type: str
    instructions: str
    max_score: float
    ai_grading_enabled: bool

class AssignmentCreateInput(BaseModel):
    lesson_id: UUID
    title: str
    type: str = "WRITING_ESSAY"
    instructions: str
    max_score: float = 9.0
    ai_grading_enabled: bool = True
    rubric_prompt: Optional[str] = None

class SubmissionSubmitInput(BaseModel):
    assignment_id: UUID
    text_answer: str = ""
    audio_or_file_url: Optional[str] = None

class TeacherReviewInput(BaseModel):
    final_score: float
    teacher_feedback: str

class StudentMinimalSchema(BaseModel):
    id: UUID
    full_name: str
    avatar: Optional[str] = None
    email: Optional[str] = None

class SubmissionSchema(BaseModel):
    id: UUID
    assignment_id: UUID
    assignment_title: str
    assignment_type: str
    student: StudentMinimalSchema
    text_answer: str
    audio_or_file_url: Optional[str] = None
    status: str
    ai_suggested_score: Optional[float] = None
    ai_feedback_json: Dict[str, Any] = {}
    final_score: Optional[float] = None
    teacher_feedback: Optional[str] = ""
    submitted_at: datetime
    updated_at: datetime
