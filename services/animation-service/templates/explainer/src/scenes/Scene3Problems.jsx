import React from 'react';
import { AlertTriangle, Code, Layout, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Scene3Problems = ({ sceneProgress, sectionIndex }) => {
  // Section 1: Overview
  if (sectionIndex === 1) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark via-[#0d0c18] to-bg-dark p-6 justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-slate-800/80 max-w-sm shadow-xl"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full border border-red-500/30 mb-3 inline-block">
            Phase 2: Technical Debt
          </span>
          <h3 className="text-lg font-bold text-white mb-2">Identifying Visual Bottlenecks</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Five critical challenges that degraded visual quality, slowed down rendering speed, and increased cognitive load.
          </p>
          <div className="w-full h-1 bg-slate-900 mt-4 rounded-full overflow-hidden">
            <motion.div className="h-full bg-red-500" style={{ width: `${sceneProgress * 100}%` }} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Section 5: Best Practices vs Pitfalls
  if (sectionIndex === 5) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark via-[#0d0c18] to-bg-dark p-6 justify-center items-center">
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Legacy Pitfall</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Animating elements using direct margin or width changes. This triggers browser reflow loops and page lag.
            </p>
          </div>
          <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Best Practice</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Using CSS transform3d transitions like translate and scale. These offload calculations directly to the GPU.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section 6: Quiz
  if (sectionIndex === 6) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark via-[#0d0c18] to-bg-dark p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Self-Assessment Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: Why are sudden snap-transitions harmful to user cognitive flow?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>A) They break the user's spatial model of the application layout</span>
              <span>✅ Correct</span>
            </div>
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>B) They decrease JavaScript thread load</span>
              <span>❌</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sections 2, 3, 4: Active hotspots
  const activeIndex = 
    sectionIndex === 2 ? 0 :
    sectionIndex === 3 ? 1 : 2;

  const technicalDebts = [
    {
      title: "Repeated UI Code Blocks",
      desc: "Dashboard and course sheets duplicate HTML structures for cards and buttons, bloating codebase footprint.",
      icon: <Code className="w-4 h-4" />,
      color: "text-red-400 border-red-500/30 bg-red-950/20",
      top: "25%",
      left: "40%",
    },
    {
      title: "Design Inconsistencies",
      desc: "Margins, rounded corners, and hover scales vary wildly across containers due to lack of shared design tokens.",
      icon: <Layout className="w-4 h-4" />,
      color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
      top: "55%",
      left: "45%",
    },
    {
      title: "Abrupt Static Transitions",
      desc: "Navigation snaps instantly between view states. The screen flashes blank without animated pacing or feedback.",
      icon: <RefreshCw className="w-4 h-4 animate-spin-slow" />,
      color: "text-rose-400 border-rose-500/30 bg-rose-950/20",
      top: "70%",
      left: "70%",
    },
    {
      title: "Maintainability Hurdles",
      desc: "Modifying a simple card action requires updating five separate CSS definitions and inline styles.",
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "text-orange-400 border-orange-500/30 bg-orange-950/20",
      top: "40%",
      left: "80%",
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 h-full bg-gradient-to-br from-bg-dark via-[#0d0c18] to-bg-dark p-6 gap-6 items-center">
      {/* Left panel showing challenges description */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div>
          <span className="text-[10px] tracking-[0.2em] font-semibold text-red-500 uppercase">Legacy Limitations</span>
          <h2 className="text-xl font-bold text-white mt-1">The Technical Debt</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            The initial LMS frontend faced architectural constraints. Un-reusable rendering trees, code copy-pasting, and raw jumps created friction.
          </p>
        </div>

        {/* Dynamic Highlight Card */}
        <div className="flex flex-col gap-3">
          {technicalDebts.slice(0, 3).map((debt, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-500 flex gap-3 items-start ${isActive ? `${debt.color} scale-102 border-l-4 shadow-lg shadow-red-950/10` : 'border-slate-800/40 bg-slate-900/10 opacity-40'}`}
              >
                <div className="mt-0.5 p-1 rounded bg-black/30 text-white">
                  {debt.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{debt.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{debt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel showing mock legacy UI and warning indicators */}
      <div className="lg:col-span-3 h-full flex items-center justify-center relative">
        <div className="w-full max-w-sm glass-panel rounded-lg border border-slate-800/60 p-3 h-80 relative overflow-hidden flex flex-col gap-2 bg-[#090b11]">
          {/* Top Navbar Mockup */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <div className="w-16 h-3 rounded bg-slate-850" />
            <div className="flex gap-2">
              <div className="w-8 h-3 rounded bg-slate-850" />
              <div className="w-8 h-3 rounded bg-slate-850" />
            </div>
          </div>

          <div className="flex flex-1 gap-2">
            {/* Sidebar Mockup */}
            <div className="w-16 border-r border-slate-900 pr-1 flex flex-col gap-2 pt-2">
              <div className="w-12 h-2.5 rounded bg-slate-850" />
              <div className="w-10 h-2.5 rounded bg-slate-850" />
              <div className="w-12 h-2.5 rounded bg-slate-850" />
            </div>

            {/* Dashboard Content Cards Mockup */}
            <div className="flex-1 p-2 grid grid-cols-2 gap-2 content-start">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-slate-850 p-2 rounded bg-[#0b0f17]/40 flex flex-col gap-1.5">
                  <div className="w-full h-8 bg-slate-900 rounded" />
                  <div className="w-16 h-2 rounded bg-slate-850" />
                  <div className="w-10 h-2 rounded bg-slate-850/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Warning Hotspots overlay */}
          {technicalDebts.slice(0, 3).map((debt, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className="absolute flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{ top: debt.top, left: debt.left }}
              >
                <div className={`relative flex items-center justify-center`}>
                  {isActive && (
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[9px] font-bold border transition-colors ${isActive ? 'bg-red-500 border-red-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                    ⚠️
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
