from fastapi import APIRouter
from packages.schemas.roadmap_snapshot import RoadmapSnapshot
from services.analytics import roadmap_store

router = APIRouter()

@router.get("/snapshot", response_model=RoadmapSnapshot)
async def get_roadmap_snapshot() -> RoadmapSnapshot:
    """
    Produce current roadmap executions payload logically mapping against exact static metrics seamlessly.
    """
    return roadmap_store.load_roadmap_snapshot()
