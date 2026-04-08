from fastapi import APIRouter
from packages.schemas.dashboard_snapshot import DashboardSnapshot
from services.analytics import snapshot_store

router = APIRouter()

@router.get("/snapshot", response_model=DashboardSnapshot)
async def get_dashboard_snapshot() -> DashboardSnapshot:
    """
    Retrieve the platform intelligence dashboard snapshot securely from local static persistence.
    Auto-bootstraps demo data if not yet initialized.
    """
    return snapshot_store.load_snapshot()
