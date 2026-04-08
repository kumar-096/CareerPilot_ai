export type ApplicationStage = 'Applied' | 'OA' | 'Interview' | 'Offer' | 'Rejected';

export interface CompanyApplication {
  id: string;
  company: string;
  role: string;
  current_stage: ApplicationStage;
  last_updated: string;
  result?: 'Pending' | 'Passed' | 'Failed' | 'Secured';
}

export interface FunnelStats {
  applied: number;
  oaCleared: number;
  interviews: number;
  offers: number;
}

export interface ProgressInsight {
  title: string;
  value: string;
  trend?: string;
  description: string;
  type: 'success' | 'warning' | 'info';
}

export interface ProgressSnapshot {
  applied: number;
  oa_cleared: number;
  interviews: number;
  offers: number;
  companies: CompanyApplication[];
}
