import sys
import os

# Add repo root for shared packages/services imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import resume
from app.core.config import settings
from apps.api.routers.readiness import router as readiness_router
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
app.include_router(
    readiness_router,
    prefix="/readiness",
    tags=["Readiness"]
)
@app.get("/health")
def health_check():
    return {"status": "ok"}