import io
import pypdf

class PDFExtractionError(Exception):
    """Raised when PDF extraction fails (corrupted or unreadable)."""
    pass

class UnreadablePDFError(Exception):
    """Raised when PDF text is too sparse or image-based."""
    pass

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extracts text from PDF bytes securely using pypdf."""
    try:
        pdf_file = io.BytesIO(file_content)
        reader = pypdf.PdfReader(pdf_file)
        
        num_pages = len(reader.pages)
        max_pages = min(num_pages, 5)  # Cap arbitrarily at 5 pages
        
        text_content = []
        for i in range(max_pages):
            page_text = reader.pages[i].extract_text()
            if page_text:
                text_content.append(page_text)
                
        full_text = " ".join(text_content).strip()
        words = full_text.split()
        
        # Simple heuristic to determine if text extraction failed or is an image-based PDF
        if len(words) < 50:
            raise UnreadablePDFError("Document is unreadable or too short. Please upload a standard text-based PDF.")
            
        return full_text
        
    except UnreadablePDFError:
        raise
    except Exception:
        raise PDFExtractionError("Failed to extract text from PDF. The file may be corrupted.")
