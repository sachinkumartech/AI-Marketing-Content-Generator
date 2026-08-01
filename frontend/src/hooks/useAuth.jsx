import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session via HttpOnly cookie on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await authAPI.getMe();
        setUser(userData);
      } catch (error) {
        console.error("Token verification failed, clearing session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      await authAPI.login(email, password);
      
      // Fetch full user profile
      const userData = await authAPI.getMe();
      setUser(userData);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const signup = async (fullName, email, password) => {
    await authAPI.register(fullName, email, password);
    // Auto-login upon successful registration
    return await login(email, password);
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
