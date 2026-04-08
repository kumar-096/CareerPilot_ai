from fastapi import APIRouter
from packages.schemas.readiness import ReadinessRequest, ReadinessResponse
from services.readiness.scorer import calculate_readiness
from services.roadmap.generator import generate_roadmap
from packages.schemas.readiness_snapshot import ReadinessSnapshot
from services.readiness import readiness_store
from datetime import datetime

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
async def get_readiness_snapshot() -> ReadinessSnapshot:
    """Read specific latest snapshot data state securely enforcing boundaries."""
    return readiness_store.load_readiness_snapshot()

@router.post("/evaluate", response_model=ReadinessSnapshot)
async def evaluate_and_persist(request: ReadinessRequest) -> ReadinessSnapshot:
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
    
    readiness_store.save_readiness_snapshot(snapshot)
    return snapshot
