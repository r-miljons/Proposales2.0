import { AUTH_KEY } from '../../config/keyLocations';
import type { AuthData } from '@/types/auth';

export function getAuth(): AuthData | null {

  if (typeof window === 'undefined') {
    return null;
  }
  const data = localStorage.getItem(AUTH_KEY);

  if (!data) {
    return null;
  }
  try {
    const parsed = JSON.parse(data);

    if (parsed && typeof parsed.key === 'string') {

      return parsed as AuthData;
    }

    return null;
  } catch (error) {

    return null;
  }
}
