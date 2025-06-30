import type {
  CreateContentRequest,
  CreateContentResponse,
  ContentListParams,
  ContentListResponse,
} from '@/types/content';
import { addAuthHeader } from '@/app/api/client/utils/auth/addAuthHeader';
import type { AuthData } from '@/types/auth';

/**
 * Fetch a list of content items from the library.
 * @param params - Optional query parameters for filtering content
 * @param authData - Optional authentication data
 * @returns The response from the list content API
 */
export async function listContent(params?: ContentListParams, authData?: AuthData): Promise<ContentListResponse> {
  const searchParams = params ? new URLSearchParams(params as any).toString() : '';
  const response = await fetch(`/api/content${searchParams ? `?${searchParams}` : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...addAuthHeader(authData),
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  // If the external API returns a .data property, use it; otherwise, return the whole result.
  return result.data ? (result as ContentListResponse) : { data: result } as ContentListResponse;
}

/**
 * Create a new content item in the library.
 * @param payload - The content data to create
 * @param authData - Optional authentication data
 * @returns The response from the create content API
 */
export async function createContent(payload: CreateContentRequest, authData?: AuthData): Promise<CreateContentResponse> {
  const response = await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...addAuthHeader(authData),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to create content: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  // If the external API returns a .data property, use it; otherwise, return the whole result.
  return result.data ? (result as CreateContentResponse) : { data: result } as CreateContentResponse;
}
