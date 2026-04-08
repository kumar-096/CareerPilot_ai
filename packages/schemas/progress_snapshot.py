from pydantic import BaseModel
from typing import List, Literal, Optional

class CompanyApplication(BaseModel):
    id: str
    company: str
    role: str
    current_stage: Literal['Applied', 'OA', 'Interview', 'Offer', 'Rejected']
    last_updated: str
    result: Optional[Literal['Pending', 'Passed', 'Failed', 'Secured']] = None

class ProgressSnapshot(BaseModel):
    applied: int
    oa_cleared: int
    interviews: int
    offers: int
    companies: List[CompanyApplication]
