import re
from typing import Tuple, List


def evaluate_length(word_count: int) -> Tuple[int, List[str]]:
    score = 20
    issues = []

    if word_count < 200:
        score = 5
        issues.append("Resume is too short.")
    elif word_count < 350:
        score = 15
        issues.append("Resume could use slightly more depth.")
    elif 350 <= word_count <= 900:
        score = 20
    elif word_count <= 1200:
        score = 15
        issues.append("Resume is slightly long.")
    else:
        score = 8
        issues.append("Resume is too long for ATS optimization.")

    return score, issues


def evaluate_formatting(text: str, filename: str) -> Tuple[int, List[str]]:
    score = 25
    issues = []
    text_lower = text.lower()

    # filename quality
    if filename.strip().lower() in ["resume.pdf", "cv.pdf", "myresume.pdf"]:
        score -= 5
        issues.append("File name is too generic. Consider using your name in the filename.")

    # standard ATS headers
    headers = ["experience", "education", "skills"]
    for header in headers:
        if header not in text_lower:
            score -= 4
            issues.append(f"Missing standard section header: {header.title()}.")

    # professional contact checks
    email = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)
    phone = re.search(r"\+?\d[\d\s\-]{8,}", text)

    # improved profile detection
    linkedin = any(keyword in text_lower for keyword in [
        "linkedin",
        "linkedin profile",
        "linkedin.com"
    ])

    github = any(keyword in text_lower for keyword in [
        "github",
        "[github]",
        "github.com"
    ])

    if not email:
        score -= 3
        issues.append("Missing professional email.")
    if not phone:
        score -= 3
        issues.append("Missing phone number.")
    if not linkedin:
        score -= 3
        issues.append("Missing LinkedIn profile.")
    if not github:
        score -= 2
        issues.append("Missing GitHub profile.")

    return max(0, score), issues

def evaluate_impact_metrics(text: str) -> Tuple[int, List[str]]:
    score = 20
    issues = []

    impact_patterns = re.findall(
        r"\b\d+%|\$\d+|\b\d+\+|\b\d+\s*(users|clients|requests|ms|%)",
        text.lower()
    )

    numbers_found = len(impact_patterns)

    if numbers_found < 2:
        score = 5
        issues.append("Missing strong quantifiable achievements.")
    elif numbers_found < 5:
        score = 12
        issues.append("Add more measurable achievements to strengthen impact.")
    elif numbers_found < 8:
        score = 17
        issues.append("Good metrics present, but could be stronger.")

    return score, issues


def evaluate_keywords(text: str) -> Tuple[int, List[str]]:
    score = 35
    issues = []
    text_lower = text.lower()

    action_verbs = [
        "led", "developed", "managed", "designed", "created",
        "implemented", "delivered", "built", "optimized",
        "orchestrated", "engineered", "deployed", "scaled"
    ]

    verbs_found = sum(1 for verb in action_verbs if verb in text_lower)

    if verbs_found < 3:
        score -= 15
        issues.append("Use more strong action verbs in project and experience bullets.")
    elif verbs_found < 6:
        score -= 8
        issues.append("Increase variety of action verbs for stronger ATS impact.")
    elif verbs_found < 8:
        score -= 3
        issues.append("Excellent verbs used, minor room for stronger variation.")

    return max(0, score), issues