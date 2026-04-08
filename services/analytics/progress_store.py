import json
import os
from packages.schemas.progress_snapshot import ProgressSnapshot

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'progress_snapshot.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def get_default_progress() -> ProgressSnapshot:
    return ProgressSnapshot(
        applied=24,
        oa_cleared=10,
        interviews=4,
        offers=1,
        companies=[
            {
                "id": "1",
                "company": "Autodesk",
                "role": "Software Engineer",
                "current_stage": "OA",
                "last_updated": "1d ago",
                "result": "Pending"
            },
            {
                "id": "2",
                "company": "Amazon",
                "role": "Frontend Engineer",
                "current_stage": "Offer",
                "last_updated": "1w ago",
                "result": "Secured"
            },
            {
                "id": "3",
                "company": "Atlassian",
                "role": "Software Engineer",
                "current_stage": "Applied",
                "last_updated": "2d ago",
                "result": "Pending"
            },
            {
                "id": "4",
                "company": "ServiceNow",
                "role": "UI Engineer",
                "current_stage": "Interview",
                "last_updated": "4h ago",
                "result": "Pending"
            }
        ]
    )

def save_progress_snapshot(snapshot: ProgressSnapshot) -> None:
    _ensure_dir()
    with open(STORE_PATH, 'w') as f:
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        json.dump(data, f, indent=2)

def load_progress_snapshot() -> ProgressSnapshot:
    if not os.path.exists(STORE_PATH):
        # Auto-initialize fallback logic seamlessly
        default_snap = get_default_progress()
        save_progress_snapshot(default_snap)
        return default_snap
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return ProgressSnapshot(**data)
    except Exception:
        # Failsafe logic resolving to standard state if file breaks organically
        default_snap = get_default_progress()
        save_progress_snapshot(default_snap)
        return default_snap
