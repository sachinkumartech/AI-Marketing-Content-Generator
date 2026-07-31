import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { motion } from 'framer-motion';
import { Sparkles, LayoutDashboard, User, LogIn, LogOut, UserCheck } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-6xl w-[92%] glass-panel rounded-full px-6 py-3 flex items-center justify-between border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-blue p-[1px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple to-neon-blue blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full bg-dark-bg rounded-[7px] flex items-center justify-center relative z-10">
              <Sparkles className="w-4 h-4 text-neon-blue group-hover:text-neon-cyan transition-colors" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-white/70 group-hover:from-neon-blue group-hover:to-neon-purple bg-clip-text text-transparent transition-all duration-300">
            AETHERA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/70 font-medium">
          <button
            onClick={() => handleScrollToSection('hero')}
            className="hover:text-neon-blue transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleScrollToSection('features')}
            className="hover:text-neon-blue transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleScrollToSection('story')}
            className="hover:text-neon-blue transition-colors cursor-pointer"
          >
            Scroll Story
          </button>
          <button
            onClick={() => showToast('Premium features active in current workspace.', 'success')}
            className="hover:text-neon-blue transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/80 hover:text-neon-blue transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-neon-blue/40 transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-purple/30 to-neon-blue/30 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-neon-blue group-hover:text-neon-cyan" />
                </div>
                <span className="text-xs font-semibold text-white/90 max-w-[100px] truncate">
                  {user?.full_name || user?.email?.split('@')[0] || 'Account'}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-full text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-4 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-neon-blue" />
                Sign In
              </button>
              <button
                onClick={() => handleOpenAuth('register')}
                className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Interactive Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
