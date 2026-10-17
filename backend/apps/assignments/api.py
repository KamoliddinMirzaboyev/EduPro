from typing import List, Optional
from uuid import UUID
from ninja import Router
from apps.assignments.models import Assignment, Submission, SubmissionStatus
from apps.assignments.schemas import (
    AssignmentSchema, AssignmentCreateInput,
    SubmissionSubmitInput, TeacherReviewInput, SubmissionSchema
)
from apps.assignments.services import AIAssessmentService
from apps.users.models import UserRole
from core.auth import AuthBearer, OptionalAuthBearer, check_role
from core.exceptions import NotFoundError, PermissionDeniedError

router = Router(tags=["Assignments & AI Assessment"])

def submission_to_dict(sub: Submission) -> dict:
    return {
        "id": sub.id,
        "assignment_id": sub.assignment.id,
        "assignment_title": sub.assignment.title,
        "assignment_type": sub.assignment.type,
        "student": {
            "id": sub.student.id,
            "full_name": sub.student.full_name or sub.student.username,
            "avatar": sub.student.avatar,
            "email": sub.student.email
        },
        "text_answer": sub.text_answer,
        "audio_or_file_url": sub.audio_or_file_url,
        "status": sub.status,
        "ai_suggested_score": float(sub.ai_suggested_score) if sub.ai_suggested_score is not None else None,
        "ai_feedback_json": sub.ai_feedback_json or {},
        "final_score": float(sub.final_score) if sub.final_score is not None else None,
        "teacher_feedback": sub.teacher_feedback or "",
        "submitted_at": sub.submitted_at,
        "updated_at": sub.updated_at
    }

@router.get("/lesson/{lesson_id}", response=List[AssignmentSchema])
def get_assignments_for_lesson(request, lesson_id: UUID):
    assignments = Assignment.objects.filter(lesson_id=lesson_id)
    return [
        {
            "id": a.id,
            "lesson_id": a.lesson_id,
            "title": a.title,
            "type": a.type,
            "instructions": a.instructions,
            "max_score": float(a.max_score),
            "ai_grading_enabled": a.ai_grading_enabled
        }
        for a in assignments
    ]

@router.post("/", response=AssignmentSchema, auth=AuthBearer())
def create_assignment(request, payload: AssignmentCreateInput):
    check_role(request.user, [UserRole.TEACHER, UserRole.SUPERADMIN])
    assignment = Assignment.objects.create(
        lesson_id=payload.lesson_id,
        title=payload.title,
        type=payload.type,
        instructions=payload.instructions,
        max_score=payload.max_score,
        ai_grading_enabled=payload.ai_grading_enabled,
        rubric_prompt=payload.rubric_prompt or ''
    )
    return {
        "id": assignment.id,
        "lesson_id": assignment.lesson_id,
        "title": assignment.title,
        "type": assignment.type,
        "instructions": assignment.instructions,
        "max_score": float(assignment.max_score),
        "ai_grading_enabled": assignment.ai_grading_enabled
    }

@router.post("/submissions", response=SubmissionSchema, auth=AuthBearer())
def submit_assignment(request, payload: SubmissionSubmitInput):
    assignment = Assignment.objects.filter(id=payload.assignment_id).first()
    if not assignment:
        raise NotFoundError("Assignment not found")

    sub = Submission.objects.create(
        assignment=assignment,
        student=request.user,
        text_answer=payload.text_answer,
        audio_or_file_url=payload.audio_or_file_url,
        status=SubmissionStatus.PENDING
    )

    if assignment.ai_grading_enabled:
        AIAssessmentService.grade_submission(sub)

    return submission_to_dict(sub)

@router.get("/submissions", response=List[SubmissionSchema])
def list_submissions(
    request,
    status: Optional[str] = None,
    student_id: Optional[UUID] = None,
    assignment_id: Optional[UUID] = None
):
    qs = Submission.objects.all().select_related('assignment', 'student').order_by('-submitted_at')
    if status:
        qs = qs.filter(status=status)
    if student_id:
        qs = qs.filter(student_id=student_id)
    if assignment_id:
        qs = qs.filter(assignment_id=assignment_id)

    return [submission_to_dict(s) for s in qs]

@router.get("/submissions/{submission_id}", response=SubmissionSchema)
def get_submission(request, submission_id: UUID):
    sub = Submission.objects.filter(id=submission_id).select_related('assignment', 'student').first()
    if not sub:
        raise NotFoundError("Submission not found")
    return submission_to_dict(sub)

@router.post("/submissions/{submission_id}/review", response=SubmissionSchema, auth=AuthBearer())
def review_submission(request, submission_id: UUID, payload: TeacherReviewInput):
    check_role(request.user, [UserRole.TEACHER, UserRole.CURATOR, UserRole.SUPERADMIN])
    sub = Submission.objects.filter(id=submission_id).first()
    if not sub:
        raise NotFoundError("Submission not found")

    sub.final_score = payload.final_score
    sub.teacher_feedback = payload.teacher_feedback
    sub.status = SubmissionStatus.TEACHER_REVIEWED
    sub.reviewed_by = request.user
    sub.save()
    return submission_to_dict(sub)

@router.post("/submissions/{submission_id}/re-grade", response=SubmissionSchema, auth=AuthBearer())
def re_grade_submission(request, submission_id: UUID):
    sub = Submission.objects.filter(id=submission_id).first()
    if not sub:
        raise NotFoundError("Submission not found")
    AIAssessmentService.grade_submission(sub)
    return submission_to_dict(sub)
