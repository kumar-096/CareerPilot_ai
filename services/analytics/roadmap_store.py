import json
import os
from packages.schemas.roadmap_snapshot import RoadmapSnapshot

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'roadmap_snapshot.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def get_default_roadmap() -> RoadmapSnapshot:
    return RoadmapSnapshot(
        current_day=3,
        total_days=7,
        completion_percent=57,
        streak_days=14,
        active_focus="System Design & DSA"
    )

def save_roadmap_snapshot(snapshot: RoadmapSnapshot) -> None:
    _ensure_dir()
    with open(STORE_PATH, 'w') as f:
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        json.dump(data, f, indent=2)

def load_roadmap_snapshot() -> RoadmapSnapshot:
    if not os.path.exists(STORE_PATH):
        # Implement self-healing robust bootstrapping securely mapping baseline targets seamlessly
        default_snap = get_default_roadmap()
        save_roadmap_snapshot(default_snap)
        return default_snap
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return RoadmapSnapshot(**data)
    except Exception:
        # Fallback ensuring API doesn't throw 500 automatically bridging baseline payloads
        default_snap = get_default_roadmap()
        save_roadmap_snapshot(default_snap)
        return default_snap
