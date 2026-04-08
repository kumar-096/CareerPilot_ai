export type InterviewType = 'HR / Behavioral' | 'Technical / Coding' | 'Project Deep Dive';

export interface InterviewRequest {
  type: InterviewType;
  transcript: string;
  confidence_rating: number; // 1-10
}

export interface MetricScore {
  label: string;
  score: number;
  max: number;
  category: 'delivery' | 'content' | 'structure';
}

export interface InterviewScores {
  communication: number;
  confidence: number;
  star_compliance: number;
  technical_depth: number;
}

export interface WeaknessArea {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
  impact_score: number; // 1-100
}

export interface FeedbackIdea {
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'suggestion' | 'positive';
}
