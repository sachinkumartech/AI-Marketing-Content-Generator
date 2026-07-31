import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ai_marketing_token'));
  const [loading, setLoading] = useState(true);

  // Restore current logged-in user session on application mount
  useEffect(() => {
    async function loadUser() {
      const savedToken = localStorage.getItem('ai_marketing_token');
      if (savedToken) {
        try {
          const userData = await authAPI.getMe();
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          console.error("Token verification failed, clearing session:", error);
          localStorage.removeItem('ai_marketing_token');
          localStorage.removeItem('ai_marketing_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    if (data && data.access_token) {
      localStorage.setItem('ai_marketing_token', data.access_token);
      setToken(data.access_token);
      
      // Fetch full user profile
      try {
        const userData = await authAPI.getMe();
        setUser(userData);
        localStorage.setItem('ai_marketing_user', JSON.stringify(userData));
      } catch (err) {
        setUser({ email });
      }
      return true;
    }
    return false;
  };

  const signup = async (fullName, email, password) => {
    await authAPI.register(fullName, email, password);
    // Auto-login upon successful registration
    return await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('ai_marketing_token');
    localStorage.removeItem('ai_marketing_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
