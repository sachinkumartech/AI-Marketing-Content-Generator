import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AICoreCanvas from '../components/3d/AICoreCanvas';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Share2, Mail, Box, Target, ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [activeScene, setActiveScene] = useState(0);
  const navigate = useNavigate();
  
  // Section refs for GSAP ScrollTrigger detection
  const heroRef = useRef(null);
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);
  const scene5Ref = useRef(null);

  useEffect(() => {
    const sections = [
      { ref: heroRef, scene: 0 },
      { ref: scene1Ref, scene: 1 },
      { ref: scene2Ref, scene: 2 },
      { ref: scene3Ref, scene: 3 },
      { ref: scene4Ref, scene: 4 },
      { ref: scene5Ref, scene: 5 },
    ];

    sections.forEach(({ ref, scene }) => {
      if (ref.current) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveScene(scene),
          onEnterBack: () => setActiveScene(scene),
          // debug markers can be added if needed, but not in prod
        });
      }
    });

    // GSAP parallax text fades
    const textElements = document.querySelectorAll('.animate-on-scroll');
    textElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleExplore = () => {
    scene1Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Cinematic Main Section Wrapper */}
      <div className="flex flex-col lg:flex-row relative">
        
        {/* Sticky 3D Canvas Side (Left side on desktop, top sticky on mobile) */}
        <div className="w-full lg:w-[50%] h-[40vh] lg:h-screen sticky top-0 z-20 flex items-center justify-center overflow-hidden bg-gradient-to-b lg:bg-gradient-to-r from-[#030014]/50 to-transparent">
          <div className="w-[120%] h-[120%] absolute flex items-center justify-center">
            <AICoreCanvas activeScene={activeScene} />
          </div>
          
          {/* Subtle Canvas Border Overlay */}
          <div className="absolute inset-0 pointer-events-none border-r border-white/5 shadow-[inset_-30px_0_50px_rgba(0,0,0,0.6)] hidden lg:block" />
        </div>

        {/* Scrollable Story Telling Content Side */}
        <div className="w-full lg:w-[50%] relative z-10 flex flex-col px-6 md:px-16">
          
          {/* HERO SECTION (Scene 0) */}
          <section
            id="hero"
            ref={heroRef}
            className="min-h-screen flex flex-col justify-center py-20 relative"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-xs text-neon-blue font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              >
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Marketing Engine
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                AI Marketing <br />
                <span className="text-gradient-neon font-black">Generator</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-white/60 font-medium max-w-lg leading-relaxed"
              >
                Create high-converting marketing content in seconds using Artificial Intelligence. Drive conversions, write copy, and deploy ads with premium precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  className="magnetic-btn px-8 py-3.5 rounded-full text-sm font-semibold text-dark-bg bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_25px_rgba(189,0,255,0.4)] flex items-center gap-2 hover:opacity-95 transition-all"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleExplore}
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-white/80 border border-white/10 hover:border-white/20 bg-white/5 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 text-neon-cyan" /> Explore Features
                </button>
              </motion.div>
            </div>
          </section>

          {/* SCENE 1: AI Brain (Scene 1) */}
          <section
            id="features"
            ref={scene1Ref}
            className="min-h-screen flex flex-col justify-center py-20 border-t border-white/5"
          >
            <div className="space-y-6 animate-on-scroll">
              <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center shadow-[0_0_20px_rgba(189,0,255,0.15)]">
                <Brain className="w-6 h-6 text-neon-purple" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Scene 1: <span className="text-neon-purple">Neural Brain</span> Synthesis
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                Our advanced neural model maps core product features, categorizing semantic hooks and identifying latent marketing angles. Watch raw data morph into initial concepts instantaneously.
              </p>
              <div className="glass-panel p-6 rounded-2xl border border-neon-purple/20 max-w-md">
                <h4 className="text-xs font-semibold uppercase text-neon-purple tracking-widest mb-2">Neural Spark</h4>
                <p className="text-xs text-white/60">"Generating concepts: 94% alignment. Targeted angles found for B2B, SaaS, and Product Launch segments."</p>
              </div>
            </div>
          </section>

          {/* SCENE 2: Social Media (Scene 2) */}
          <section
            ref={scene2Ref}
            className="min-h-screen flex flex-col justify-center py-20 border-t border-white/5"
          >
            <div className="space-y-6 animate-on-scroll">
              <div className="w-12 h-12 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <Share2 className="w-6 h-6 text-neon-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Scene 2: <span className="text-neon-blue">Social Media</span> Hooks
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                Concepts are split into tailored threads, engagement triggers, and optimized formats for LinkedIn, Twitter, and Instagram. Hook audiences with scroll-stopping posts in one click.
              </p>
              <div className="glass-panel p-6 rounded-2xl border border-neon-blue/20 max-w-md flex flex-col gap-2">
                <span className="text-[10px] font-bold text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded self-start">TWITTER / X HOOK</span>
                <p className="text-xs text-white/80 font-medium">"99% of marketers fail at copywriting. Here is the AI framework that outputs 10x conversions:"</p>
              </div>
            </div>
          </section>

          {/* SCENE 3: Professional Emails (Scene 3) */}
          <section
            ref={scene3Ref}
            className="min-h-screen flex flex-col justify-center py-20 border-t border-white/5"
          >
            <div className="space-y-6 animate-on-scroll">
              <div className="w-12 h-12 rounded-2xl bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,0,122,0.15)]">
                <Mail className="w-6 h-6 text-neon-pink" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Scene 3: High-Converting <span className="text-neon-pink">Emails</span>
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                Craft professional email flows that establish trust and command actions. From newsletters to high-impact sales drips, customize tones and CTAs with neural templates.
              </p>
              <div className="glass-panel p-6 rounded-2xl border border-neon-pink/20 max-w-md">
                <h4 className="text-xs font-semibold uppercase text-neon-pink tracking-widest mb-1">Drip Campaign v1</h4>
                <p className="text-[11px] text-white/40">Subject: Unlocking 10x marketing output...</p>
              </div>
            </div>
          </section>

          {/* SCENE 4: Product Descriptions (Scene 4) */}
          <section
            ref={scene4Ref}
            className="min-h-screen flex flex-col justify-center py-20 border-t border-white/5"
          >
            <div className="space-y-6 animate-on-scroll">
              <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,209,0.15)]">
                <Box className="w-6 h-6 text-neon-cyan" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Scene 4: Attractive <span className="text-neon-cyan">Product Copy</span>
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                Fuses features with psychological triggers. Craft beautiful e-commerce or product pages that highlight benefits, overcome objections, and drive shopping cart completions.
              </p>
              <div className="glass-panel p-6 rounded-2xl border border-neon-cyan/20 max-w-md">
                <span className="text-[10px] text-neon-cyan font-bold uppercase tracking-wider block mb-2">E-Commerce Ready</span>
                <p className="text-xs text-white/60">Sleek materials, custom glow borders, and state-of-the-art interactive modules built for modern storefronts.</p>
              </div>
            </div>
          </section>

          {/* SCENE 5: Advertisements (Scene 5) */}
          <section
            id="story"
            ref={scene5Ref}
            className="min-h-screen flex flex-col justify-center py-20 border-t border-white/5"
          >
            <div className="space-y-6 animate-on-scroll">
              <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center shadow-[0_0_20px_rgba(189,0,255,0.15)]">
                <Target className="w-6 h-6 text-neon-purple" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Scene 5: Interactive <span className="text-neon-purple">Advertisements</span>
              </h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
                Assemble multi-variant ad headlines and creative copies automatically. Standardize structures for Google Ads, Facebook Ads, and LinkedIn campaigns with pixel-perfect layouts.
              </p>
              <div className="pt-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-dark-bg bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_25px_rgba(0,255,209,0.3)] hover:opacity-90 transition-all"
                >
                  Create Your First Campaign Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
