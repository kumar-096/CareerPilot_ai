
import logging
from fastapi import APIRouter, UploadFile, File, HTTPException
from packages.schemas.resume_schema import ATSScoreResponse
from services.resume.scoring_service import process_and_score_resume
from services.resume.extractor import PDFExtractionError, UnreadablePDFError
from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/upload", response_model=ATSScoreResponse)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid Content-Type. Must be application/pdf.")
        
    try:
        content = await file.read()
        
        # Payload size validation
        if len(content) > settings.MAX_UPLOAD_SIZE_BYTES:
            raise HTTPException(status_code=413, detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB.")
            
        response_model = await process_and_score_resume(content, file.filename)
        return response_model
        
    except UnreadablePDFError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except PDFExtractionError as e:
        logger.error(f"PDF extraction error: {e}")
        raise HTTPException(status_code=400, detail="Corrupted PDF or extraction failed.")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing resume: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while processing the resume.")
