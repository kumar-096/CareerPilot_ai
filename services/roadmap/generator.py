from typing import List

def generate_roadmap(weak_zones: List[str], target_role: str) -> List[str]:
    """Generates a deterministic 7-day roadmap based on weak zones."""
    
    is_dsa_weak = "Low DSA" in weak_zones
    is_core_weak = "Missing Core Skills" in weak_zones
    
    if is_dsa_weak and is_core_weak:
        roadmap = [
            "Day 1 arrays revision",
            "Day 2 trees + graphs",
            "Day 3 DBMS + SQL",
            "Day 4 OS processes",
            "Day 5 OOPs design",
            "Day 6 mock interview",
            "Day 7 project revision"
        ]
    elif is_dsa_weak:
        roadmap = [
            "Day 1 Arrays & Strings",
            "Day 2 Linked Lists & Two Pointers",
            "Day 3 Trees & BST",
            "Day 4 Graphs & BFS/DFS",
            "Day 5 Dynamic Programming Basics",
            "Day 6 DSA Mock Interview",
            "Day 7 Speed coding practice"
        ]
    elif is_core_weak:
        roadmap = [
            "Day 1 DBMS Normalization & SQL Queries",
            "Day 2 OS Memory Management & Deadlocks",
            "Day 3 OOPs Principles",
            "Day 4 Computer Networks Basics",
            "Day 5 System Design fundamentals",
            "Day 6 CS Theory Mock Interview",
            "Day 7 Review theory notes"
        ]
    else:
        roadmap = [
            "Day 1 Advanced System Design",
            "Day 2 Hard DSA Problems",
            "Day 3 Behavioral Interview Prep",
            "Day 4 Deep Dive into Projects",
            "Day 5 Advanced Database scaling",
            "Day 6 Full Loop Mock Interview",
            "Day 7 Rest & Mental Prep"
        ]
        
    return roadmap
