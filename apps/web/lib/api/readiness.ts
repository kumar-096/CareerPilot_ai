import { ReadinessRequest, ReadinessResponse } from '../../types/readiness';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function analyzeReadiness(payload: ReadinessRequest): Promise<ReadinessResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/readiness/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorDetail = 'Failed to analyze readiness. Please try again.';
    try {
      const data = await response.json();
      if (data.detail) {
        if (typeof data.detail === 'string') errorDetail = data.detail;
        else if (Array.isArray(data.detail)) errorDetail = data.detail.map((e:any) => e.msg).join(', ');
      } else if (data.message) {
        errorDetail = data.message;
      }
    } catch (_) {}
    throw new Error(errorDetail);
  }

  return response.json();
}
