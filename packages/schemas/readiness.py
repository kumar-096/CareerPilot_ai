from pydantic import BaseModel, Field
from typing import List, Literal

class ReadinessRequest(BaseModel):
    cgpa: float = Field(..., ge=0, le=10)
    dsa_count: int = Field(..., ge=0)
    skills: List[str]
    target_role: str
    target_company: str

class ReadinessResponse(BaseModel):
    readiness_score: int
    level: Literal["high", "medium", "low"]
    missing_skills: List[str]
    weak_zones: List[str]
    roadmap: List[str]
