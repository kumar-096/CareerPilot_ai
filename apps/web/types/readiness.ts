export interface ReadinessRequest {
  cgpa: number;
  dsa_count: number;
  skills: string[];
  target_role: string;
  target_company: string;
}

export interface ReadinessResponse {
  readiness_score: number;
  level: 'high' | 'medium' | 'low';
  missing_skills: string[];
  weak_zones: string[];
  roadmap: string[];
}
