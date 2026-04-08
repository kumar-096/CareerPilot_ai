import { DashboardSnapshot } from '../../types/dashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/snapshot`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard intelligence snapshot');
  }
  
  return await response.json();
}
