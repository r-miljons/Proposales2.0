import { AUTH_KEY } from '../config/authKeyLocation';

export function deleteAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}