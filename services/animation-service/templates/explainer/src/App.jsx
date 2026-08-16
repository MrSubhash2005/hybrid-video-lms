import React, { useState, useEffect, useRef } from 'react';
import { getTimelineData } from './components/Chapters';
import { VisualScenes } from './components/VisualScenes';
import { VideoControls } from './components/VideoControls';
import { audioEngineInstance } from './components/AudioEngine';
import { voiceoverInstance } from './components/Voiceover';
import { Avatar } from './components/Avatar';
import { ListCollapse, Play } from 'lucide-react';
import { TARGET_VIDEO_DURATION } from './config';

// Format seconds into cinematic timecode HH:MM:SS:FF (60fps)
const formatTimecode = (sec) => {
  const hrs = Math.floor(sec / 3600).toString().padStart(2, "0");
  const mins = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
  const secs = Math.floor(sec % 60).toString().padStart(2, "0");
  const frames = Math.floor((sec % 1) * 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}:${frames}`;
};

export default function App() {
  // Read target duration from central config file as default
  const defaultMode = TARGET_VIDEO_DURATION <= 10 ? 'documentary' : 'educational';
  const [mode, setMode] = useState(defaultMode);
  const [timelineData, setTimelineData] = useState(() => getTimelineData(TARGET_VIDEO_DURATION));
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceoverEnabled, setVoiceoverEnabled] = useState(true);
  const [showChapters, setShowChapters] = useState(true);

  const { chapters, script, totalDuration } = timelineData;

  const requestRef = useRef(null);
  const lastTimeRef = useRef(0);
  const subtitleTextRef = useRef('');
  const lastSceneRef = useRef(0);
  const viewportRef = useRef(null);

  // Sync mode changes and load new script
  useEffect(() => {
    const duration = mode === 'documentary' ? 8 : 15;
    const data = getTimelineData(duration);
    setTimelineData(data);
    setCurrentTime(0);
    setIsPlaying(false);
    subtitleTextRef.current = '';
    voiceoverInstance.stop();
  }, [mode]);

  // Sync voiceover params when states update
  useEffect(() => {
    voiceoverInstance.setParams(voiceoverEnabled, playbackRate);
  }, [voiceoverEnabled, playbackRate]);

  // Sync volume with audioEngine
  useEffect(() => {
    const targetVolume = isMuted ? 0 : volume;
    audioEngineInstance.setVolume(targetVolume);
  }, [volume, isMuted]);

  // Main playback tick loop using requestAnimationFrame for perfect sub-second rendering
  const animateTimeline = (timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsedSec = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setCurrentTime((prevTime) => {
      const nextTime = prevTime + elapsedSec * playbackRate;
      
      if (nextTime >= totalDuration) {
        setIsPlaying(false);
        audioEngineInstance.stop();
        voiceoverInstance.stop();
        return 0;
      }

      // Voiceover Sync-Lock:
      // If voiceover is enabled and speaking, do not let the timeline cross the boundary
      // of the current script statement. Wait for SpeechSynthesis to finish.
      if (voiceoverEnabled) {
        const currentStatement = script.find(s => prevTime >= s.start && prevTime < s.end);
        if (currentStatement && nextTime >= currentStatement.end - 0.08) {
          if (window.speechSynthesis.speaking) {
            return currentStatement.end - 0.08; // lock progress
          }
        }
      }

      return nextTime;
    });

    requestRef.current = requestAnimationFrame(animateTimeline);
  };

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animateTimeline);
      audioEngineInstance.start();
      voiceoverInstance.resume();
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      audioEngineInstance.stop();
      voiceoverInstance.pause();
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playbackRate, voiceoverEnabled, timelineData]);

  // Synchronize Subtitles and Swoosh audio transitions on current time ticks
  const currentStatement = script.find(s => currentTime >= s.start && currentTime < s.end) || script[0];
  const activeSceneNum = currentStatement ? currentStatement.scene : 1;
  const activeCamera = currentStatement ? currentStatement.camera : 'camera-normal';
  const subtitleText = currentStatement ? currentStatement.text : '';
  const activeChapter = chapters.find(ch => ch.number === activeSceneNum) || chapters[0];
  const activeSectionIndex = currentStatement ? currentStatement.sectionIndex : 1;

  // Trigger voiceover speech when subtitle changes
  useEffect(() => {
    if (isPlaying && subtitleText && subtitleText !== subtitleTextRef.current) {
      subtitleTextRef.current = subtitleText;
      
      voiceoverInstance.speak(subtitleText, () => {
        // Gapless auto-advance callback when speech ends
        if (isPlaying && voiceoverEnabled) {
          const finishedStatement = script.find(s => s.text === subtitleText);
          if (finishedStatement) {
            setCurrentTime(prevTime => {
              if (prevTime < finishedStatement.end) {
                return finishedStatement.end;
              }
              return prevTime;
            });
          }
        }
      });
    }
  }, [subtitleText, isPlaying, voiceoverEnabled, script]);

  // Trigger swoosh when scene transitions
  useEffect(() => {
    if (isPlaying && activeSceneNum !== lastSceneRef.current) {
      if (lastSceneRef.current !== 0) {
        audioEngineInstance.playSwoosh();
      }
      lastSceneRef.current = activeSceneNum;
    }
  }, [activeSceneNum, isPlaying]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === 'KeyM') {
        handleMuteToggle();
      } else if (e.code === 'KeyF') {
        handleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isMuted, volume]);

  const handlePlayPause = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    audioEngineInstance.playButtonTap();
    if (nextPlaying) {
      voiceoverInstance.resume();
    } else {
      voiceoverInstance.pause();
    }
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
    subtitleTextRef.current = ''; // force reload subtitles voiceover
    voiceoverInstance.stop();
    
    if (isPlaying) {
      const targetStatement = script.find(s => time >= s.start && time < s.end);
      if (targetStatement) {
        subtitleTextRef.current = targetStatement.text;
        voiceoverInstance.speak(targetStatement.text, () => {
          if (isPlaying && voiceoverEnabled) {
            setCurrentTime(prevTime => {
              if (prevTime < targetStatement.end) {
                return targetStatement.end;
              }
              return prevTime;
            });
          }
        });
      }
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(prev => !prev);
    audioEngineInstance.playButtonTap();
  };

  const handleVolumeChange = (val) => {
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const handleSpeedChange = (val) => {
    setPlaybackRate(val);
    audioEngineInstance.playButtonTap();
  };

  const handleFullscreen = () => {
    audioEngineInstance.playButtonTap();
    if (!document.fullscreenElement) {
      viewportRef.current.requestFullscreen().catch(err => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleReset = () => {
    handleSeek(0);
    audioEngineInstance.playButtonTap();
  };

  const handleChapterClick = (startSec) => {
    handleSeek(startSec);
  };

  return (
    <main className="min-h-screen w-screen bg-[#06080f] flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-6xl flex flex-col gap-4">
        
        {/* Player Header bar */}
        <header className="flex justify-between items-center bg-bg-panel/40 border border-slate-900 px-4 py-2.5 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#06080f] bg-accent-cyan px-2.5 py-0.5 rounded shadow-lg shadow-accent-cyan/15">
              4K UHD
            </span>
            <h1 className="text-sm font-bold tracking-wide text-white">
              Developer Documentary: Hybrid Video LMS — Issue #10
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Dynamic Script Mode Selector */}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="bg-[#0f1220] border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent-purple transition-all font-semibold cursor-pointer"
            >
              <option value="documentary">8-Min Cinematic Documentary</option>
              <option value="educational">15-Min Educational Masterclass</option>
            </select>

            <button
              onClick={() => {
                setVoiceoverEnabled(!voiceoverEnabled);
                audioEngineInstance.playButtonTap();
              }}
              className={`text-[10px] font-semibold tracking-wide px-3 py-1.5 rounded-full border transition-all duration-300 ${
                voiceoverEnabled 
                  ? 'bg-accent-purple/20 border-accent-purple text-accent-purple shadow-glow-purple/20' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-500'
              }`}
            >
              🎤 Voiceover Narration
            </button>

            <button
              onClick={() => {
                setShowChapters(!showChapters);
                audioEngineInstance.playButtonTap();
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                showChapters ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-900/50 border-slate-800 text-slate-500'
              }`}
              title="Toggle Chapters Sidebar"
            >
              <ListCollapse className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Core Screen Section (Viewport + Chapter selection sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
          
          {/* Video Viewport Canvas */}
          <div 
            ref={viewportRef}
            className="lg:col-span-3 aspect-video glass-panel rounded-2xl border border-slate-900 overflow-hidden relative shadow-2xl flex flex-col justify-between group"
          >
            {/* Watermark overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[9px] tracking-widest font-semibold text-slate-500 bg-[#05070c]/60 px-2.5 py-1 rounded backdrop-blur z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>HYBRID VIDEO LMS // DOCUMENTARY</span>
            </div>

            {/* Timecode overlay */}
            <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wide text-slate-400 bg-[#05070c]/60 px-2.5 py-1 rounded backdrop-blur z-20">
              {formatTimecode(currentTime)}
            </div>

            {/* Play Overlay Button */}
            {!isPlaying && currentTime === 0 && (
              <div 
                onClick={handlePlayPause}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col gap-3 items-center justify-center cursor-pointer z-30 transition-all duration-300 hover:bg-black/50"
              >
                <div className="w-14 h-14 rounded-full bg-accent-purple/80 hover:bg-accent-purple flex items-center justify-center text-white shadow-xl shadow-accent-purple/20 transition-all hover:scale-105">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="text-[10px] tracking-[0.3em] font-semibold text-slate-300 uppercase">Click to play presentation</span>
              </div>
            )}

            {/* Actual Animated Vector Graphic Canvas */}
            <div className={`flex-1 overflow-hidden camera-container relative ${activeCamera}`}>
              <VisualScenes 
                currentScene={activeSceneNum} 
                currentTime={currentTime} 
                activeChapter={activeChapter}
                activeSectionIndex={activeSectionIndex}
                isPlaying={isPlaying}
              />
              
              {/* Interactive Vector Avatar / Lip Sync Talking Head */}
              <Avatar isPlaying={isPlaying} voiceoverEnabled={voiceoverEnabled} />
            </div>

            {/* Subtitles Overlay */}
            <div className="p-4 bg-gradient-to-t from-black/85 via-black/65 to-transparent pt-12 flex justify-center text-center relative z-20 select-text">
              <span 
                key={subtitleText} 
                className="max-w-xl text-xs md:text-sm font-medium text-slate-100 subtitle-animate leading-relaxed drop-shadow-md min-h-[40px]"
              >
                {subtitleText || "Click Play to begin the engineering walkthrough."}
              </span>
            </div>
          </div>

          {/* Chapters Sidebar */}
          {showChapters && (
            <aside className="glass-panel border border-slate-900 rounded-2xl p-4 flex flex-col justify-start h-auto lg:h-full max-h-[480px] lg:max-h-none overflow-y-auto">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-850 pb-2 flex justify-between items-center">
                <span>Chapters</span>
                <span className="text-[9px] font-mono lowercase text-slate-550">{chapters.length} chapters</span>
              </h3>
              
              <div className="flex flex-col gap-1.5 flex-1">
                {chapters.map((ch) => {
                  const isActive = activeSceneNum === ch.number;
                  const isPast = activeSceneNum > ch.number;
                  
                  // Format time coordinates dynamically for visual display
                  const m = Math.floor(ch.start / 60);
                  const s = Math.floor(ch.start % 60).toString().padStart(2, '0');
                  
                  return (
                    <div
                      key={ch.number}
                      onClick={() => handleChapterClick(ch.start)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        isActive 
                          ? 'border-accent-purple/50 bg-accent-purple/10 text-white font-semibold' 
                          : isPast
                            ? 'border-slate-850 bg-slate-950/20 text-slate-400'
                            : 'border-transparent text-slate-500 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex flex-col max-w-[80%]">
                        <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Chapter 0{ch.number}</span>
                        <span className="text-[10px] tracking-wide truncate mt-0.5">{ch.title}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">
                        {m}:{s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </aside>
          )}

        </div>

        {/* Video Control Bar HUD */}
        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={totalDuration}
          playbackRate={playbackRate}
          volume={volume}
          isMuted={isMuted}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onSpeedChange={handleSpeedChange}
          onFullscreen={handleFullscreen}
          onReset={handleReset}
        />

      </div>
    </main>
  );
}
