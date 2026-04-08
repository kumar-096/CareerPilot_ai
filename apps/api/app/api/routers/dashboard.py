from fastapi import APIRouter
from packages.schemas.dashboard_snapshot import DashboardSnapshot
from services.analytics import snapshot_store
from services.analytics import progress_store
from services.analytics import roadmap_store
from services.readiness import readiness_store

router = APIRouter()

@router.get("/snapshot", response_model=DashboardSnapshot)
async def get_dashboard_snapshot() -> DashboardSnapshot:
    """
    Retrieve the platform intelligence dashboard snapshot securely from local static persistence.
    Auto-bootstraps demo data if not yet initialized.
    Dynamically syncs application count natively using underlying progress truth.
    Dynamically maps overarching weekly trends inherently driven realistically.
    """
    dashboard_snap = snapshot_store.load_snapshot()
    progress_snap = progress_store.load_progress_snapshot()
    roadmap_snap = roadmap_store.load_roadmap_snapshot()
    readiness_snap = readiness_store.load_readiness_snapshot()
    
    dashboard_snap.total_applications = progress_snap.applied
    dashboard_snap.weekly_execution_trend = f"+{roadmap_snap.completion_percent}%"
    dashboard_snap.latest_readiness_score = readiness_snap.readiness_score
    
    return dashboard_snap
