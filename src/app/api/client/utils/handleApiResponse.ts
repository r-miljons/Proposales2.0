import { ApiResponse } from '@/types/api';

/**
 * Handles and validates the standard API response format.
 * Throws if the response is not ok or does not match expected format.
 */
export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const json = await response.json();
  // Basic shape validation (can extend with zod/yup if needed)
  if (
    typeof json.success !== 'boolean' ||
    !('data' in json) ||
    typeof json.message !== 'string' ||
    !('error' in json)
  ) {
    throw new Error('Invalid API response format');
  }
  return json as ApiResponse<T>;
}
