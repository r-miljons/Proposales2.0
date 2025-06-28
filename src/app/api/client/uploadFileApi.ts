import type { UploadcareDirectUploadResponse } from '@/types/uploadcare';

/**
 * Upload a file to Uploadcare via our Next.js API route.
 * @param formData - FormData containing the file and any uploadcare parameters.
 * @returns UploadcareDirectUploadResponse
 */
export async function uploadFile(formData: FormData): Promise<UploadcareDirectUploadResponse> {
  const response = await fetch('/api/uploadcare', {
    method: 'POST',
    // No headers needed; browser will set Content-Type for FormData automatically

    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  // If the API returns a .data property, use it; otherwise, return the whole result.
  return result.data ? (result.data as UploadcareDirectUploadResponse) : (result as UploadcareDirectUploadResponse);
}
