import json
import os
from typing import List
from packages.schemas.interview_session import InterviewSession

STORE_DIR = os.path.join(os.path.dirname(__file__), '../../data')
STORE_PATH = os.path.join(STORE_DIR, 'interview_sessions.json')

def _ensure_dir():
    os.makedirs(STORE_DIR, exist_ok=True)

def load_interview_sessions() -> List[InterviewSession]:
    if not os.path.exists(STORE_PATH):
        return []
    
    try:
        with open(STORE_PATH, 'r') as f:
            data = json.load(f)
            return [InterviewSession(**item) for item in data]
    except Exception:
        return []

def save_interview_session(session: InterviewSession) -> None:
    _ensure_dir()
    sessions = load_interview_sessions()
    sessions.append(session)
    
    with open(STORE_PATH, 'w') as f:
        data = [getattr(s, "model_dump", s.dict)() for s in sessions]
        json.dump(data, f, indent=2)
