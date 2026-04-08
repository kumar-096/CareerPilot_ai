from fastapi import APIRouter, Depends
from packages.schemas.progress_snapshot import ProgressSnapshot, CompanyApplication
from packages.schemas.progress_commands import (
    ApplicationCreateCommand,
    StageTransitionCommand,
    RejectionCommand,
    OfferCommand
)
import uuid
from packages.schemas.activity_event import ActivityEvent
from packages.repositories.base import ProgressRepository, get_progress_repo, ActivityEventRepository, get_activity_repo
from datetime import datetime

router = APIRouter()

@router.get("/snapshot", response_model=ProgressSnapshot)
async def get_progress_snapshot(repo: ProgressRepository = Depends(get_progress_repo)) -> ProgressSnapshot:
    """
    Retrieve real-time tracking pipeline and functor metrics successfully resolving from standard persistence models.
    """
    return repo.load()

@router.post("/application", response_model=ProgressSnapshot)
async def create_application(
    cmd: ApplicationCreateCommand,
    repo: ProgressRepository = Depends(get_progress_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> ProgressSnapshot:
    """Orchestrate new application creations inherently scaling global variables accurately preserving derivation paths natively."""
    snap = repo.load()
    snap.applied += 1
    
    new_app = CompanyApplication(
        id=str(uuid.uuid4()),
        company=cmd.company_name,
        role=cmd.role,
        current_stage='Applied',
        last_updated=cmd.updated_at or "Just now",
        result='Pending'
    )
    snap.companies.append(new_app)
    repo.save(snap)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="application_created",
        domain="progress",
        entity_id=new_app.id,
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"company": cmd.company_name, "role": cmd.role}
    ))
    
    return snap

@router.post("/stage-transition", response_model=ProgressSnapshot)
async def transition_stage(
    cmd: StageTransitionCommand,
    repo: ProgressRepository = Depends(get_progress_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> ProgressSnapshot:
    """Orchestrate funnel updates statically mirroring state calculations dynamically."""
    snap = repo.load()
    for comp in snap.companies:
        if comp.company == cmd.company_name and comp.role == cmd.role:
            comp.current_stage = cmd.stage
            comp.last_updated = cmd.updated_at or "Just now"
            if cmd.stage == "OA":
                snap.oa_cleared += 1
            elif cmd.stage == "Interview":
                snap.interviews += 1
            break
    repo.save(snap)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="stage_transitioned",
        domain="progress",
        entity_id=f"{cmd.company_name}_{cmd.role}",
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"company": cmd.company_name, "stage": cmd.stage}
    ))
    
    return snap

@router.post("/rejection", response_model=ProgressSnapshot)
async def reject_application(
    cmd: RejectionCommand,
    repo: ProgressRepository = Depends(get_progress_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> ProgressSnapshot:
    """Process failure loops consistently preventing cross-domain math overlaps globally."""
    snap = repo.load()
    for comp in snap.companies:
        if comp.company == cmd.company_name and comp.role == cmd.role:
            comp.current_stage = 'Rejected'
            comp.result = 'Failed'
            comp.last_updated = cmd.updated_at or "Just now"
            break
    repo.save(snap)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="application_rejected",
        domain="progress",
        entity_id=f"{cmd.company_name}_{cmd.role}",
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"company": cmd.company_name}
    ))
    
    return snap

@router.post("/offer", response_model=ProgressSnapshot)
async def offer_application(
    cmd: OfferCommand,
    repo: ProgressRepository = Depends(get_progress_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> ProgressSnapshot:
    """Finalize successful flows seamlessly converting end-state targets gracefully safely."""
    snap = repo.load()
    for comp in snap.companies:
        if comp.company == cmd.company_name and comp.role == cmd.role:
            comp.current_stage = 'Offer'
            comp.result = 'Secured'
            comp.last_updated = cmd.updated_at or "Just now"
            snap.offers += 1
            break
    repo.save(snap)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="offer_received",
        domain="progress",
        entity_id=f"{cmd.company_name}_{cmd.role}",
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={"company": cmd.company_name}
    ))
    
    return snap
