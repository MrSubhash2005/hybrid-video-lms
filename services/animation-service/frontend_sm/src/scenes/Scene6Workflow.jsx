import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Scene6Workflow = ({ sceneProgress, sectionIndex }) => {
  // Section 1: Overview
  if (sectionIndex === 1) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090b14] p-6 justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-slate-800/80 max-w-sm shadow-xl"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold bg-accent-purple/20 text-accent-purple px-2.5 py-1 rounded-full border border-accent-purple/30 mb-3 inline-block">
            Phase 5: Rendering loop
          </span>
          <h3 className="text-lg font-bold text-white mb-2">FLIP Layout Pipeline</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tracing React state events to Virtual DOM differentials, resolving layout coordinates through hardware-accelerated loops.
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
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090b14] p-6 justify-center items-center">
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Legacy Pitfall</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Animating layout properties like width, height, top, or left. This forces the browser to recalculate text bounds (reflow).
            </p>
          </div>
          <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Best Practice</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Always use transform properties: scale and translate. These bypass the layout engine and execute on the GPU.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section 6: Quiz
  if (sectionIndex === 6) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090b14] p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Self-Assessment Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: What does the Invert step in the FLIP technique do?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>A) It uses scale and translation transforms to match the element's start coordinates</span>
              <span>✅ Correct</span>
            </div>
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>B) It triggers React state re-render loops</span>
              <span>❌</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sections 2, 3, 4: Grid steps highlight
  const activeStep = 
    sectionIndex === 2 ? (sceneProgress < 0.5 ? 1 : 2) :
    sectionIndex === 3 ? (sceneProgress < 0.5 ? 3 : 4) :
    (sceneProgress < 0.5 ? 5 : 6);

  const steps = [
    { number: 1, title: "User Click", desc: "Mouse trigger is captured by the synthetic event handler.", icon: "🖱️" },
    { number: 2, title: "React State", desc: "Local state hooks update, dispatching navigation events.", icon: "⚡" },
    { number: 3, title: "Re-render", desc: "React executes component loops, producing updated trees.", icon: "⚛️" },
    { number: 4, title: "DOM Update", desc: "Reconciliation engine paints structural modifications to the DOM.", icon: "🌳" },
    { number: 5, title: "Smooth Transition", desc: "Framer Motion calculates physics curves, applying CSS transforms.", icon: "✨" },
    { number: 6, title: "Updated Interface", desc: "Fluid state achieved, presenting organic animations to user.", icon: "📱" }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#090b14] p-6 justify-center items-center">
      <div className="text-center mb-5">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-purple uppercase">Render Lifecycle</span>
        <h2 className="text-lg font-bold text-white mt-1">Reactive Action-Render Loop</h2>
        <p className="text-[11px] text-slate-400 mt-0.5">Tracing data pathways from mouse triggers to physical canvas animations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-xl relative">
        {steps.map((step) => {
          const isActive = step.number === activeStep;
          const isDone = step.number < activeStep;
          
          return (
            <motion.div
              key={step.number}
              animate={{
                scale: isActive ? 1.03 : 1,
              }}
              className={`p-3 rounded-lg border text-left flex flex-col justify-between h-28 relative transition-all duration-500 ${
                isActive 
                  ? 'border-accent-purple bg-accent-purple/10 text-white shadow-glow-purple' 
                  : isDone
                    ? 'border-slate-800 bg-slate-900/10 text-slate-300 opacity-80'
                    : 'border-slate-900 bg-slate-950/20 text-slate-650 opacity-30'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg">{step.icon}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isActive 
                    ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30' 
                    : 'bg-slate-900 text-slate-500'
                }`}>
                  0{step.number}
                </span>
              </div>
              
              <div className="mt-2">
                <h4 className="text-[10px] font-bold tracking-wide">{step.title}</h4>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-normal line-clamp-2">
                  {step.desc}
                </p>
              </div>

              {isActive && (
                <div className="absolute inset-0 rounded-lg border border-accent-purple/50 animate-pulse pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
