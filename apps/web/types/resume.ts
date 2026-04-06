export interface ATSBreakdown {
  formatting: number;
  keywords: number;
  impact_metrics: number;
  length: number;
}

export interface ATSResponse {
  score: number;
  status: string;
  breakdown: ATSBreakdown;
  issues: string[];
}
