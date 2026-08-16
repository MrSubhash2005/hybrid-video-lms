import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { voiceoverInstance } from './Voiceover';

export const Avatar = ({ isPlaying, voiceoverEnabled }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthHeight, setMouthHeight] = useState(3);
  const [mouthWidth, setMouthWidth] = useState(16);
  const [expression, setExpression] = useState('idle'); // idle, speaking, smiling

  // Periodic blinking simulation
  useEffect(() => {
    let blinkTimer;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextDelay = 2500 + Math.random() * 3000;
      blinkTimer = setTimeout(triggerBlink, nextDelay);
    };
    blinkTimer = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(blinkTimer);
  }, []);

  // Hook into SpeechSynthesis word boundary events for live lip sync
  useEffect(() => {
    voiceoverInstance.onWordSpoken = (charIndex, word) => {
      if (isPlaying && voiceoverEnabled) {
        setExpression('speaking');
        
        // Compute shape based on word characteristics
        const length = word.length;
        const targetHeight = Math.min(22, 6 + length * 2.2);
        const targetWidth = Math.min(28, 14 + (length % 3) * 4);
        
        setMouthHeight(targetHeight);
        setMouthWidth(targetWidth);
        
        // Reset mouth back to resting state
        const decayMs = 90 + Math.random() * 100;
        setTimeout(() => {
          setMouthHeight(3);
          setMouthWidth(16);
          setExpression('idle');
        }, decayMs);
      }
    };

    return () => {
      voiceoverInstance.onWordSpoken = null;
    };
  }, [isPlaying, voiceoverEnabled]);

  // Subtle breathing idle motion for the avatar head
  const headBob = {
    animate: {
      y: [0, -3, 0],
      rotate: [0, -0.8, 0.8, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute bottom-16 right-4 w-32 h-36 rounded-2xl glass-panel border border-slate-800/80 bg-slate-950/70 p-2.5 flex flex-col items-center justify-between shadow-xl shadow-accent-purple/10 select-none z-30 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-10 w-20 h-20 bg-accent-purple/20 rounded-full blur-xl animate-pulse" />
      
      {/* Header Badge */}
      <div className="flex items-center gap-1 bg-[#05070d]/90 px-2 py-0.5 rounded-full border border-slate-900 z-10">
        <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && voiceoverEnabled ? 'bg-green-500 animate-ping' : 'bg-slate-500'}`} />
        <span className="text-[7.5px] uppercase font-mono tracking-wider text-slate-400">AI INSTRUCTOR</span>
      </div>

      {/* Main Avatar SVG Face Canvas */}
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        variants={headBob}
        animate="animate"
        className="w-20 h-20 drop-shadow-glow"
      >
        <defs>
          <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e183a" />
            <stop offset="100%" stopColor="#0a0b12" />
          </radialGradient>
          <linearGradient id="cyberBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Outer Halo */}
        <circle cx="50" cy="50" r="45" fill="url(#faceGlow)" stroke="url(#cyberBorder)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="3 3" />

        {/* Stylized hair/helmet plate */}
        <path d="M 18,40 Q 50,15 82,40 Q 50,30 18,40" fill="#2d1f5e" fillOpacity="0.8" />

        {/* Eyes & Eyelids */}
        {/* Left Eye */}
        <g transform="translate(32, 45)">
          <circle cx="0" cy="0" r="4" fill="#06b6d4" />
          <circle cx="-1" cy="-1" r="1.2" fill="#ffffff" />
          {/* Eyelid (Blink Animation) */}
          <motion.rect
            x="-6"
            y="-6"
            width="12"
            height={isBlinking ? 12 : 0}
            fill="#a78bfa"
            className="origin-top"
          />
        </g>

        {/* Right Eye */}
        <g transform="translate(68, 45)">
          <circle cx="0" cy="0" r="4" fill="#06b6d4" />
          <circle cx="-1" cy="-1" r="1.2" fill="#ffffff" />
          {/* Eyelid (Blink Animation) */}
          <motion.rect
            x="-6"
            y="-6"
            width="12"
            height={isBlinking ? 12 : 0}
            fill="#a78bfa"
            className="origin-top"
          />
        </g>

        {/* Cyber face markings */}
        <line x1="50" y1="35" x2="50" y2="48" stroke="#a78bfa" strokeWidth="0.75" strokeOpacity="0.4" />
        <line x1="28" y1="52" x2="36" y2="52" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.3" />
        <line x1="64" y1="52" x2="72" y2="52" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.3" />

        {/* Mouth (Dynamic scaling height/width for lip sync) */}
        <motion.ellipse
          cx="50"
          cy="64"
          rx={mouthWidth / 2}
          ry={mouthHeight / 2}
          fill="#110a24"
          stroke="#a78bfa"
          strokeWidth="1.5"
          animate={{
            ry: mouthHeight / 2,
            rx: mouthWidth / 2
          }}
          transition={{ type: "tween", duration: 0.05 }}
        />
        
        {/* Tongue / inner mouth highlight when speaking */}
        {expression === 'speaking' && (
          <ellipse
            cx="50"
            cy={64 + mouthHeight / 4}
            rx={mouthWidth / 3}
            ry={mouthHeight / 5}
            fill="#f472b6"
            opacity="0.75"
          />
        )}
      </motion.svg>

      {/* Footer Info overlay */}
      <div className="text-[7px] text-slate-500 font-mono text-center tracking-wider z-10 w-full truncate border-t border-slate-900/60 pt-1 flex justify-between px-1">
        <span>MODE: {voiceoverEnabled ? 'VOICE' : 'MUTED'}</span>
        <span className="text-accent-cyan animate-pulse">{expression === 'speaking' ? 'TALKING' : 'IDLE'}</span>
      </div>
    </div>
  );
};
