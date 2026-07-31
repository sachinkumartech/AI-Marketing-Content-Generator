import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Key, ArrowLeft } from 'lucide-react';
import styles from '../styles/SocialMediaGenerator.module.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className={styles.container} style={{ maxWidth: '600px' }}>
      <div className={styles.header}>
        <button onClick={() => navigate('/dashboard')} className={styles.actionBtn} style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <span className={styles.subtitle}>Workspace Credentials</span>
        <h2 className={styles.title}>User <span className={styles.titleGlow}>Profile</span></h2>
      </div>

      <div className={styles.glassPanel} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)', display: 'flex', alignItems: 'center', justifyContext: 'center', justifyContent: 'center' }}>
            <User className="w-8 h-8 text-dark-bg" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{user?.full_name || user?.name || user?.email?.split('@')[0] || 'User'}</h3>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>SaaS Workspace Owner</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail className="w-4.5 h-4.5 text-neon-blue" />
            <div>
              <span className={styles.label} style={{ display: 'block', fontSize: '9px' }}>Email Address</span>
              <span style={{ fontSize: '13px', color: 'white' }}>{user.email}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield className="w-4.5 h-4.5 text-neon-purple" />
            <div>
              <span className={styles.label} style={{ display: 'block', fontSize: '9px' }}>Role Status</span>
              <span style={{ fontSize: '13px', color: 'white' }}>Administrator (Full Access)</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Key className="w-4.5 h-4.5 text-neon-cyan" />
            <div>
              <span className={styles.label} style={{ display: 'block', fontSize: '9px' }}>API Linkages</span>
              <span style={{ fontSize: '13px', color: 'white' }}>Gemini Core & Groq Core active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
