import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Scene8Summary = ({ sceneProgress, sectionIndex }) => {
  // Section 1: Overview
  if (sectionIndex === 1) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-[#090b11] via-bg-dark to-[#04060b] p-6 justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-slate-800/80 max-w-sm shadow-xl"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold bg-accent-cyan/20 text-accent-cyan px-2.5 py-1 rounded-full border border-accent-cyan/30 mb-3 inline-block">
            Phase 6: Recap
          </span>
          <h3 className="text-lg font-bold text-white mb-2">Enhancement Summary</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consolidating component templates and motion libraries to build high-performance classroom dashboards.
          </p>
          <div className="w-full h-1 bg-slate-900 mt-4 rounded-full overflow-hidden">
            <motion.div className="h-full bg-accent-cyan" style={{ width: `${sceneProgress * 100}%` }} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Section 5: Best Practices vs Pitfalls
  if (sectionIndex === 5) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-[#090b11] via-bg-dark to-[#04060b] p-6 justify-center items-center">
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Legacy Pitfall</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Committing custom style overrides for specific features. This makes it difficult for other developers to extend elements.
            </p>
          </div>
          <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Best Practice</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Contributing style adjustments directly to the shared library. This inherits all core transition rules automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section 6: Quiz
  if (sectionIndex === 6) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-[#090b11] via-bg-dark to-[#04060b] p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Self-Assessment Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: How can you help build this open-source tool?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>A) Fork on GitHub, write a feature branch, and submit a PR</span>
              <span>✅ Correct</span>
            </div>
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>B) Edit files on staging systems directly</span>
              <span>❌</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sections 2, 3: Metrics grid view
  // Section 4: Credits roll
  const showSummary = sectionIndex === 2 || sectionIndex === 3;

  const metrics = [
    { label: "Reusable Components", value: "Unified UI Widgets Library", desc: "Common cards and buttons consolidated." },
    { label: "Transition Library", value: "Framer Motion Spring Engine", desc: "Elastic physical sheet movements integrated." },
    { label: "User Experience", value: "Eliminated Snap Latency", desc: "Cohesive visual states prevent context breaks." },
    { label: "Scalable Codebase", value: "40% Less Styling Markup", desc: "Centralized tokens accelerate feature additions." }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#090b11] via-bg-dark to-[#04060b] p-6 justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {showSummary ? (
          <motion.div
            key="summary-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg z-10"
          >
            <div className="text-center mb-6">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-accent-cyan uppercase">Review</span>
              <h2 className="text-xl font-bold text-white mt-1">Enhancement Summary</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric, index) => {
                const isHighlighted = sectionIndex === 3 && index >= 2;
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-300 bg-slate-950/40 backdrop-blur-sm ${
                      isHighlighted ? 'border-accent-cyan shadow-glow-cyan' : 'border-slate-900'
                    }`}
                  >
                    <span className="text-[8px] text-accent-cyan uppercase font-bold tracking-wider">{metric.label}</span>
                    <h4 className="text-xs font-bold text-white mt-1 leading-snug">{metric.value}</h4>
                    <p className="text-[9px] text-slate-500 mt-1 leading-normal">{metric.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="credits-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="text-center z-10 w-full max-w-md flex flex-col gap-5 py-4"
          >
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent mb-1">
                Thank You for Watching
              </h1>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Engineering Presentation</span>
            </div>

            <div className="border-t border-b border-slate-900/60 py-4 my-2 flex flex-col gap-1.5 bg-slate-950/10 backdrop-blur-sm rounded-lg">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Project</span>
              <h3 className="text-sm font-bold text-white">Hybrid Video LMS</h3>
              <span className="text-[10px] text-accent-purple font-medium">Frontend Enhancement</span>
              <p className="text-[9px] text-slate-400">UI Components & Transition Library</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Contributors</span>
              <h4 className="text-xs font-bold text-white">Sumit Prajapati</h4>
              <h4 className="text-xs font-bold text-white">Subhash Maurya</h4>
            </div>

            <div className="mt-2">
              <span className="text-[9px] uppercase font-bold tracking-widest bg-accent-cyan/15 text-accent-cyan px-3 py-1 rounded-full border border-accent-cyan/20">
                Open Source Contribution
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
