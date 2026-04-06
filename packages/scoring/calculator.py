from typing import Dict, Any
from packages.scoring.ats_rules import (
    evaluate_length,
    evaluate_formatting,
    evaluate_impact_metrics,
    evaluate_keywords
)

def calculate_ats_score(text: str, filename: str, word_count: int) -> Dict[str, Any]:
    length_score, length_issues = evaluate_length(word_count)
    fmt_score, fmt_issues = evaluate_formatting(text, filename)
    metric_score, metric_issues = evaluate_impact_metrics(text)
    keyword_score, keyword_issues = evaluate_keywords(text)

    total_score = (
        length_score
        + fmt_score
        + metric_score
        + keyword_score
    )

    issues = (
        length_issues
        + fmt_issues
        + metric_issues
        + keyword_issues
    )

    return {
        "score": max(0, min(100, total_score)),
        "status": "success",
        "breakdown": {
            "formatting": fmt_score,
            "keywords": keyword_score,
            "impact_metrics": metric_score,
            "length": length_score
        },
        "issues": issues
    }