import { ProgressSnapshot } from '../../types/progress';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function getProgressSnapshot(): Promise<ProgressSnapshot> {
  const response = await fetch(`${API_BASE_URL}/api/v1/progress/snapshot`);
  
  if (!response.ok) {
    throw new Error('Failed to load tracking data from API');
  }
  
  return await response.json();
}
