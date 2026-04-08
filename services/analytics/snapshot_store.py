import json
import os
from packages.schemas.dashboard_snapshot import DashboardSnapshot

# Store locally relative to project root without polluting source control visually
STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'dashboard_snapshot.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def get_default_snapshot() -> DashboardSnapshot:
    return DashboardSnapshot(
        latest_ats_score=90,
        latest_readiness_score=78,
        weekly_execution_trend="+12%",
        total_applications=24,
        recent_activities=[
            "Resume ATS analyzed",
            "Readiness sprint generated",
            "Mock interview scored",
            "Trust flagged medium risk",
            "Roadmap streak 14 days"
        ]
    )

def save_snapshot(snapshot: DashboardSnapshot) -> None:
    _ensure_dir()
    with open(STORE_PATH, 'w') as f:
        # Pydantic v2 model_dump, fallback slightly for v1 generically using dict() if error
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        json.dump(data, f, indent=2)

def load_snapshot() -> DashboardSnapshot:
    if not os.path.exists(STORE_PATH):
        # Auto-bootstrap initial snapshot securely
        default_snap = get_default_snapshot()
        save_snapshot(default_snap)
        return default_snap
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return DashboardSnapshot(**data)
    except Exception:
        # Fallback behavior if file is somehow structurally corrupted
        default_snap = get_default_snapshot()
        save_snapshot(default_snap)
        return default_snap
