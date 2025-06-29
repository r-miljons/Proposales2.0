import { AUTH_KEY } from '../config/keyLocations';
import type { AuthData } from '@/types/auth';

export function saveAuth(auth: AuthData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }
}