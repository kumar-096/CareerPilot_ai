from fastapi import APIRouter, Depends
from packages.schemas.readiness import ReadinessRequest, ReadinessResponse
from services.readiness.scorer import calculate_readiness
from services.roadmap.generator import generate_roadmap
from packages.schemas.readiness_snapshot import ReadinessSnapshot
from datetime import datetime
from packages.schemas.activity_event import ActivityEvent
import uuid
from packages.repositories.base import ReadinessRepository, get_readiness_repo, ActivityEventRepository, get_activity_repo

router = APIRouter()

@router.post("/analyze", response_model=ReadinessResponse)
async def analyze_readiness(request: ReadinessRequest):
    scoring_result = calculate_readiness(
        cgpa=request.cgpa,
        dsa_count=request.dsa_count,
        skills=request.skills,
        target_role=request.target_role
    )
    
    roadmap = generate_roadmap(
        weak_zones=scoring_result["weak_zones"],
        target_role=request.target_role
    )
    
    return ReadinessResponse(
        readiness_score=scoring_result["readiness_score"],
        level=scoring_result["level"],
        missing_skills=scoring_result["missing_skills"],
        weak_zones=scoring_result["weak_zones"],
        roadmap=roadmap
    )

@router.get("/snapshot", response_model=ReadinessSnapshot)
async def get_readiness_snapshot(repo: ReadinessRepository = Depends(get_readiness_repo)) -> ReadinessSnapshot:
    """Read specific latest snapshot data state securely enforcing boundaries."""
    return repo.load()

@router.post("/evaluate", response_model=ReadinessSnapshot)
async def evaluate_and_persist(
    request: ReadinessRequest, 
    repo: ReadinessRepository = Depends(get_readiness_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> ReadinessSnapshot:
    """Accept inputs strictly validating and updating standard data sources persisting deterministically locally."""
    scoring_result = calculate_readiness(
        cgpa=request.cgpa,
        dsa_count=request.dsa_count,
        skills=request.skills,
        target_role=request.target_role
    )
    
    snapshot = ReadinessSnapshot(
        readiness_score=scoring_result["readiness_score"],
        level=scoring_result["level"],
        target_role=request.target_role,
        missing_skills=scoring_result["missing_skills"],
        weak_zones=scoring_result["weak_zones"],
        updated_at=datetime.utcnow().isoformat() + "Z"
    )
    
    repo.save(snapshot)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="readiness_evaluated",
        domain="readiness",
        entity_id=request.target_role,
        timestamp=snapshot.updated_at,
        payload={"score": snapshot.readiness_score, "level": snapshot.level}
    ))
    
    return snapshot
