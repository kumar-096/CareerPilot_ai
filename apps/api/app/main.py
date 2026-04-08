import sys
import os
from dotenv import load_dotenv

load_dotenv()

sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Routers
from app.api.routers import (
    resume,
    dashboard,
    progress,
    roadmaps,
    trust,
    interviews,
)
from app.api.routers import readiness as readiness_router_new

# Repository contracts
from packages.repositories.base import (
    get_readiness_repo,
    get_trust_repo,
    get_interview_repo,
    get_progress_repo,
    get_roadmap_repo,
    get_activity_repo,
    get_dashboard_repo,
)

# JSON adapters
from packages.repositories.json_adapters import (
    JSONReadinessRepository,
    JSONTrustRepository,
    JSONInterviewRepository,
    JSONProgressRepository,
    JSONRoadmapRepository,
    JSONActivityEventRepository,
    JSONDashboardProjectionRepository,
)

# PostgreSQL adapters
from packages.repositories.postgres_adapters import (
    PostgresReadinessRepository,
    PostgresTrustRepository,
    PostgresInterviewRepository,
    PostgresProgressRepository,
    PostgresRoadmapRepository,
    PostgresActivityEventRepository,
    PostgresDashboardProjectionRepository,
)

from packages.db.supabase_client import get_supabase_client


app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request
from packages.auth.supabase_identity import get_current_user_id

@app.middleware("http")
async def supabase_auth_middleware(request: Request, call_next):
    try:
        get_current_user_id(request)
    except Exception:
        pass
    return await call_next(request)

# -------------------------
# ROUTERS
# -------------------------
app.include_router(resume.router, prefix=f"{settings.API_V1_STR}/resume", tags=["resume"])
app.include_router(readiness_router_new.router, prefix=f"{settings.API_V1_STR}/readiness", tags=["readiness"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(progress.router, prefix=f"{settings.API_V1_STR}/progress", tags=["progress"])
app.include_router(roadmaps.router, prefix=f"{settings.API_V1_STR}/roadmaps", tags=["roadmaps"])
app.include_router(trust.router, prefix=f"{settings.API_V1_STR}/trust", tags=["trust"])
app.include_router(interviews.router, prefix=f"{settings.API_V1_STR}/interviews", tags=["interviews"])


# -------------------------
# PERSISTENCE MODE SWITCH
# -------------------------
persistence_mode = os.getenv("PERSISTENCE_BACKEND", "json")
print(f"[BOOT] Requested persistence backend: {persistence_mode}")

postgres_available = False

if persistence_mode == "postgres":
    client = get_supabase_client()
    if client is not None:
        postgres_available = True
        print("[BOOT] PostgreSQL adapter initialized successfully")
    else:
        print("[BOOT] WARNING: PostgreSQL unavailable → falling back to JSON")


# -------------------------
# DEPENDENCY OVERRIDES
# -------------------------
if postgres_available:
    app.dependency_overrides[get_readiness_repo] = PostgresReadinessRepository
    app.dependency_overrides[get_trust_repo] = PostgresTrustRepository
    app.dependency_overrides[get_interview_repo] = PostgresInterviewRepository
    app.dependency_overrides[get_progress_repo] = PostgresProgressRepository
    app.dependency_overrides[get_roadmap_repo] = PostgresRoadmapRepository
    app.dependency_overrides[get_activity_repo] = PostgresActivityEventRepository
    app.dependency_overrides[get_dashboard_repo] = PostgresDashboardProjectionRepository
    print("[BOOT] Active adapter = POSTGRES")
else:
    app.dependency_overrides[get_readiness_repo] = JSONReadinessRepository
    app.dependency_overrides[get_trust_repo] = JSONTrustRepository
    app.dependency_overrides[get_interview_repo] = JSONInterviewRepository
    app.dependency_overrides[get_progress_repo] = JSONProgressRepository
    app.dependency_overrides[get_roadmap_repo] = JSONRoadmapRepository
    app.dependency_overrides[get_activity_repo] = JSONActivityEventRepository
    app.dependency_overrides[get_dashboard_repo] = JSONDashboardProjectionRepository
    print("[BOOT] Active adapter = JSON")


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "backend": "postgres" if postgres_available else "json",
    }