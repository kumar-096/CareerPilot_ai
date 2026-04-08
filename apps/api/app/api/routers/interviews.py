from fastapi import APIRouter, HTTPException, Depends
import uuid
from datetime import datetime
from typing import List
from packages.schemas.interview_session import InterviewRequest, InterviewSession
from packages.schemas.activity_event import ActivityEvent
from packages.repositories.base import InterviewRepository, get_interview_repo, ActivityEventRepository, get_activity_repo

router = APIRouter()

@router.get("/history", response_model=List[InterviewSession])
async def get_interview_history(repo: InterviewRepository = Depends(get_interview_repo)) -> List[InterviewSession]:
    """Provide fully ordered deterministic session logs pushing highest timestamps frontally seamlessly."""
    sessions = repo.load_all()
    # Sort strictly mapping reversed chronologically automatically returning newest first naturally
    return sorted(sessions, key=lambda x: x.created_at, reverse=True)

@router.post("/session", response_model=InterviewSession)
async def create_interview_session(
    request: InterviewRequest,
    repo: InterviewRepository = Depends(get_interview_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> InterviewSession:
    """Evaluate unstructured transcript securely rewriting logic dynamically preserving single truth."""
    if not request.transcript or len(request.transcript.strip()) < 5:
        raise HTTPException(status_code=400, detail="Transcript structurally invalid")
        
    session_id = str(uuid.uuid4())
    
    filler_words = ["um", "uh", "like", "you know"]
    filler_count = sum(request.transcript.lower().count(w) for w in filler_words)
    
    heatmap = ["Communication"]
    if filler_count > 3:
        heatmap.append("Conciseness")
        
    session = InterviewSession(
        session_id=session_id,
        interview_type=request.interview_type,
        transcript=request.transcript,
        confidence_score=request.confidence_score,
        weakness_heatmap=heatmap,
        filler_count=filler_count,
        created_at=datetime.utcnow().isoformat() + "Z"
    )
    
    repo.save(session)
    
    activity_repo.append(ActivityEvent(
        event_id=str(uuid.uuid4()),
        event_type="interview_created",
        domain="interview",
        entity_id=session.session_id,
        timestamp=session.created_at,
        payload={"type": session.interview_type, "confidence": session.confidence_score}
    ))
    
    return session
