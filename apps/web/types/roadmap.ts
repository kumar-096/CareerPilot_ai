export type TaskCategory = 'dsa' | 'core' | 'interview' | 'project';

export interface Task {
  day: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  category: TaskCategory;
}

export interface HistoricalSprint {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'abandoned';
  progress: number;
}

export interface ExecutionStat {
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
}
