import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Scene4Design = ({ sceneProgress, sectionIndex }) => {
  // Section 1: Overview
  if (sectionIndex === 1) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090a14] p-6 justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-slate-800/80 max-w-sm shadow-xl"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold bg-accent-purple/20 text-accent-purple px-2.5 py-1 rounded-full border border-accent-purple/30 mb-3 inline-block">
            Phase 3: Solution
          </span>
          <h3 className="text-lg font-bold text-white mb-2">Centralized Component Blueprints</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consolidating layout components and atomic leaves into a single unified directory layout.
          </p>
          <div className="w-full h-1 bg-slate-900 mt-4 rounded-full overflow-hidden">
            <motion.div className="h-full bg-accent-purple" style={{ width: `${sceneProgress * 100}%` }} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Section 5: Best Practices vs Pitfalls
  if (sectionIndex === 5) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090a14] p-6 justify-center items-center">
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Legacy Pitfall</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Hardcoding margin values and borders inside localized buttons, leading to broken alignments when refactoring.
            </p>
          </div>
          <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Best Practice</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Keeping all leaf UI components fully stateless and passing styling parameters down through reusable props.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section 6: Quiz
  if (sectionIndex === 6) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090a14] p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Self-Assessment Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: What is the primary benefit of keeping leaf components fully stateless?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>A) Predictable rendering behavior and simple unit testing</span>
              <span>✅ Correct</span>
            </div>
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>B) Automatic route state changes and router bindings</span>
              <span>❌</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sections 2, 3, 4: Topology Board
  const isAppFocused = sectionIndex >= 2;
  const isLayoutsFocused = sectionIndex >= 3 || (sectionIndex === 2 && sceneProgress >= 0.25);
  const isPagesFocused = sectionIndex >= 4 || (sectionIndex === 2 && sceneProgress >= 0.5);
  const isLeavesFocused = sectionIndex === 4 || (sectionIndex === 2 && sceneProgress >= 0.75);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090a14] p-6 justify-center items-center relative overflow-hidden">
      <div className="w-full text-center mb-6 z-10">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-purple uppercase">Solution Topology</span>
        <h2 className="text-xl font-bold text-white mt-1">Unified Component Architecture</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Centralizing shared state in layout blocks while isolating reusable leaf nodes
        </p>
      </div>

      <div className="relative w-full max-w-2xl h-72 border border-slate-900 bg-[#070b13]/60 rounded-xl p-4 flex items-center justify-center">
        
        {/* Connection Paths SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <g opacity={isLayoutsFocused ? 1 : 0.2} className="transition-opacity duration-700">
            <path d="M 320 60 L 160 130" stroke="url(#tree-line-grad)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
            <path d="M 320 60 L 260 130" stroke="url(#tree-line-grad)" strokeWidth="1.5" fill="none" />
            <path d="M 320 60 L 380 130" stroke="url(#tree-line-grad)" strokeWidth="2" fill="none" />
            <path d="M 320 60 L 480 130" stroke="url(#tree-line-grad)" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
          </g>

          <g opacity={isLeavesFocused ? 1 : 0.2} className="transition-opacity duration-700">
            <path d="M 380 150 L 320 220" stroke="url(#tree-line-grad-accent)" strokeWidth="1.5" fill="none" />
            <path d="M 380 150 L 440 220" stroke="url(#tree-line-grad-accent)" strokeWidth="1.5" fill="none" />
          </g>

          <defs>
            <linearGradient id="tree-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="tree-line-grad-accent" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Node Components */}
        <motion.div
          animate={{ scale: isAppFocused ? 1.05 : 1 }}
          className={`absolute top-8 w-24 py-1.5 rounded-lg border text-center text-xs font-mono font-semibold transition-all duration-500 bg-[#0f1524] z-20 ${isAppFocused ? 'border-accent-purple shadow-glow-purple text-white' : 'border-slate-800 text-slate-500'}`}
          style={{ left: 'calc(50% - 48px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-purple inline-block mr-1.5 animate-pulse" />
          App Shell
        </motion.div>

        <div className="absolute top-32 inset-x-4 flex justify-between px-6 z-20">
          <motion.div
            animate={{ opacity: isLayoutsFocused ? 1 : 0.3 }}
            className={`w-20 py-1.5 rounded border text-center text-[10px] font-mono transition-all duration-500 ${isLayoutsFocused ? 'border-slate-700 bg-slate-900/90 text-slate-200' : 'border-slate-850 bg-slate-950 text-slate-600'}`}
          >
            Navbar
          </motion.div>

          <motion.div
            animate={{ opacity: isLayoutsFocused ? 1 : 0.3 }}
            className={`w-20 py-1.5 rounded border text-center text-[10px] font-mono transition-all duration-500 ${isLayoutsFocused ? 'border-slate-700 bg-slate-900/90 text-slate-200' : 'border-slate-850 bg-slate-950 text-slate-600'}`}
          >
            Sidebar
          </motion.div>

          <motion.div
            animate={{ scale: isPagesFocused ? 1.05 : 1, opacity: isPagesFocused ? 1 : 0.3 }}
            className={`w-28 py-2 rounded-lg border text-center text-xs font-mono font-semibold transition-all duration-500 ${isPagesFocused ? 'border-accent-blue bg-accent-blue/10 text-white shadow-glow-blue' : 'border-slate-850 bg-slate-950 text-slate-600'}`}
            style={{ position: 'absolute', left: 'calc(50% - 56px)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block mr-1.5 animate-pulse" />
            Dashboard
          </motion.div>

          <motion.div
            animate={{ opacity: isLayoutsFocused ? 1 : 0.3 }}
            className={`w-20 py-1.5 rounded border text-center text-[10px] font-mono transition-all duration-500 ${isLayoutsFocused ? 'border-slate-700 bg-slate-900/90 text-slate-200' : 'border-slate-850 bg-slate-950 text-slate-600'}`}
          >
            Footer
          </motion.div>
        </div>

        <div className="absolute bottom-6 w-full flex justify-center gap-12 z-20">
          <motion.div
            animate={{ scale: isLeavesFocused ? 1.05 : 1, opacity: isLeavesFocused ? 1 : 0.3 }}
            className={`w-24 py-1.5 rounded border text-center text-[10px] font-mono transition-all duration-500 bg-[#0f172a] ${isLeavesFocused ? 'border-accent-cyan text-accent-cyan shadow-glow-cyan font-medium' : 'border-slate-850 text-slate-600'}`}
          >
            Course Cards
          </motion.div>

          <motion.div
            animate={{ scale: isLeavesFocused ? 1.05 : 1, opacity: isLeavesFocused ? 1 : 0.3 }}
            className={`w-24 py-1.5 rounded border text-center text-[10px] font-mono transition-all duration-500 bg-[#0f172a] ${isLeavesFocused ? 'border-accent-cyan text-accent-cyan shadow-glow-cyan font-medium' : 'border-slate-850 text-slate-600'}`}
          >
            Video Player
          </motion.div>
        </div>
      </div>
    </div>
  );
};
