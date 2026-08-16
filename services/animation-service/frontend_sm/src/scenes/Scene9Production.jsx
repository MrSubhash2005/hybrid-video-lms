import React from 'react';
import { motion } from 'framer-motion';

export const Scene9Production = ({ sceneProgress, sectionIndex }) => {
  // Section 1: Playwright Continuous Integration Test logs
  if (sectionIndex === 1) {
    const showLine1 = sceneProgress >= 0.15;
    const showLine2 = sceneProgress >= 0.4;
    const showLine3 = sceneProgress >= 0.65;
    const showLine4 = sceneProgress >= 0.85;

    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#05070a] p-6 justify-center items-center">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-3">
            <span className="text-[9px] tracking-widest font-mono text-accent-cyan uppercase">Continuous Integration</span>
            <h3 className="text-sm font-bold text-white mt-0.5">Automated Visual Regression Audits</h3>
          </div>
          
          <div className="w-full h-64 rounded-lg border border-slate-900 bg-[#020408] font-mono text-[10px] text-slate-400 p-4 flex flex-col gap-2.5 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-slate-650 text-[9px] ml-auto">Terminal: bash</span>
            </div>

            <div className="flex gap-1.5 text-slate-300">
              <span className="text-accent-purple">$</span>
              <span>npx playwright test --project=chromium</span>
            </div>

            <div className="flex flex-col gap-1.5 flex-1 select-none">
              {showLine1 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-slate-500">
                  Running 3 visual regression snapshot tests...
                </motion.div>
              )}
              {showLine2 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-green-400 flex items-center gap-1.5">
                  <span>✓</span>
                  <span>[chromium] › CourseCard.spec.js › hover animation match (245ms)</span>
                </motion.div>
              )}
              {showLine3 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-green-400 flex items-center gap-1.5">
                  <span>✓</span>
                  <span>[chromium] › VideoPlayer.spec.js › sync-locking timeline (412ms)</span>
                </motion.div>
              )}
              {showLine4 && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-green-300 font-bold border-t border-slate-900 pt-2 flex justify-between">
                  <span>3 passed (1.6s)</span>
                  <span className="bg-green-950/40 text-green-400 px-2 py-0.5 rounded border border-green-500/20 text-[8px] uppercase">SUCCESS</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Section 2: Compositor layering visualization
  if (sectionIndex === 2) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#05070a] p-6 justify-center items-center">
        <div className="text-center mb-4">
          <span className="text-[9px] tracking-widest font-mono text-accent-purple uppercase">GPU Compositing</span>
          <h3 className="text-sm font-bold text-white mt-0.5">Isolating Paint & Transform Cycles</h3>
        </div>

        {/* Stack diagram */}
        <div className="w-full max-w-sm h-52 relative flex items-center justify-center">
          
          {/* GPU layer */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-4 w-60 h-10 border border-accent-cyan bg-accent-cyan/15 rounded-lg flex items-center justify-center shadow-lg shadow-accent-cyan/10 z-30"
          >
            <span className="text-[10px] font-mono text-accent-cyan font-bold">Compositor Layer (GPU Transforms)</span>
          </motion.div>

          {/* Connection line */}
          <div className="absolute top-14 bottom-24 w-0.5 border-r border-dashed border-slate-800" />

          {/* DOM Paint layer */}
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 w-60 h-10 border border-accent-purple bg-accent-purple/10 rounded-lg flex items-center justify-center shadow-md z-20 opacity-70"
          >
            <span className="text-[10px] font-mono text-accent-purple">Raster Paint Layer (DOM Styling)</span>
          </motion.div>

          {/* Layout Layer */}
          <div className="absolute bottom-10 w-60 h-10 border border-slate-900 bg-slate-950/40 rounded-lg flex items-center justify-center opacity-30 z-10">
            <span className="text-[10px] font-mono text-slate-500 line-through">Layout Reflow Layer (Bypassed)</span>
          </div>

          <span className="absolute bottom-2 text-[8px] uppercase tracking-wider font-mono text-green-400 bg-green-950/20 border border-green-500/20 px-2 py-0.5 rounded">
            GPU Composition: 60 FPS
          </span>
        </div>
      </div>
    );
  }

  // Section 3: Adaptive streaming / chunk cache diagram
  if (sectionIndex === 3) {
    const pulseX = `${(sceneProgress % 0.5) * 200}%`;
    const isCaching = sceneProgress % 0.5 > 0.1;

    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#05070a] p-6 justify-center items-center">
        <div className="text-center mb-6">
          <span className="text-[9px] tracking-widest font-mono text-accent-cyan uppercase">Network Optimization</span>
          <h3 className="text-sm font-bold text-white mt-0.5">Adaptive Bitrate Chunk Pre-fetching</h3>
        </div>

        <div className="w-full max-w-md h-40 border border-slate-900/60 bg-[#070b13]/60 rounded-xl p-4 flex items-center justify-between relative">
          {/* Server Node */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div className="w-12 h-12 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center text-lg shadow-lg">
              📡
            </div>
            <span className="text-[9px] font-mono text-slate-500">Video Server</span>
          </div>

          {/* Network pipe connection line */}
          <div className="flex-1 h-1 bg-slate-950 mx-4 relative overflow-hidden rounded">
            {isCaching && (
              <motion.div
                className="absolute top-0 bottom-0 w-4 bg-accent-cyan rounded blur-sm"
                style={{ left: pulseX }}
              />
            )}
          </div>

          {/* Cache Queue */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div className="flex gap-1 bg-slate-950 p-2 rounded-lg border border-slate-850 shadow-inner">
              <div className={`w-6 h-8 rounded border text-[8px] font-bold font-mono flex items-center justify-center ${sceneProgress >= 0.2 ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-slate-900 text-slate-800'}`}>
                C01
              </div>
              <div className={`w-6 h-8 rounded border text-[8px] font-bold font-mono flex items-center justify-center ${sceneProgress >= 0.5 ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-slate-900 text-slate-800'}`}>
                C02
              </div>
              <div className={`w-6 h-8 rounded border text-[8px] font-bold font-mono flex items-center justify-center ${sceneProgress >= 0.8 ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-slate-900 text-slate-800'}`}>
                C03
              </div>
            </div>
            <span className="text-[9px] font-mono text-slate-500">Pre-fetch Queue</span>
          </div>
        </div>
      </div>
    );
  }

  // Section 4: Final QA review questions
  if (sectionIndex === 4) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#05070a] p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Course Review Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: What is the primary benefit of compositor layers?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>A) They bypass browser layout reflows, executing transforms on the GPU</span>
              <span>✅ Correct</span>
            </div>
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>B) They reduce source code bundle sizes during compile runs</span>
              <span>❌</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
