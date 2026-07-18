import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Scene2Architecture = ({ sceneProgress, sectionIndex }) => {
  // Section 1: Overview
  if (sectionIndex === 1) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0c1220] p-6 justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-slate-800/80 max-w-sm shadow-xl"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold bg-accent-blue/20 text-accent-blue px-2.5 py-1 rounded-full border border-accent-blue/30 mb-3 inline-block">
            Phase 1: Architecture
          </span>
          <h3 className="text-lg font-bold text-white mb-2">Decoupling Frontend Components</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Transitioning the Hybrid Video LMS from high-coupling to a modular atomic component design system.
          </p>
          <div className="w-full h-1 bg-slate-900 mt-4 rounded-full overflow-hidden">
            <motion.div className="h-full bg-accent-blue" style={{ width: `${sceneProgress * 100}%` }} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Section 5: Best Practices vs Pitfalls
  if (sectionIndex === 5) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0c1220] p-6 justify-center items-center">
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Legacy Pitfall</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Declaring styling hex values and margins inline across different pages. This causes visual drift when adding new views.
            </p>
          </div>
          <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Best Practice</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Consolidating branding variables into dynamic theme tokens. UI cards and buttons consume these variables globally.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section 6: Quiz
  if (sectionIndex === 6) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0c1220] p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Self-Assessment Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: How does modular component grouping improve developer velocity?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>A) By duplicating files across page routers</span>
              <span>❌</span>
            </div>
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>B) By establishing a single source of truth for styles and tests</span>
              <span>✅ Correct</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sections 2, 3, 4: Folder Tree diagram
  const isComponentsOpen = sceneProgress >= 0.1 || sectionIndex >= 3;
  const isPagesOpen = sceneProgress >= 0.45 || sectionIndex >= 4;
  const isHooksOpen = sceneProgress >= 0.75;
  
  const highlightCourseCard = sectionIndex === 2 && sceneProgress < 0.45;
  const highlightUseTransition = sectionIndex === 3;
  const highlightApp = sectionIndex === 4;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0c1220] p-6 justify-center">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">Project Directory Structure</h2>
        <p className="text-xs text-slate-400">Exploring the structural layout inside the source directory</p>
      </div>

      <div className="w-full max-w-md mx-auto glass-panel rounded-lg border border-slate-800/80 overflow-hidden shadow-2xl">
        {/* IDE Header Bar */}
        <div className="flex justify-between items-center bg-[#0d131f] px-4 py-2 border-b border-slate-800/60">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono">hybrid-video-lms / src</span>
          <div className="w-8" />
        </div>

        {/* Tree Body */}
        <div className="p-4 font-mono text-xs text-slate-300 h-80 overflow-y-auto select-none bg-[#0a0f18]/80">
          <div className="flex items-center gap-1.5 py-0.5 text-accent-blue font-medium">
            <span>📂</span>
            <span>src</span>
          </div>

          <div className="pl-4 border-l border-slate-800/60 ml-2 py-0.5 flex flex-col gap-1">
            {/* Components Folder */}
            <div>
              <div className="flex items-center gap-1.5 py-0.5 text-amber-500">
                <span>{isComponentsOpen ? '📂' : '📁'}</span>
                <span>components</span>
              </div>
              
              <AnimatePresence>
                {isComponentsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-6 border-l border-slate-800/40 ml-2 overflow-hidden flex flex-col gap-0.5 py-0.5"
                  >
                    <div className={`flex items-center gap-1.5 py-0.5 px-1.5 rounded transition-all duration-300 ${highlightCourseCard ? 'bg-accent-blue/15 text-accent-blue font-semibold scale-102 border-l-2 border-accent-blue' : 'text-slate-400'}`}>
                      <span>⚛️</span>
                      <span>CourseCard.jsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-0.5 text-slate-400">
                      <span>⚛️</span>
                      <span>Navbar.jsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-0.5 text-slate-400">
                      <span>⚛️</span>
                      <span>Sidebar.jsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-0.5 text-slate-400">
                      <span>⚛️</span>
                      <span>VideoPlayer.jsx</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pages Folder */}
            <div>
              <div className="flex items-center gap-1.5 py-0.5 text-amber-500">
                <span>{isPagesOpen ? '📂' : '📁'}</span>
                <span>pages</span>
              </div>
              
              <AnimatePresence>
                {isPagesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="pl-6 border-l border-slate-800/40 ml-2 overflow-hidden flex flex-col gap-0.5 py-0.5"
                  >
                    <div className="flex items-center gap-1.5 py-0.5 text-slate-400">
                      <span>⚛️</span>
                      <span>Dashboard.jsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-0.5 text-slate-400">
                      <span>⚛️</span>
                      <span>CourseDetails.jsx</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hooks Folder */}
            <div>
              <div className="flex items-center gap-1.5 py-0.5 text-amber-500">
                <span>{isHooksOpen ? '📂' : '📁'}</span>
                <span>hooks</span>
              </div>
              
              <AnimatePresence>
                {isHooksOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="pl-6 border-l border-slate-800/40 ml-2 overflow-hidden flex flex-col gap-0.5 py-0.5"
                  >
                    <div className={`flex items-center gap-1.5 py-0.5 px-1.5 rounded transition-all duration-300 ${highlightUseTransition ? 'bg-accent-purple/15 text-accent-purple font-semibold scale-102 border-l-2 border-accent-purple' : 'text-slate-400'}`}>
                      <span>⚙️</span>
                      <span>useTransition.js</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* App.jsx */}
            <div className={`flex items-center gap-1.5 py-0.5 px-1.5 rounded transition-all duration-300 ${highlightApp ? 'bg-accent-cyan/15 text-accent-cyan font-semibold scale-102 border-l-2 border-accent-cyan' : 'text-slate-400'}`}>
              <span>⚛️</span>
              <span>App.jsx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
