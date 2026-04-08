from typing import List, Any, Optional
from packages.repositories.base import (
    ReadinessRepository, TrustRepository, InterviewRepository,
    ProgressRepository, RoadmapRepository, ActivityEventRepository,
    DashboardProjectionRepository
)
from packages.db.supabase_client import get_supabase_client
from packages.schemas.readiness_snapshot import ReadinessSnapshot
from packages.schemas.trust_snapshot import TrustSnapshot
from packages.schemas.interview_session import InterviewSession
from packages.schemas.progress_snapshot import ProgressSnapshot
from packages.schemas.roadmap_snapshot import RoadmapSnapshot
from packages.schemas.activity_event import ActivityEvent
from packages.schemas.dashboard_snapshot import DashboardSnapshot
from packages.auth.dev_identity import get_current_user_id

class PostgresReadinessRepository(ReadinessRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        response = self.client.table('readiness_snapshots').select('*').eq('user_id', uid).order('id', desc=True).limit(1).execute()
        if not response.data:
            if uid == "dev-user-001":
                from services.readiness.readiness_store import load_readiness_snapshot
                return load_readiness_snapshot()
            return ReadinessSnapshot(readiness_score=0, level="Beginner", target_role="None", missing_skills=[], weak_zones=[], updated_at="")
        return ReadinessSnapshot(**response.data[0]['snapshot'])
        
    def save(self, snapshot, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        self.client.table('readiness_snapshots').insert({"user_id": uid, "snapshot": data}).execute()
        
class PostgresTrustRepository(TrustRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        response = self.client.table('trust_snapshots').select('*').eq('user_id', uid).order('id', desc=True).limit(1).execute()
        if not response.data:
            if uid == "dev-user-001":
                from services.trust.trust_store import load_trust_snapshot
                return load_trust_snapshot()
            return TrustSnapshot(trust_score=100, risk_level="Low Risk", recruiter_email="none", job_url="none", suspicious_flags=[], salary_anomaly=False, checked_at="")
        return TrustSnapshot(**response.data[0]['snapshot'])
        
    def save(self, snapshot, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        self.client.table('trust_snapshots').insert({"user_id": uid, "snapshot": data}).execute()

class PostgresInterviewRepository(InterviewRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load_all(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        response = self.client.table('interview_sessions').select('*').eq('user_id', uid).order('created_at', desc=True).execute()
        return [InterviewSession(**row['snapshot']) for row in response.data]
        
    def save(self, session, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        data = getattr(session, "model_dump", session.dict)()
        self.client.table('interview_sessions').insert({
            "session_id": session.session_id,
            "user_id": uid,
            "snapshot": data
        }).execute()
        
class PostgresProgressRepository(ProgressRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        response = self.client.table('progress_snapshots').select('*').eq('user_id', uid).order('id', desc=True).limit(1).execute()
        if not response.data:
            if uid == "dev-user-001":
                from services.analytics.progress_store import load_progress_snapshot
                return load_progress_snapshot()
            return ProgressSnapshot(applied=0, oa_cleared=0, interviews=0, offers=0, companies=[])
        return ProgressSnapshot(**response.data[0]['snapshot'])
        
    def save(self, snapshot, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        self.client.table('progress_snapshots').insert({"user_id": uid, "snapshot": data}).execute()

class PostgresActivityEventRepository(ActivityEventRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load_all(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        response = self.client.table('activity_events').select('*').eq('user_id', uid).order('id', desc=False).execute()
        return [ActivityEvent(**row['snapshot']) for row in response.data]
        
    def append(self, event, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        data = getattr(event, "model_dump", event.dict)()
        self.client.table('activity_events').insert({
            "event_id": event.event_id,
            "user_id": uid,
            "snapshot": data
        }).execute()

class PostgresRoadmapRepository(RoadmapRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        response = self.client.table('roadmap_snapshots').select('*').eq('user_id', uid).order('id', desc=True).limit(1).execute()
        if not response.data:
            if uid == "dev-user-001":
                from services.analytics.roadmap_store import load_roadmap_snapshot
                return load_roadmap_snapshot()
            return RoadmapSnapshot(current_day=1, total_days=30, completion_percent=0, streak_days=0, active_focus="")
        return RoadmapSnapshot(**response.data[0]['snapshot'])
        
    def save(self, snapshot, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        data = getattr(snapshot, "model_dump", snapshot.dict)()
        self.client.table('roadmap_snapshots').insert({"user_id": uid, "snapshot": data}).execute()
        
    def handle_sprint_start(self, sprint_name: str, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001":
            from services.analytics.roadmap_store import handle_sprint_start
            return handle_sprint_start(sprint_name)
        
    def handle_sprint_close(self, sprint_name: str, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001":
            from services.analytics.roadmap_store import handle_sprint_close
            return handle_sprint_close(sprint_name)
        
    def handle_task_complete(self, task_id: str, sprint_name: str, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001":
            from services.analytics.roadmap_store import handle_task_complete
            return handle_task_complete(task_id, sprint_name)

class PostgresDashboardProjectionRepository(DashboardProjectionRepository):
    def __init__(self):
        self.client = get_supabase_client()
        
    def load(self, user_id: Optional[str] = None):
        uid = user_id or get_current_user_id()

        # dev-user-001 → existing behavior
        if uid == "dev-user-001":
            from services.analytics.snapshot_store import load_snapshot
            return load_snapshot()

        # new users → safe default
        from packages.schemas.dashboard_snapshot import DashboardSnapshot

        return DashboardSnapshot(
            latest_ats_score=0,
            latest_readiness_score=0,
            weekly_execution_trend="+0%",
            total_applications=0,
            recent_activities=["No recent activity yet"]
        )