import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: () => false,
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setUser(username);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setUser(null);
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}