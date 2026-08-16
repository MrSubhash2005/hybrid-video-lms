import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene7Demo = () => {
  // A local loop cycle representing student interactions (duration 10s)
  const [cycleTime, setCycleTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleTime((prev) => (prev + 0.1) % 10);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Compute states for mock cards
  const isHovered = cycleTime >= 2 && cycleTime < 4;
  const showDetails = cycleTime >= 4 && cycleTime < 8;
  const isJankyFlash = cycleTime >= 4 && cycleTime < 4.6; // blank flash representation in legacy

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#080b13] p-4 justify-center">
      
      {/* Header */}
      <div className="text-center mb-4">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-purple uppercase">Live Demonstration</span>
        <h2 className="text-lg font-bold text-white mt-0.5">Before vs After Comparison</h2>
        <p className="text-[11px] text-slate-400">Comparing static snapping routes with physics-based component transitions</p>
      </div>

      {/* Side-by-Side Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto flex-1 items-stretch">
        
        {/* Left Side: Legacy Snap Layout */}
        <div className="glass-panel rounded-lg border border-slate-900 overflow-hidden flex flex-col bg-[#05070c] relative h-64">
          <div className="bg-[#030407] px-3 py-1 border-b border-slate-950 flex justify-between items-center">
            <span className="text-[8px] font-mono text-red-500 uppercase tracking-widest font-bold">Legacy (Snapping)</span>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>

          <div className="p-3 flex-1 flex flex-col justify-start relative text-[10px] text-slate-400 bg-[#06080e]/40">
            {isJankyFlash ? (
              // Sudden blank white frame representing layout shift/snapping latency
              <div className="absolute inset-0 bg-[#090b11] flex items-center justify-center text-slate-700 font-mono text-[9px]">
                LOADING...
              </div>
            ) : showDetails ? (
              // Details layout (Sudden snap)
              <div className="flex flex-col gap-1.5 h-full">
                <span className="text-[8px] text-slate-500">← Back</span>
                <div className="text-xs font-bold text-slate-350">Advanced React UI</div>
                <div className="w-full h-24 bg-slate-900 border border-slate-850 rounded flex items-center justify-center text-slate-500 text-[9px]">
                  [ Video Player Mockup ]
                </div>
              </div>
            ) : (
              // Dashboard Layout (Sudden snap)
              <div className="flex flex-col gap-1.5 h-full">
                <div className="font-bold text-[9px] text-slate-300">My Dashboard</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div
                    className={`p-2 rounded border bg-slate-900/40 ${
                      isHovered ? 'border-slate-700 bg-slate-800/40 text-slate-300' : 'border-slate-900 text-slate-500'
                    }`}
                  >
                    <div className="w-full h-10 rounded bg-slate-850 mb-1" />
                    <div className="font-bold text-[8px]">Advanced React UI</div>
                  </div>
                  <div className="p-2 rounded border border-slate-900 bg-slate-900/40 opacity-40">
                    <div className="w-full h-10 rounded bg-slate-850 mb-1" />
                    <div className="font-bold text-[8px]">Motion Design</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Enhanced Framer Motion Layout */}
        <div className="glass-panel rounded-lg border border-slate-800 overflow-hidden flex flex-col bg-[#070b13] relative h-64 shadow-2xl">
          <div className="bg-[#05070c] px-3 py-1 border-b border-slate-850 flex justify-between items-center">
            <span className="text-[8px] font-mono text-accent-purple uppercase tracking-widest font-bold">Enhanced (Framer Motion)</span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
          </div>

          <div className="p-3 flex-1 flex flex-col justify-start relative text-[10px] text-slate-200 bg-[#090e18]/80">
            <AnimatePresence mode="wait">
              {showDetails ? (
                // Details layout (Slide and Fade)
                <motion.div
                  key="enhanced-details"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="flex flex-col gap-1.5 h-full"
                >
                  <span className="text-[8px] font-semibold text-accent-cyan cursor-pointer">← Back</span>
                  <div className="text-xs font-bold text-white">Advanced React UI</div>
                  <div className="w-full h-24 bg-slate-900 border border-slate-800 rounded flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/5" />
                    <span className="text-white text-xs font-bold w-6 h-6 rounded-full bg-accent-blue/80 flex items-center justify-center shadow-lg cursor-pointer">▶</span>
                  </div>
                </motion.div>
              ) : (
                // Dashboard Layout (Spring Card, Scale Easing)
                <motion.div
                  key="enhanced-dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-1.5 h-full"
                >
                  <div className="font-bold text-[9px] text-slate-300">My Dashboard</div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        y: isHovered ? -4 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className={`p-2 rounded-lg border bg-slate-900/60 ${
                        isHovered ? 'border-accent-blue shadow-glow-blue text-white' : 'border-slate-800/80 text-slate-400'
                      }`}
                    >
                      <div className="w-full h-10 rounded bg-gradient-to-br from-accent-blue/20 to-accent-purple/10 mb-1" />
                      <div className="font-bold text-[8px]">Advanced React UI</div>
                    </motion.div>
                    <div className="p-2 rounded-lg border border-slate-800/80 bg-slate-900/60 opacity-40">
                      <div className="w-full h-10 rounded bg-gradient-to-br from-accent-purple/20 to-accent-cyan/10 mb-1" />
                      <div className="font-bold text-[8px]">Motion Design</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
