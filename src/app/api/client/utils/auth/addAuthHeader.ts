import { getAuth } from './getAuth';
import type { AuthData } from '@/types/auth';

/**
 * Returns an Authorization header object if authData is provided or a valid auth key is present in localStorage, otherwise returns an empty object.
 * Usage: { ...addAuthHeader(authData || undefined), ...otherHeaders }
 */
export function addAuthHeader(authData?: AuthData): Record<string, string> {
  const auth = authData || getAuth();
  if (auth?.key) {
    return { Authorization: `Bearer ${auth.key}` };
  }
  return {};
}
