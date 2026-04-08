from pydantic import BaseModel
from typing import List

class TrustVerifyRequest(BaseModel):
    recruiter_email: str
    job_url: str
    salary_claim: str | None = None
    company_name: str | None = None

class TrustSnapshot(BaseModel):
    trust_score: int
    risk_level: str
    recruiter_email: str
    job_url: str
    suspicious_flags: List[str]
    salary_anomaly: bool
    checked_at: str
