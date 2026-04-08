import json
import os
from datetime import datetime
from packages.schemas.readiness_snapshot import ReadinessSnapshot

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'readiness_snapshot.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def get_default_readiness() -> ReadinessSnapshot:
    return ReadinessSnapshot(
        readiness_score=78,
        level="Intermediate",
        target_role="Software Engineer",
        missing_skills=["System Design", "AWS"],
        weak_zones=["Dynamic Programming", "Concurrency"],
        updated_at=datetime.utcnow().isoformat() + "Z"
    )

def save_readiness_snapshot(snapshot: ReadinessSnapshot) -> None:
    _ensure_dir()
    with open(STORE_PATH, 'w') as f:
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        json.dump(data, f, indent=2)

def load_readiness_snapshot() -> ReadinessSnapshot:
    if not os.path.exists(STORE_PATH):
        # Auto bootstrap the single source of truth locally explicitly.
        default_snap = get_default_readiness()
        save_readiness_snapshot(default_snap)
        return default_snap
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return ReadinessSnapshot(**data)
    except Exception:
        # Fallback avoiding crashes resolving immediately safely
        default_snap = get_default_readiness()
        save_readiness_snapshot(default_snap)
        return default_snap
