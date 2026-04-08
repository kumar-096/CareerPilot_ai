from fastapi import APIRouter, HTTPException, Depends
from packages.schemas.trust_snapshot import TrustVerifyRequest, TrustSnapshot
from datetime import datetime
from packages.schemas.activity_event import ActivityEvent
import uuid
from packages.repositories.base import TrustRepository, get_trust_repo, ActivityEventRepository, get_activity_repo

router = APIRouter()

@router.get("/snapshot", response_model=TrustSnapshot)
async def get_trust_snapshot(repo: TrustRepository = Depends(get_trust_repo)) -> TrustSnapshot:
    """Retrieve persisted canonical trust truth securely via GET method explicitly."""
    return repo.load()

@router.post("/verify", response_model=TrustSnapshot)
async def verify_trust(
    request: TrustVerifyRequest,
    repo: TrustRepository = Depends(get_trust_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> TrustSnapshot:
    """Run simulated engine deterministic calculations synchronously rewriting data explicitly natively."""
    if "@" not in request.recruiter_email:
        raise HTTPException(status_code=400, detail="Invalid email format provided")
    if not request.job_url.startswith("http"):
        raise HTTPException(status_code=400, detail="Invalid URL protocol string")
        
    score = 95
    flags = []
    anomaly = False
    
    email_lower = request.recruiter_email.lower()
    if "gmail.com" in email_lower or "yahoo.com" in email_lower:
        flags.append("Free email provider utilized")
        score -= 20
        
    salary_lower = (request.salary_claim or "").lower()
    if salary_lower and ("1000000" in salary_lower or "cash" in salary_lower):
        flags.append("Salary structure anomalous")
        anomaly = True
        score -= 30
        
    # Scale categorization boundaries dynamically mirroring production layouts
    if score >= 80:
        level = "Low Risk"
    elif score >= 50:
        level = "Medium Risk"
    else:
        level = "High Risk"
        
    snapshot = TrustSnapshot(
        trust_score=score,
        risk_level=level,
        recruiter_email=request.recruiter_email,
        job_url=request.job_url,
        suspicious_flags=flags,
        salary_anomaly=anomaly,
        checked_at=datetime.utcnow().isoformat() + "Z"
    )
    
    repo.save(snapshot)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="trust_verified",
        domain="trust",
        entity_id=request.recruiter_email,
        timestamp=snapshot.checked_at,
        payload={"risk_level": snapshot.risk_level, "score": snapshot.trust_score}
    ))
    
    return snapshot
