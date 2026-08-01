import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import SocialMediaGenerator from '../pages/SocialMediaGenerator';
import AdvertisementGenerator from '../pages/AdvertisementGenerator';
import EmailGenerator from '../pages/EmailGenerator';
import HistoryPage from '../pages/History';
import ProfilePage from '../pages/Profile';
import LoginPage from '../pages/LoginPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-white/50 font-medium tracking-wider">Verifying Session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes - require login first */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/social-generator" element={<ProtectedRoute><SocialMediaGenerator /></ProtectedRoute>} />
      <Route path="/advertisement-generator" element={<ProtectedRoute><AdvertisementGenerator /></ProtectedRoute>} />
      <Route path="/email-generator" element={<ProtectedRoute><EmailGenerator /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* Catch all redirecting to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
