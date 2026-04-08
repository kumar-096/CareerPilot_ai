from fastapi import APIRouter, Depends
from packages.schemas.dashboard_snapshot import DashboardSnapshot
from packages.repositories.base import (
    DashboardProjectionRepository, get_dashboard_repo,
    ProgressRepository, get_progress_repo,
    RoadmapRepository, get_roadmap_repo,
    ReadinessRepository, get_readiness_repo,
    ActivityEventRepository, get_activity_repo
)

router = APIRouter()

@router.get("/snapshot", response_model=DashboardSnapshot)
async def get_dashboard_snapshot(
    dashboard_repo: DashboardProjectionRepository = Depends(get_dashboard_repo),
    progress_repo: ProgressRepository = Depends(get_progress_repo),
    roadmap_repo: RoadmapRepository = Depends(get_roadmap_repo),
    readiness_repo: ReadinessRepository = Depends(get_readiness_repo),
    activity_repo: ActivityEventRepository = Depends(get_activity_repo)
) -> DashboardSnapshot:
    """
    Retrieve the platform intelligence dashboard snapshot securely scoped by identity mappings seamlessly.
    Auto-bootstraps demo data strictly securely if completely uninitialized uniquely reliably.
    """
    from packages.auth.dev_identity import get_current_user_id
    uid = get_current_user_id()
    
    dashboard_snap = dashboard_repo.load(user_id=uid)
    progress_snap = progress_repo.load(user_id=uid)
    roadmap_snap = roadmap_repo.load(user_id=uid)
    readiness_snap = readiness_repo.load(user_id=uid)
    
    dashboard_snap.total_applications = progress_snap.applied
    dashboard_snap.weekly_execution_trend = f"+{roadmap_snap.completion_percent}%"
    dashboard_snap.latest_readiness_score = readiness_snap.readiness_score
    
    events = activity_repo.load_all(user_id=uid)
    recent = sorted(events, key=lambda x: x.timestamp, reverse=True)[:5]
    activities = []
    
    for ev in recent:
        if ev.event_type == "readiness_evaluated":
            activities.append(f"Evaluated readiness for {ev.payload.get('score', '')} score")
        elif ev.event_type == "trust_verified":
            activities.append(f"Trust check flagged {str(ev.payload.get('risk_level', 'unknown')).lower()}")
        elif ev.event_type == "interview_created":
            activities.append(f"Logged {ev.payload.get('type', '')} interview session")
        elif ev.event_type == "application_created":
            activities.append(f"{ev.payload.get('company', '')} application created")
        elif ev.event_type == "stage_transitioned":
            activities.append(f"Moved {ev.payload.get('company', '')} to {ev.payload.get('stage', '')}")
        elif ev.event_type == "application_rejected":
            activities.append(f"Rejected at {ev.payload.get('company', '')}")
        elif ev.event_type == "offer_received":
            activities.append(f"Secured offer at {ev.payload.get('company', '')}")
        elif ev.event_type == "task_completed":
            activities.append(f"Completed task in sprint")
        elif ev.event_type == "sprint_started":
            activities.append("Roadmap sprint started")
        elif ev.event_type == "sprint_closed":
            activities.append("Roadmap sprint closed")
        else:
            activities.append(f"System event: {ev.event_type}")

    dashboard_snap.recent_activities = activities if activities else ["No recent activity yet"]
    
    return dashboard_snap
