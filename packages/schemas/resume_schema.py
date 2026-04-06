from pydantic import BaseModel
from typing import List

class ATSScoreBreakdown(BaseModel):
    formatting: int
    keywords: int
    impact_metrics: int
    length: int

class ATSScoreResponse(BaseModel):
    score: int
    status: str
    breakdown: ATSScoreBreakdown
    issues: List[str]

# Future readiness score schema placeholder
class ReadinessScoreResponse(BaseModel):
    pass
