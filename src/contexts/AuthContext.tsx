import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: number;
  organization_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'driver' | 'supplier';
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyOtp: (contact: string, otp: string) => Promise<boolean>;
  refreshToken: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthState({
          user: {
            id: data.user_id,
            organization_id: data.organization_id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: 'admin', // Mock role
            is_active: true,
            created_at: new Date().toISOString(),
          },
          token: data.session_token,
          isLoading: false,
          isAuthenticated: true,
        });

        // Store token in localStorage
        localStorage.setItem('token', data.session_token);
        
        return true;
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const verifyOtp = async (contact: string, otp: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ contact, otp }),
      });

      const data = await response.json();

      if (data.success) {
        // Update user info after OTP verification
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          isLoading: false,
        }));
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      // Clear local storage
      localStorage.removeItem('token');

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshToken = async (): Promise<void> => {
    // Mock token refresh
    const newToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('token', refreshToken);
    setAuthState(prev => ({
      ...prev,
      token: refreshToken,
    }));
  };

  const value = {
    ...authState,
    login,
    logout,
    verifyOtp,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
