from typing import List, Dict, Any

REQUIRED_SDE_SKILLS = ["dsa", "oops", "dbms", "os", "system design"]

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
    
    if target_role.lower() == "sde":
        for skill in REQUIRED_SDE_SKILLS:
            if skill not in user_skills_lower:
                missing_skills.append(skill)
                
        if missing_skills:
            points_per_skill = 30 / len(REQUIRED_SDE_SKILLS)
            skills_score = 30 - (len(missing_skills) * points_per_skill)
            score += skills_score
            weak_zones.append("Missing Core Skills")
        else:
            score += 30
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
