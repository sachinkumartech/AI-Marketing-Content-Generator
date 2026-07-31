import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import FeatureCard from '../components/FeatureCard';
import GeneratorModal from '../components/GeneratorModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Search, Bell, User, History,
  Mail, Box, Target, Layers, HelpCircle, Activity, ChevronRight
} from 'lucide-react';

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Dashboard() {
  const { user } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  const [activeFeature, setActiveFeature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dashboard UI state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Neural Engine updated to v4.2', read: false },
    { id: 2, text: 'Ad Campaign template optimized', read: true },
    { id: 3, text: 'Weekly generation summary ready', read: true }
  ]);



  const handleOpenGenerator = (featureId) => {
    if (featureId === 'social') {
      navigate('/social-generator');
      return;
    }
    if (featureId === 'ad') {
      navigate('/advertisement-generator');
      return;
    }
    if (featureId === 'email') {
      navigate('/email-generator');
      return;
    }
    setActiveFeature(featureId);
    setIsModalOpen(true);
    showToast(`Workspace loading...`, 'info');
  };



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    showToast(`Searching for "${searchQuery}"...`, 'info');
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'success');
  };

  const featuresList = [
    {
      id: 'social',
      title: 'AI Social Media Post Generator',
      description: 'Generate high-impact social media posts, threads, hooks, and hashtags customized for Twitter, LinkedIn, and Instagram.',
      icon: TwitterIcon,
      glowColor: '#9ca3af', // Gray
    },
    {
      id: 'email',
      title: 'AI Email Generator',
      description: 'Craft professional cold emails, newsletters, and conversion drips with customized call-to-actions (CTAs) and subject lines.',
      icon: Mail,
      glowColor: '#e5e7eb', // Light Gray
    },
    {
      id: 'product',
      title: 'AI Product Description Generator',
      description: 'Formulate premium e-commerce copy fusing features and customer benefits into high-converting descriptions.',
      icon: Box,
      glowColor: '#f9fafb', // White/Lightest Gray
    },
    {
      id: 'ad',
      title: 'AI Advertisement Generator',
      description: 'Structure multi-variant ad headlines, body texts, and descriptions optimized for Facebook, Google, and LinkedIn campaigns.',
      icon: Target,
      glowColor: '#6b7280', // Darker Gray
    }
  ];

  const filteredFeatures = featuresList.filter(f => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto pt-32 relative">
      
      {/* Dashboard Top Header Navigation (Search, Bell, Settings, Logout) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/5 mb-10">
        <div>
          <span className="text-xs text-neon-blue font-bold tracking-widest uppercase">Workspace Management</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Welcome back, <span className="text-gradient-neon">{user?.full_name || user?.name || user?.email?.split('@')[0] || 'Marketer'}</span>
          </h2>
          <p className="text-sm text-white/50 mt-1">What would you like AI to generate today?</p>
          
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-neon-purple uppercase tracking-widest">Developed By:</span>
            {['Priyansu Chatterjee', 'Rohan Majumdar', 'Zufishan Rais', 'Soumalya Ghosh', 'Dipa Dey', 'Sachin Kumar'].map((dev, idx) => (
              <span key={idx} className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-neon-cyan/80">
                {dev}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          {/* Mock Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search generators..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl glow-input text-xs text-white"
            />
          </form>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl glass-panel border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer relative"
            >
              <Bell className="w-4.5 h-4.5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_#6b7280]" />
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 glass-panel border border-white/10 rounded-2xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-30"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <button 
                      onClick={markAllNotificationsRead} 
                      className="text-[10px] text-neon-blue hover:underline cursor-pointer"
                    >
                      Mark read
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-48 overflow-y-auto no-scrollbar">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl border text-xs leading-relaxed transition-colors ${n.read ? 'bg-transparent border-transparent text-white/50' : 'bg-neon-blue/5 border-neon-blue/20 text-white'}`}>
                        {n.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History Icon */}
          <button
            onClick={() => navigate('/history')}
            className="p-2.5 rounded-xl glass-panel border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
            title="Generation History"
          >
            <History className="w-4.5 h-4.5" />
          </button>

          {/* Profile Icon */}
          <button
            onClick={() => navigate('/profile')}
            className="p-2.5 rounded-xl glass-panel border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
            title="User Profile"
          >
            <User className="w-4.5 h-4.5" />
          </button>


        </div>
      </div>

      {/* Workspace Quick Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">Model API Credits</span>
            <div className="text-2xl font-black text-white">4,820 <span className="text-xs font-medium text-white/40">/ 5,000</span></div>
            <span className="text-[10px] text-neon-cyan font-semibold block">Renews in 12 days</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-neon-cyan" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">Generated Assets</span>
            <div className="text-2xl font-black text-white">324 <span className="text-xs font-medium text-white/40">created</span></div>
            <span className="text-[10px] text-neon-blue font-semibold block">98% download rate</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-neon-blue/5 border border-neon-blue/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-neon-blue" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block">Generation Latency</span>
            <div className="text-2xl font-black text-white">1.42s <span className="text-xs font-medium text-white/40">avg speed</span></div>
            <span className="text-[10px] text-neon-purple font-semibold block">Optimum node link active</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-neon-purple/5 border border-neon-purple/20 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-neon-purple" />
          </div>
        </div>
      </div>

      {/* Feature Cards Grid Section */}
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-neon-blue" /> Generation Workspaces
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredFeatures.map(feat => (
          <FeatureCard
            key={feat.id}
            title={feat.title}
            description={feat.description}
            icon={feat.icon}
            glowColor={feat.glowColor}
            onClick={() => handleOpenGenerator(feat.id)}
          />
        ))}
      </div>

      {/* Simulated Recent Workspace History */}
      <div className="mt-16">
        <h3 className="text-lg font-bold text-white mb-6">Recent Creations</h3>
        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden divide-y divide-white/5">
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                <TwitterIcon className="w-4 h-4 text-neon-purple" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Launch Campaign Tweet Thread</h4>
                <p className="text-[10px] text-white/40">Generated 2 hours ago • social_copy.txt</p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-neon-purple bg-neon-purple/10 border border-neon-purple/20 px-2 py-0.5 rounded self-start sm:self-center">
              SOCIAL MEDIA
            </span>
          </div>

          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-neon-blue" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Inactive User Drip Outreach</h4>
                <p className="text-[10px] text-white/40">Generated 1 day ago • outreach_email.txt</p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-neon-blue bg-neon-blue/10 border border-neon-blue/20 px-2 py-0.5 rounded self-start sm:self-center">
              EMAIL COPY
            </span>
          </div>
        </div>
      </div>



      {/* Generator Modal Window */}
      <GeneratorModal
        feature={activeFeature}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
