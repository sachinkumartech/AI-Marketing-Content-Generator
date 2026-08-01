import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const { login, signup, user, isAuthenticated, loading: authLoading } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Password Policy Checks for Registration - requires only minimum 8 characters
  const isPasswordValid = password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        showToast('Logged in successfully!', 'success');
        navigate('/dashboard');
      } else {
        if (!isPasswordValid) {
          setErrorMessage('Password must be at least 8 characters long.');
          setLoading(false);
          return;
        }
        await signup(fullName, email, password);
        showToast('Account created & logged in successfully!', 'success');
        navigate('/dashboard');
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
    <div className="min-h-screen bg-dark-bg text-white flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-28 pb-16 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-dark-bg/80 backdrop-blur-xl"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-blue p-[1px] mb-4">
              <div className="w-full h-full bg-dark-bg rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-neon-blue" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-sm text-white/60 mt-1.5">
              {mode === 'login'
                ? 'Sign in to access your AI marketing dashboard'
                : 'Sign up for Aethera AI Marketing Content SaaS'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
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
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

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
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
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
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
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
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
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

            {mode === 'register' && password.length > 0 && (
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-white/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-neon-blue" />
                  <span>Password Requirement:</span>
                </div>
                <span className={password.length >= 8 ? 'text-neon-cyan font-bold' : 'text-amber-400 font-medium'}>
                  {password.length >= 8 ? '✓ 8+ Characters' : `${password.length} / 8 characters`}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan text-white font-bold text-sm rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all transform active:scale-[0.98] disabled:opacity-50"
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

          <div className="mt-4 text-center text-xs">
            {mode === 'login' ? (
              <span className="text-white/60">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className="text-neon-cyan font-bold hover:underline cursor-pointer"
                >
                  Sign Up Here
                </button>
              </span>
            ) : (
              <span className="text-white/60">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className="text-neon-blue font-bold hover:underline cursor-pointer"
                >
                  Sign In Here
                </button>
              </span>
            )}
          </div>

          <div className="mt-6 text-center text-xs text-white/50">
            Protected with AES-256 JWT & bcrypt encryption.
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
