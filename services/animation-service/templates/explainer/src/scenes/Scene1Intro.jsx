import React from 'react';
import { motion } from 'framer-motion';

export const Scene1Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 relative overflow-hidden bg-gradient-to-br from-bg-dark via-[#090e1a] to-bg-dark">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-accent-cyan font-semibold mb-3 block">
          Engineering Documentary
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Hybrid Video LMS
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-accent-purple tracking-wide mb-6">
          Issue #10: UI Components & Transition Library
        </h2>

        <div className="flex gap-3 justify-center items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/30 backdrop-blur-sm">
            Frontend Enhancement
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-full border border-accent-purple/30 backdrop-blur-sm">
            Open Source Contribution
          </span>
        </div>
      </motion.div>
    </div>
  );
};
