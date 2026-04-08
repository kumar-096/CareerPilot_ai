import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import resume
from app.core.config import settings
from app.api.routers import dashboard

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    resume.router,
    prefix=f"{settings.API_V1_STR}/resume",
    tags=["resume"]
)

from app.api.routers import readiness as readiness_router_new

app.include_router(
    readiness_router_new.router,
    prefix=f"{settings.API_V1_STR}/readiness",
    tags=["readiness"]
)

app.include_router(
    dashboard.router,
    prefix=f"{settings.API_V1_STR}/dashboard",
    tags=["dashboard"]
)

from app.api.routers import progress
app.include_router(
    progress.router,
    prefix=f"{settings.API_V1_STR}/progress",
    tags=["progress"]
)

from app.api.routers import roadmaps
app.include_router(
    roadmaps.router,
    prefix=f"{settings.API_V1_STR}/roadmaps",
    tags=["roadmaps"]
)

@app.get("/health")
def health_check():
    return {"status": "ok"}