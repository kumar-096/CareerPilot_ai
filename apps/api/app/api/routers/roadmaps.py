from fastapi import APIRouter, Depends
from packages.schemas.roadmap_snapshot import RoadmapSnapshot
from packages.schemas.roadmap_commands import TaskCompleteCommand, SprintStartCommand, SprintCloseCommand
from packages.schemas.activity_event import ActivityEvent
from packages.repositories.base import RoadmapRepository, get_roadmap_repo, ActivityEventRepository, get_activity_repo
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/snapshot", response_model=RoadmapSnapshot)
async def get_roadmap_snapshot(repo: RoadmapRepository = Depends(get_roadmap_repo)) -> RoadmapSnapshot:
    """
    Produce current roadmap executions payload logically mapping against exact static metrics seamlessly.
    """
    return repo.load()

@router.post("/task-complete", response_model=RoadmapSnapshot)
async def task_complete(
    cmd: TaskCompleteCommand,
    repo: RoadmapRepository = Depends(get_roadmap_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> RoadmapSnapshot:
    """Idempotent execution resolving percentages organically dynamically passing safely."""
    
    snap = repo.handle_task_complete(cmd.task_id, cmd.sprint_name)
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="task_completed",
        domain="roadmap",
        entity_id=cmd.task_id,
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"sprint": cmd.sprint_name, "task": cmd.task_id}
    ))
    return snap

@router.post("/sprint-start", response_model=RoadmapSnapshot)
async def sprint_start(
    cmd: SprintStartCommand,
    repo: RoadmapRepository = Depends(get_roadmap_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> RoadmapSnapshot:
    """Execute sequence shifts safely natively resolving JSON logic natively."""
    snap = repo.handle_sprint_start(cmd.sprint_name)
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="sprint_started",
        domain="roadmap",
        entity_id=cmd.sprint_name,
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"sprint": cmd.sprint_name}
    ))
    return snap

@router.post("/sprint-close", response_model=RoadmapSnapshot)
async def sprint_close(
    cmd: SprintCloseCommand,
    repo: RoadmapRepository = Depends(get_roadmap_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> RoadmapSnapshot:
    """Close loops intelligently retaining truth accurately."""
    snap = repo.handle_sprint_close(cmd.sprint_name)
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="sprint_closed",
        domain="roadmap",
        entity_id=cmd.sprint_name,
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"sprint": cmd.sprint_name}
    ))
    return snap
