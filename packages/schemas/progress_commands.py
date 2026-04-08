from pydantic import BaseModel
from typing import Optional, Literal

class ApplicationCreateCommand(BaseModel):
    company_name: str
    role: str
    updated_at: Optional[str] = None

class StageTransitionCommand(BaseModel):
    company_name: str
    role: str
    stage: Literal['Applied', 'OA', 'Interview', 'Offer', 'Rejected']
    updated_at: Optional[str] = None

class RejectionCommand(BaseModel):
    company_name: str
    role: str
    updated_at: Optional[str] = None

class OfferCommand(BaseModel):
    company_name: str
    role: str
    updated_at: Optional[str] = None
