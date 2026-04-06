from fastapi import APIRouter
from packages.schemas.readiness import ReadinessRequest, ReadinessResponse
from services.readiness.scorer import calculate_readiness
from services.roadmap.generator import generate_roadmap

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
