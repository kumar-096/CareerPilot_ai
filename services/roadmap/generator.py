from typing import List

def generate_roadmap(weak_zones: List[str], target_role: str) -> List[str]:
    """Generates a deterministic practical 7-day roadmap derived from weak zones."""
    
    tasks = []
    
    is_cgpa = any("CGPA" in zone for zone in weak_zones)
    is_dsa = any("DSA" in zone for zone in weak_zones)
    is_skills = any("Missing" in zone for zone in weak_zones)
    
    # Pool potential practical tasks based on weaknesses, slicing accurately down exactly to 7
    pool = []
    
    if is_cgpa:
        pool.extend([
            "Build an open-source contribution to offset low CGPA",
            "Complete a complex hands-on project to showcase practical ability"
        ])
        
    if is_dsa:
        pool.extend([
            "Solve 10 top frequency Array & String interview questions",
            "Master Tree and Graph traversals via timed mock tests",
            "Practice Dynamic Programming memoization patterns"
        ])
        
    if is_skills:
        pool.extend([
            f"Crash course on identified missing {target_role} tech stack",
            f"Build a mini-application utilizing your missing {target_role} skills",
            f"Review standard {target_role} architecture and system design"
        ])
        
    general = [
        "Record yourself answering common behavioral questions (STAR method)",
        "Schedule a mock interview with an industry peer",
        "Refine resume bullets to focus on quantifiable impact",
        f"Deep dive into advanced {target_role} system scaling",
        "Solve 3 hard-level problems on LeetCode",
        "Review core CS fundamentals (OS, DBMS, Networks)",
        "Prepare questions to ask the interviewer"
    ]
    
    for task in pool:
        if task not in tasks and len(tasks) < 7:
            tasks.append(task)
            
    for task in general:
        if len(tasks) < 7:
            tasks.append(task)
            
    # Format them cleanly
    roadmap = [f"Day {i+1}: {tasks[i]}" for i in range(7)]
        
    return roadmap
