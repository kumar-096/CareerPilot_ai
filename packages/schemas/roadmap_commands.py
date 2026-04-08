from pydantic import BaseModel
from typing import Optional

class TaskCompleteCommand(BaseModel):
    task_id: str
    sprint_name: str
    updated_at: Optional[str] = None

class SprintStartCommand(BaseModel):
    sprint_name: str
    updated_at: Optional[str] = None

class SprintCloseCommand(BaseModel):
    sprint_name: str
    updated_at: Optional[str] = None
