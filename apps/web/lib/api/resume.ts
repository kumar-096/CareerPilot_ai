import { ATSResponse } from '../../types/resume';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function uploadResume(file: File): Promise<ATSResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/v1/resume/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = 'Upload failed. Please try again.';
    try {
      const data = await response.json();
      if (data.detail) errorDetail = data.detail;
      else if (data.message) errorDetail = data.message;
    } catch (_) {}
    throw new Error(errorDetail);
  }

  return await response.json();
}
