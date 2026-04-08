import json
import os
from typing import List
from packages.schemas.activity_event import ActivityEvent

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'activity_events.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def load_activity_events() -> List[ActivityEvent]:
    if not os.path.exists(STORE_PATH):
        return []
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return [ActivityEvent(**item) for item in data]
    except Exception:
        return []

def append_activity_event(event: ActivityEvent) -> None:
    """Robust strictly linear sequential chronological appends strictly."""
    _ensure_dir()
    events = load_activity_events()
    events.append(event)
    with open(STORE_PATH, 'w') as f:
        # Guarantee object iteration logic successfully dumping
        json.dump([getattr(e, "model_dump", e.dict)() for e in events], f, indent=2)
