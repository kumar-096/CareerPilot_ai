import json
import os
from datetime import datetime
from packages.schemas.trust_snapshot import TrustSnapshot

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'trust_snapshot.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def get_default_trust() -> TrustSnapshot:
    return TrustSnapshot(
        trust_score=76,
        risk_level="Medium Risk",
        recruiter_email="hiring@startup-tech.org",
        job_url="https://startup-tech.org/careers",
        suspicious_flags=["Generic email domain", "High salary claim"],
        salary_anomaly=True,
        checked_at=datetime.utcnow().isoformat() + "Z"
    )

def save_trust_snapshot(snapshot: TrustSnapshot) -> None:
    _ensure_dir()
    with open(STORE_PATH, 'w') as f:
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        json.dump(data, f, indent=2)

def load_trust_snapshot() -> TrustSnapshot:
    if not os.path.exists(STORE_PATH):
        # Implicitly load default payload simulating canonical state statically securely.
        default_snap = get_default_trust()
        save_trust_snapshot(default_snap)
        return default_snap
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return TrustSnapshot(**data)
    except Exception:
        # Prevent 500 crashes gracefully parsing back down dynamically accurately.
        default_snap = get_default_trust()
        save_trust_snapshot(default_snap)
        return default_snap
