from pydantic import BaseModel

class RoadmapSnapshot(BaseModel):
    current_day: int
    total_days: int
    completion_percent: int
    streak_days: int
    active_focus: str
