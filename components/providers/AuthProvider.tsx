import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";

import type { AuthData } from "@/types/auth";
import { getAuth } from "@/app/api/client/utils/auth/getAuth";
import { saveAuth } from "@/app/api/client/utils/auth/saveAuth";
import { AUTH_KEY } from "@/app/api/client/config/keyLocations";
import isEqual from 'lodash.isequal';

// Define the shape of the state
export interface AuthState {
  auth: AuthData | null;
}

export interface AuthStateContext {
  state: AuthState;
  setState: Dispatch<SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthStateContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialAuth?: AuthData | null;
}

export const AuthProvider = ({ children, initialAuth = null }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(() => {
    const storedAuth = getAuth();
    return { auth: storedAuth ?? initialAuth };
  });

  // Sync state changes to localStorage
  useEffect(() => {
    if (state.auth) {
      saveAuth(state.auth);
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [state.auth]);

  // Listen for changes to the auth in localStorage (from this or other tabs)
  useEffect(() => {
    const handleStorageOrCustomEvent = (event: StorageEvent | Event) => {
      if (
        (event instanceof StorageEvent && event.key === AUTH_KEY) ||
        event.type === 'auth-localstorage-changed'
      ) {
        const storedAuth = getAuth();
        setState((prev) => {
          if (isEqual(prev.auth, storedAuth)) {
            return prev;
          }
          return { ...prev, auth: storedAuth };
        });
      }
    };
    window.addEventListener('storage', handleStorageOrCustomEvent);
    window.addEventListener('auth-localstorage-changed', handleStorageOrCustomEvent);
    return () => {
      window.removeEventListener('storage', handleStorageOrCustomEvent);
      window.removeEventListener('auth-localstorage-changed', handleStorageOrCustomEvent);
    };
  }, [initialAuth]);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
