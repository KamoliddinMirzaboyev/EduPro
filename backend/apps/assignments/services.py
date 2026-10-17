import random
from apps.assignments.models import Submission, SubmissionStatus

class AIAssessmentService:
    @staticmethod
    def grade_submission(submission: Submission):
        """Simulate intelligent IELTS / Essay auto-grader with Band Descriptors"""
        text = submission.text_answer or ""
        word_count = len(text.split())

        # Intelligent rubric calculation
        if word_count < 150:
            task_resp = 5.5
            coherence = 6.0
            lexical = 5.5
            grammar = 5.5
        elif word_count < 250:
            task_resp = 6.5
            coherence = 6.5
            lexical = 7.0
            grammar = 6.5
        else:
            task_resp = 7.5
            coherence = 7.5
            lexical = 8.0
            grammar = 7.5

        overall = round((task_resp + coherence + lexical + grammar) / 4.0 * 2) / 2

        corrections = [
            {
                "original": "In nowadays",
                "correction": "Nowadays / In recent years",
                "category": "Lexical Resource",
                "explanation": "'In nowadays' is a common colloquial error. Use 'Nowadays' without 'in' or 'In recent decades'."
            },
            {
                "original": "people has many problems",
                "correction": "people have numerous challenges",
                "category": "Grammar & Vocabulary",
                "explanation": "Subject-verb agreement: 'people' is plural, requiring 'have'. Elevated 'challenges' provides stronger academic tone."
            },
            {
                "original": "to solve this issue government should",
                "correction": "to mitigate this issue, the government ought to",
                "category": "Cohesion & Structure",
                "explanation": "Missing comma after introductory infinitive clause. Definite article 'the government' is standard."
            }
        ]

        feedback_json = {
            "overall_band": overall,
            "word_count": word_count,
            "criteria": {
                "task_response": {
                    "score": task_resp,
                    "comment": "Addresses all parts of the prompt with clear central position throughout."
                },
                "coherence_cohesion": {
                    "score": coherence,
                    "comment": "Logical sequencing of ideas with balanced paragraphing and transitional phrases."
                },
                "lexical_resource": {
                    "score": lexical,
                    "comment": "Good range of academic collocations with occasional minor slips."
                },
                "grammatical_range_accuracy": {
                    "score": grammar,
                    "comment": "Wide variety of complex clause structures with high accuracy."
                }
            },
            "summary_feedback": f"Strong submission ({word_count} words). Band estimated at {overall}. Key strengths in argument progression.",
            "highlighted_corrections": corrections
        }

        submission.ai_suggested_score = overall
        submission.ai_feedback_json = feedback_json
        submission.status = SubmissionStatus.AI_GRADED
        submission.save()
        return submission
