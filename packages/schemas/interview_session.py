from pydantic import BaseModel
from typing import List

class InterviewRequest(BaseModel):
    interview_type: str
    transcript: str
    confidence_score: int

class InterviewSession(BaseModel):
    session_id: str
    interview_type: str
    transcript: str
    confidence_score: int
    weakness_heatmap: List[str]
    filler_count: int
    created_at: str
