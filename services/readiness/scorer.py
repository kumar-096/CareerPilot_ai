from typing import List, Dict, Any

ROLE_SKILLS_MAP = {
    "sde": ["dsa", "oops", "dbms", "os", "system design"],
    "frontend": ["html", "css", "javascript", "react", "frontend system design", "performance optimization"],
    "backend": ["dsa", "dbms", "system design", "api design", "microservices"],
    "aiml": ["machine learning", "deep learning", "python", "statistics", "data structues"]
}

def calculate_readiness(cgpa: float, dsa_count: int, skills: List[str], target_role: str) -> Dict[str, Any]:
    score = 0
    missing_skills = []
    weak_zones = []

    # 1) CGPA contribution (Max 30)
    if cgpa >= 8.5:
        score += 30
    elif cgpa >= 7.5:
        score += 20
    else:
        score += 10
        weak_zones.append("Low CGPA")

    # 2) DSA contribution (Max 40)
    if dsa_count >= 300:
        score += 40
    elif dsa_count >= 150:
        score += 25
    else:
        score += 10
        weak_zones.append("Low DSA")

    # 3) Skills contribution (Max 30)
    user_skills_lower = [s.lower().strip() for s in skills]
    
    # Normalize target role
    role_key = target_role.lower()
    if "front" in role_key:
        role_key = "frontend"
    elif "back" in role_key:
        role_key = "backend"
    elif "ai" in role_key or "ml" in role_key or "machine" in role_key or "data" in role_key:
        role_key = "aiml"
    else:
        role_key = "sde"

    required_skills = ROLE_SKILLS_MAP.get(role_key, ROLE_SKILLS_MAP["sde"])
    
    for skill in required_skills:
        # Exact match or substring matching to be extremely lenient
        if not any(skill in s for s in user_skills_lower) and not any(s in skill for s in user_skills_lower if len(s)>2):
            missing_skills.append(skill)
            
    if missing_skills:
        points_per_skill = 30 / len(required_skills)
        skills_score = max(0, 30 - (len(missing_skills) * points_per_skill))
        score += skills_score
        weak_zones.append(f"Missing {role_key.upper()} Core Skills")
    else:
        score += 30
        
    score = int(max(0, min(100, score)))
    
    # Calculate Level
    if score >= 80:
        level = "high"
    elif score >= 50:
        level = "medium"
    else:
        level = "low"
        
    return {
        "readiness_score": score,
        "level": level,
        "missing_skills": missing_skills,
        "weak_zones": weak_zones
    }
