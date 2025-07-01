import { useContext } from 'react';
import { AuthContext, AuthStateContext } from '@/components/providers/AuthProvider';

/**
 * useAuth - React hook to access authentication state and updater
 *
 * @returns {AuthStateContext} { state, setState }
 * @throws Error if used outside of AuthProvider
 */
export function useAuth(): AuthStateContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
