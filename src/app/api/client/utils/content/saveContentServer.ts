import { createContent } from '@/app/api/client/contentApi';
import type { CreateContentRequest, CreateContentResponse } from '@/types/content';
import type { AuthData } from '@/types/auth';

/**
 * Server utility to create content via contentApi.
 * @param payload - The content data to create
 * @param authData - Optional authentication data
 * @returns The response from the create content API
 */
export async function saveContentServer(
  payload: CreateContentRequest,
  authData?: AuthData
): Promise<CreateContentResponse> {
  return createContent(payload, authData);
}
