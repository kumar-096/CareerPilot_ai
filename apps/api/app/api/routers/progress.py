from fastapi import APIRouter
from packages.schemas.progress_snapshot import ProgressSnapshot
from services.analytics import progress_store

router = APIRouter()

@router.get("/snapshot", response_model=ProgressSnapshot)
async def get_progress_snapshot() -> ProgressSnapshot:
    """
    Retrieve real-time tracking pipeline and functor metrics successfully resolving from standard persistence models.
    """
    return progress_store.load_progress_snapshot()
