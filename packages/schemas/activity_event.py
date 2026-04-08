from pydantic import BaseModel
from typing import Dict, Any

class ActivityEvent(BaseModel):
    event_id: str
    event_type: str
    domain: str
    entity_id: str
    timestamp: str
    payload: Dict[str, Any]
