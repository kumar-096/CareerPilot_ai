export interface TrustRequest {
  email: string;
  job_url: string;
  salary_claim: string;
  company_name: string;
}

export type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical';

export interface RiskFlag {
  id: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  category: string;
}

export interface TrustInsight {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface TrustResponse {
  score: number;
  verdict: RiskLevel;
  scam_probability: number;
  flags: RiskFlag[];
  insights: TrustInsight[];
}
