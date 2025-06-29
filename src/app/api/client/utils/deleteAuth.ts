import { AUTH_KEY } from '../config/keyLocations';

export function deleteAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}