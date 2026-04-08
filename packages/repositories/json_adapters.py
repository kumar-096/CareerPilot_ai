from packages.repositories.base import (
    ReadinessRepository, TrustRepository, InterviewRepository,
    ProgressRepository, RoadmapRepository, ActivityEventRepository,
    DashboardProjectionRepository
)
from services.readiness import readiness_store
from services.trust import trust_store
from services.interview import interview_store
from services.analytics import progress_store, roadmap_store, activity_event_store, snapshot_store
from packages.schemas.readiness_snapshot import ReadinessSnapshot
from packages.schemas.trust_snapshot import TrustSnapshot
from packages.schemas.progress_snapshot import ProgressSnapshot
from packages.schemas.roadmap_snapshot import RoadmapSnapshot
from packages.schemas.dashboard_snapshot import DashboardSnapshot
from packages.auth.dev_identity import get_current_user_id
from typing import Optional

class JSONReadinessRepository(ReadinessRepository):
    def load(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": return ReadinessSnapshot(readiness_score=0, level="Beginner", target_role="None", missing_skills=[], weak_zones=[], updated_at="")
        return readiness_store.load_readiness_snapshot()
    def save(self, snapshot, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return readiness_store.save_readiness_snapshot(snapshot)

class JSONTrustRepository(TrustRepository):
    def load(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": return TrustSnapshot(trust_score=100, risk_level="Low Risk", recruiter_email="none", job_url="none", suspicious_flags=[], salary_anomaly=False, checked_at="")
        return trust_store.load_trust_snapshot()
    def save(self, snapshot, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return trust_store.save_trust_snapshot(snapshot)

class JSONInterviewRepository(InterviewRepository):
    def load_all(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": return []
        return interview_store.load_interview_sessions()
    def save(self, session, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return interview_store.save_interview_session(session)

class JSONProgressRepository(ProgressRepository):
    def load(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": return ProgressSnapshot(applied=0, oa_cleared=0, interviews=0, offers=0, companies=[])
        return progress_store.load_progress_snapshot()
    def save(self, snapshot, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return progress_store.save_progress_snapshot(snapshot)

class JSONRoadmapRepository(RoadmapRepository):
    def load(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": return RoadmapSnapshot(current_day=1, total_days=30, completion_percent=0, streak_days=0, active_focus="")
        return roadmap_store.load_roadmap_snapshot()
    def save(self, snapshot, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return roadmap_store.save_roadmap_snapshot(snapshot)
    def handle_sprint_start(self, sprint_name, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return roadmap_store.handle_sprint_start(sprint_name)
    def handle_sprint_close(self, sprint_name, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return roadmap_store.handle_sprint_close(sprint_name)
    def handle_task_complete(self, task_id, sprint_name, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return roadmap_store.handle_task_complete(task_id, sprint_name)

class JSONActivityEventRepository(ActivityEventRepository):
    def load_all(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": return []
        return activity_event_store.load_activity_events()
    def append(self, event, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid == "dev-user-001": return activity_event_store.append_activity_event(event)

class JSONDashboardProjectionRepository(DashboardProjectionRepository):
    def load(self, user_id: Optional[str] = None): 
        uid = user_id or get_current_user_id()
        if uid != "dev-user-001": 
            return DashboardSnapshot(total_applications=0, active_interviews=0, upcoming_deadlines=0, offers_received=0, weekly_execution_trend="+0%", latest_readiness_score=0, recent_activities=["No recent activity yet"])
        return snapshot_store.load_snapshot()
