import React, { useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { audioEngineInstance } from './AudioEngine';

// Format seconds into MM:SS
const formatTime = (sec) => {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  volume,
  isMuted,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onSpeedChange,
  onFullscreen,
  onReset
}) => {
  const progressBarRef = useRef(null);

  // Scrubber drag calculations
  const handleScrub = (e) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(clickX / rect.width, 1));
    onSeek(pct * duration);
    audioEngineInstance.playButtonTap();
  };

  const handleMouseDown = (e) => {
    handleScrub(e);
    const handleMouseMove = (moveEvent) => handleScrub(moveEvent);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const percent = (currentTime / duration) * 100;

  return (
    <div className="flex flex-col gap-3 bg-bg-panel/90 border border-slate-800/80 px-4 py-3 rounded-xl backdrop-blur-md shadow-2xl relative z-20">
      
      {/* Timeline scrubber progress bar */}
      <div 
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        className="w-full h-1.5 bg-slate-800/80 rounded-full cursor-pointer relative flex items-center group"
      >
        {/* Filled part */}
        <div 
          className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
          style={{ width: `${percent}%` }}
        />
        {/* Handle */}
        <div 
          className="absolute w-3.5 h-3.5 rounded-full bg-white border border-accent-purple shadow-lg shadow-accent-purple/40 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${percent}% - 7px)` }}
        />
      </div>

      {/* Playback HUD Control Buttons Row */}
      <div className="flex justify-between items-center text-slate-300 text-xs">
        
        {/* Left Side Group */}
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button 
            onClick={onPlayPause}
            className="p-1.5 rounded-lg hover:bg-slate-850 hover:text-white transition-colors"
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Reset Button */}
          <button 
            onClick={onReset}
            className="p-1.5 rounded-lg hover:bg-slate-850 hover:text-white transition-colors"
            title="Restart Timeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 group">
            <button 
              onClick={onMuteToggle}
              className="p-1.5 rounded-lg hover:bg-slate-850 hover:text-white transition-colors"
              title="Mute (M)"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer custom-slider"
            />
          </div>

          {/* Timecode Indicators */}
          <div className="font-mono text-[10px] text-slate-400 select-none ml-1">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1 text-slate-650">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Side Group */}
        <div className="flex items-center gap-3">
          {/* Speed Selector */}
          <select 
            value={playbackRate} 
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="bg-bg-dark border border-slate-800 text-[10px] rounded px-2 py-1 outline-none text-slate-350 cursor-pointer hover:border-slate-700 transition-colors font-semibold"
          >
            <option value="0.75">0.75x</option>
            <option value="1">1.0x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2.0x</option>
          </select>

          {/* Fullscreen Button */}
          <button 
            onClick={onFullscreen}
            className="p-1.5 rounded-lg hover:bg-slate-850 hover:text-white transition-colors"
            title="Fullscreen (F)"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
