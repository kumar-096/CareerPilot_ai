import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "CareerPilot AI API"
    API_V1_STR: str = "/api/v1"
    MAX_UPLOAD_SIZE_MB: int = 5
    MAX_UPLOAD_SIZE_BYTES: int = 5 * 1024 * 1024

settings = Settings()
