import logging
from services.resume.extractor import extract_text_from_pdf
from packages.scoring.calculator import calculate_ats_score
from packages.schemas.resume_schema import ATSScoreResponse, ATSScoreBreakdown

logger = logging.getLogger(__name__)

async def process_and_score_resume(file_content: bytes, filename: str) -> ATSScoreResponse:
    """Orchestrates PDF text extraction and ATS scoring."""
    # 1. Extract text from PDF
    text = extract_text_from_pdf(file_content)
    
    # 2. Compute basic metrics over raw text
    word_count = len(text.split())
    
    # 3. Calculate score utilizing the scoring package
    result = calculate_ats_score(text, filename, word_count)
    
    # 4. Return formatted response model conforming to the resume schema
    return ATSScoreResponse(
        score=result["score"],
        status=result["status"],
        breakdown=ATSScoreBreakdown(**result["breakdown"]),
        issues=result["issues"]
    )
