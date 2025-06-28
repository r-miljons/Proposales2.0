import { getAuth } from './getAuth';

/**
 * Returns an Authorization header object if a valid auth key is present in localStorage, otherwise returns an empty object.
 * Usage: { ...addAuthHeader(), ...otherHeaders }
 */
export function addAuthHeader(): Record<string, string> {
  const auth = getAuth();
  if (auth?.key) {
    return { Authorization: `Bearer ${auth.key}` };
  }
  return {};
}
