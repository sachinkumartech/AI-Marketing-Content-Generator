import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import SocialMediaGenerator from '../pages/SocialMediaGenerator';
import AdvertisementGenerator from '../pages/AdvertisementGenerator';
import EmailGenerator from '../pages/EmailGenerator';
import HistoryPage from '../pages/History';
import ProfilePage from '../pages/Profile';
import LoginPage from '../pages/LoginPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/social-generator" element={<SocialMediaGenerator />} />
      <Route path="/advertisement-generator" element={<AdvertisementGenerator />} />
      <Route path="/email-generator" element={<EmailGenerator />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* Catch all redirecting to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
