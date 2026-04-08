from pydantic import BaseModel
from typing import List

class ReadinessSnapshot(BaseModel):
    readiness_score: int
    level: str
    target_role: str
    missing_skills: List[str]
    weak_zones: List[str]
    updated_at: str
