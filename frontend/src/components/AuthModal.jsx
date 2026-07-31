import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, signup } = useAuth();
  const showToast = useToast();

  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Password Policy Checks for Registration
  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        showToast('Logged in successfully!', 'success');
        onClose();
      } else {
        if (!isPasswordValid) {
          setErrorMessage('Password does not meet the security requirements.');
          setLoading(false);
          return;
        }
        await signup(fullName, email, password);
        showToast('Account created & logged in successfully!', 'success');
        onClose();
      }
    } catch (err) {
      console.error("Authentication failed:", err);
      const detail = err?.response?.data?.detail || 'Authentication failed. Please check your credentials.';
      setErrorMessage(typeof detail === 'string' ? detail : 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md overflow-hidden glass-panel rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-dark-bg/90 p-6 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-neon-purple to-neon-blue p-[1px] mb-3">
              <div className="w-full h-full bg-dark-bg rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-neon-blue" />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm text-white/60 mt-1">
              {mode === 'login'
                ? 'Sign in to access your AI marketing dashboard'
                : 'Sign up to generate high-converting SaaS campaigns'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error display */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password security checklist for registration */}
            {mode === 'register' && password.length > 0 && (
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1.5 text-xs text-white/60">
                <div className="font-semibold text-white/80 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neon-blue" />
                  Password Requirements:
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className={passwordChecks.length ? 'text-neon-cyan font-medium' : ''}>
                    • 8+ Characters
                  </span>
                  <span className={passwordChecks.upper ? 'text-neon-cyan font-medium' : ''}>
                    • 1 Uppercase (A-Z)
                  </span>
                  <span className={passwordChecks.lower ? 'text-neon-cyan font-medium' : ''}>
                    • 1 Lowercase (a-z)
                  </span>
                  <span className={passwordChecks.number ? 'text-neon-cyan font-medium' : ''}>
                    • 1 Number (0-9)
                  </span>
                  <span className={`col-span-2 ${passwordChecks.special ? 'text-neon-cyan font-medium' : ''}`}>
                    • 1 Special Character (!@#$%^&*)
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan text-white font-bold text-sm rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : mode === 'login' ? (
                'Sign In to Dashboard'
              ) : (
                'Create Secure Account'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
