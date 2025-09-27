// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setToken as setApiToken } from '../services/api';

type AuthCtx = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (t: string | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  token: null,
  isAuthenticated: false,
  setToken: () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  
  useEffect(() => {
    setApiToken(token);
  }, [token]);

  const logout = async () => {
    try {
      
      await api.post('/logout'); 
    } catch (_) {
      // ignoramos errores de red aquí
    } finally {
      setToken(null);
    }
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      setToken,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
