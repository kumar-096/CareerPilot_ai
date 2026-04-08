import json
import os
from packages.schemas.roadmap_snapshot import RoadmapSnapshot

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'roadmap_snapshot.json')
SPRINTS_PATH = os.path.join(STORE_DIR, 'roadmap_sprints.json')

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
        # Resolve to standard dictionary
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        json.dump(data, f, indent=2)

def load_roadmap_snapshot() -> RoadmapSnapshot:
    if not os.path.exists(STORE_PATH):
        default_snap = get_default_roadmap()
        save_roadmap_snapshot(default_snap)
        return default_snap
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return RoadmapSnapshot(**data)
    except Exception:
        default_snap = get_default_roadmap()
        save_roadmap_snapshot(default_snap)
        return default_snap

def load_sprints():
    """Retrieve isolated state managing bounded context active sequences securely."""
    if not os.path.exists(SPRINTS_PATH):
        return {"active_sprint": None, "historical_sprints": []}
    try:
        with open(SPRINTS_PATH, 'r') as f:
            return json.load(f)
    except Exception:
        return {"active_sprint": None, "historical_sprints": []}

def save_sprints(data):
    """Securely resolve sequential executions appending logically towards database adapters later."""
    _ensure_dir()
    with open(SPRINTS_PATH, 'w') as f:
        json.dump(data, f, indent=2)

def handle_sprint_start(sprint_name: str) -> RoadmapSnapshot:
    """Safely transitions active sprint cycles strictly preserving singleton boundaries natively."""
    sprints = load_sprints()
    if sprints["active_sprint"]:
        sprints["historical_sprints"].append(sprints["active_sprint"])
    
    sprints["active_sprint"] = {
        "name": sprint_name,
        "completed_tasks": [],
        "total_tasks": 10
    }
    save_sprints(sprints)
    
    snap = load_roadmap_snapshot()
    snap.completion_percent = 0
    snap.active_focus = sprint_name
    save_roadmap_snapshot(snap)
    return snap

def handle_sprint_close(sprint_name: str) -> RoadmapSnapshot:
    """Ensures empty queue invariants safely archiving executions gracefully."""
    sprints = load_sprints()
    active = sprints["active_sprint"]
    if active and active["name"] == sprint_name:
        sprints["historical_sprints"].append(active)
        sprints["active_sprint"] = None
        save_sprints(sprints)
    
    return load_roadmap_snapshot()

def handle_task_complete(task_id: str, sprint_name: str) -> RoadmapSnapshot:
    """Records precise execution logs preventing overlaps, deriving math implicitly matching."""
    sprints = load_sprints()
    snap = load_roadmap_snapshot()
    active = sprints["active_sprint"]
    
    if active and active["name"] == sprint_name:
        if task_id not in active["completed_tasks"]:
            active["completed_tasks"].append(task_id)
            # Recompute exactly once resolving properly 
            percent = int((len(active["completed_tasks"]) / active["total_tasks"]) * 100)
            snap.completion_percent = min(100, percent)
            
            save_roadmap_snapshot(snap)
            save_sprints(sprints)
            
    return snap
