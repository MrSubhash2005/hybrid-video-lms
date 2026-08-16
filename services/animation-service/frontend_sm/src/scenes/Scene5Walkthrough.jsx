import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { audioEngineInstance } from '../components/AudioEngine';

const codeToType = `import React from 'react';
import { motion } from 'framer-motion';

export const CourseCard = ({ title, desc }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="course-card"
    >
      <div className="card-title">{title}</div>
      <p>{desc}</p>
    </motion.div>
  );
};`;

const highlightJSXLine = (line) => {
  if (!line) return '';
  return line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\b(import|from|const|export|return)\b/g, '<span class="code-keyword">$1</span>')
    .replace(/\b(React|CourseCard|title|desc|motion)\b/g, '<span class="code-attr">$1</span>')
    .replace(/(className|whileHover|initial|animate)/g, '<span class="code-attr">$1</span>')
    .replace(/('react'|'framer-motion'|"course-card"|"card-title")/g, '<span class="code-string">$1</span>');
};

export const Scene5Walkthrough = ({ sceneProgress, sectionIndex, isPlaying }) => {
  const lastCharRef = useRef(0);

  // Hook variables declared unconditionally at the top
  const totalChars = codeToType.length;
  const typingProgress = sectionIndex === 2 ? Math.min(1, sceneProgress / 0.8) : 1;
  const charsToType = Math.floor(typingProgress * totalChars);

  // Play keyboard sounds unconditionally
  useEffect(() => {
    if (isPlaying && sectionIndex === 2 && charsToType > lastCharRef.current && charsToType < totalChars) {
      if (Math.random() > 0.4) {
        audioEngineInstance.playTypeClick();
      }
    }
    lastCharRef.current = charsToType;
  }, [charsToType, isPlaying, totalChars, sectionIndex]);

  // Early returns are safe now because all hooks have executed
  // Section 1: Overview
  if (sectionIndex === 1) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0a0d16] p-6 justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl border border-slate-800/80 max-w-sm shadow-xl"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold bg-accent-cyan/20 text-accent-cyan px-2.5 py-1 rounded-full border border-accent-cyan/30 mb-3 inline-block">
            Phase 4: Walkthrough
          </span>
          <h3 className="text-lg font-bold text-white mb-2">Coding UI Transitions</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Writing declarative motion wrappers and spring presets to establish natural physical screen interactions.
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
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0a0d16] p-6 justify-center items-center">
        <div className="w-full max-w-lg grid grid-cols-2 gap-4">
          <div className="border border-red-500/20 bg-red-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Legacy Pitfall</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Setting spring stiffness too high, causing cards to bounce excessively and wobble on hover, creating visual noise.
            </p>
          </div>
          <div className="border border-green-500/20 bg-green-950/10 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Best Practice</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Designing well-damped spring curves (stiffness: 300, damping: 20) for smooth, subtle tactile feedback.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Section 6: Quiz
  if (sectionIndex === 6) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0a0d16] p-6 justify-center items-center">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 max-w-md w-full shadow-2xl">
          <span className="text-[9px] uppercase tracking-wider font-mono text-accent-cyan">Self-Assessment Quiz</span>
          <h4 className="text-xs font-bold text-white mt-1.5 mb-3 leading-snug">
            Question: What is the primary purpose of the AnimatePresence wrapper in Framer Motion?
          </h4>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded border border-green-500/30 bg-green-950/20 text-[10px] text-green-300 font-semibold flex justify-between items-center">
              <span>A) To allow components to animate before they are unmounted from the DOM</span>
              <span>✅ Correct</span>
            </div>
            <div className="p-2.5 rounded border border-slate-900 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between items-center">
              <span>B) To compile Tailwind utility styles into static CSS sheets</span>
              <span>❌</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typedCode = codeToType.substring(0, charsToType);
  const codeLines = typedCode.split('\n');

  const formattedLines = [];
  for (let i = 0; i < 16; i++) {
    formattedLines.push(codeLines[i] || '');
  }

  // Browser render states
  const showCard1 = sectionIndex >= 3 || (sectionIndex === 2 && sceneProgress >= 0.3);
  const showCard2 = sectionIndex >= 3 || (sectionIndex === 2 && sceneProgress >= 0.6);
  const hoverCard1 = sectionIndex === 3;
  const navigateToDetails = sectionIndex === 4;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-bg-dark to-[#0a0d16] p-4 justify-center relative overflow-hidden">
      
      <div className="mb-3">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-accent-cyan uppercase">Walkthrough</span>
        <h2 className="text-lg font-bold text-white leading-tight">Implementation Walkthrough</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 h-76 min-h-0 items-stretch">
        
        {/* Left Side: VS Code Editor Panel */}
        <div className="glass-panel rounded-lg border border-slate-800/80 overflow-hidden flex flex-col bg-[#080d16]">
          <div className="flex justify-between items-center bg-[#05080e] px-3 py-1.5 border-b border-slate-850">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <span>⚛️</span> CourseCard.jsx
            </span>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">JS</span>
          </div>

          <div className="p-3 font-mono text-[10px] text-slate-300 leading-relaxed overflow-y-auto flex-1 bg-[#05080e]/50">
            {formattedLines.map((line, idx) => {
              const isCurrentLine = idx === codeLines.length - 1 && charsToType < totalChars;
              return (
                <div key={idx} className="flex">
                  <span className="w-5 text-slate-600 text-right pr-2 select-none">{idx + 1}</span>
                  <span className="flex-1 whitespace-pre">
                    <span dangerouslySetInnerHTML={{ __html: highlightJSXLine(line) }} />
                    {isCurrentLine && <span className="typing-cursor" />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Web Browser Preview Frame */}
        <div className="glass-panel rounded-lg border border-slate-800/80 overflow-hidden flex flex-col bg-[#070b12]">
          <div className="flex items-center gap-2 bg-[#05070c] px-3 py-1.5 border-b border-slate-850">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-700" />
            </div>
            <div className="flex-1 bg-slate-900/60 rounded px-2 py-0.5 text-[9px] font-mono text-slate-400 flex items-center gap-1.5 border border-slate-850/40">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              <span>
                {navigateToDetails ? 'localhost:5173/course/react-ui' : 'localhost:5173/dashboard'}
              </span>
            </div>
          </div>

          {/* Browser Render Body */}
          <div className="p-3 flex-1 overflow-hidden relative text-slate-200 text-[10px] bg-[#090e18]">
            <AnimatePresence mode="wait">
              {navigateToDetails ? (
                // Details Screen View
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-2 h-full justify-center"
                >
                  <span className="text-[8px] font-semibold text-accent-cyan cursor-pointer">← Back to Dashboard</span>
                  <h3 className="text-xs font-bold text-white">Advanced React UI</h3>
                  <div className="w-full h-24 bg-slate-900 border border-slate-800/80 rounded-lg flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5" />
                    <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white cursor-pointer shadow-lg shadow-accent-blue/30 relative z-10 hover:scale-105 transition-transform">
                      ▶
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Master the design principles of glassmorphic systems and interactive Framer Motion animations.
                  </p>
                </motion.div>
              ) : (
                // Dashboard View
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-2 h-full"
                >
                  {/* Local Nav */}
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-900">
                    <span className="font-bold text-[10px] text-accent-cyan">Hybrid LMS</span>
                    <div className="w-4 h-4 rounded-full bg-accent-purple" />
                  </div>
                  <div className="text-[9px] font-semibold text-slate-300">My Courses</div>

                  {/* Dynamic Cards Container */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {showCard1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          scale: hoverCard1 ? 1.05 : 1,
                          y: hoverCard1 ? -4 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`p-2 rounded-lg border bg-slate-900/60 transition-colors duration-300 ${hoverCard1 ? 'border-accent-blue shadow-glow-blue' : 'border-slate-800/80'}`}
                      >
                        <div className="w-full h-10 rounded bg-gradient-to-br from-accent-blue/20 to-accent-purple/10 mb-1.5" />
                        <h4 className="font-bold text-[9px] text-slate-200">Advanced React UI</h4>
                        <div className="flex justify-between text-[7px] text-slate-500 mt-1">
                          <span>4.8 ★</span>
                          <span>12h</span>
                        </div>
                      </motion.div>
                    )}

                    {showCard2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2 rounded-lg border border-slate-800/80 bg-slate-900/60"
                      >
                        <div className="w-full h-10 rounded bg-gradient-to-br from-accent-purple/20 to-accent-cyan/10 mb-1.5" />
                        <h4 className="font-bold text-[9px] text-slate-200">Motion Design</h4>
                        <div className="flex justify-between text-[7px] text-slate-500 mt-1">
                          <span>4.9 ★</span>
                          <span>8h</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Floating highlights indicator overlay */}
      <AnimatePresence>
        {sectionIndex === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-6 px-3 py-1.5 rounded-full bg-accent-blue/80 border border-accent-blue text-white font-medium text-[9px] shadow-lg backdrop-blur z-30"
          >
            💻 Writing Framer Motion Declarations
          </motion.div>
        )}
        {sectionIndex === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-6 px-3 py-1.5 rounded-full bg-accent-purple/80 border border-accent-purple text-white font-medium text-[9px] shadow-lg backdrop-blur z-30"
          >
            ✨ Live Browser Compilation Loop
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
