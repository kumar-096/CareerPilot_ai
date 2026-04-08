from pydantic import BaseModel
from typing import List

class DashboardSnapshot(BaseModel):
    latest_ats_score: int
    latest_readiness_score: int
    weekly_execution_trend: str
    total_applications: int
    recent_activities: List[str]
