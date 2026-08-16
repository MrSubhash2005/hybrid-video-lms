/**
 * Hybrid Video LMS - Explainer Audio Engine (React Version)
 * Uses Web Audio API to dynamically synthesize ambient sci-fi music,
 * mechanical keyboard typing sounds, and scene transition swooshes.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    
    this.isPlaying = false;
    this.musicTimer = null;
    this.melodyTimer = null;
    this.activeNodes = [];
    
    // Ambient Music Parameters
    this.tempo = 90; // BPM
    this.chordDuration = 6; // seconds per chord
    this.chords = [
      // Eb minor 9: Eb2, Eb3, Bb3, Db4, F4, Gb4
      [77.78, 155.56, 233.08, 277.18, 349.23, 369.99],
      // B major 9: B1, B2, F#3, A#3, C#4, D#4
      [61.74, 123.47, 185.00, 233.08, 277.18, 311.13],
      // Db major 9: Db2, Db3, Ab3, C4, Eb4, F4
      [69.30, 138.59, 207.65, 261.63, 311.13, 349.23],
      // Bb minor 9: Bb1, Bb2, F3, Ab3, C4, Db4
      [58.27, 116.54, 174.61, 207.65, 261.63, 277.18]
    ];
    this.currentChordIndex = 0;
  }

  init() {
    if (this.ctx) return;
    
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    
    // Music Gain
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);
    
    // SFX Gain
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.isPlaying = true;
    
    // Ambient loops
    this.playNextChord();
    this.playGenerativeMelody();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.musicTimer);
    clearTimeout(this.melodyTimer);
    
    // Fade out active nodes
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeNodes.forEach(node => {
      try {
        if (node.gainNode) {
          node.gainNode.gain.cancelScheduledValues(now);
          node.gainNode.gain.linearRampToValueAtTime(0.001, now + 0.5);
          node.oscNodes.forEach(osc => osc.stop(now + 0.6));
        }
      } catch (e) {
        console.error(e);
      }
    });
    this.activeNodes = [];
  }

  setVolume(volume) {
    this.init();
    const val = Math.max(0, Math.min(1, volume));
    this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
  }

  playNextChord() {
    if (!this.isPlaying) return;
    
    const now = this.ctx.currentTime;
    const notes = this.chords[this.currentChordIndex];
    
    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0, now);
    chordGain.gain.linearRampToValueAtTime(0.6, now + 3);
    chordGain.gain.setValueAtTime(0.6, now + this.chordDuration - 2.5);
    chordGain.gain.linearRampToValueAtTime(0.001, now + this.chordDuration);
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 1.0;
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 2.5);
    filter.frequency.exponentialRampToValueAtTime(250, now + this.chordDuration - 1);
    
    chordGain.connect(filter);
    filter.connect(this.musicGain);
    
    const oscNodes = [];
    
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      osc.type = index % 2 === 0 ? 'triangle' : 'sawtooth';
      const detuneAmount = (Math.random() - 0.5) * 8; // chorus
      osc.detune.setValueAtTime(detuneAmount, now);
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(chordGain);
      osc.start(now);
      osc.stop(now + this.chordDuration + 0.5);
      oscNodes.push(osc);
    });
    
    const chordInfo = { gainNode: chordGain, oscNodes: oscNodes };
    this.activeNodes.push(chordInfo);
    
    setTimeout(() => {
      this.activeNodes = this.activeNodes.filter(item => item !== chordInfo);
    }, (this.chordDuration + 1) * 1000);
    
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    
    this.musicTimer = setTimeout(() => {
      this.playNextChord();
    }, (this.chordDuration - 2) * 1000);
  }

  playGenerativeMelody() {
    if (!this.isPlaying) return;
    
    const now = this.ctx.currentTime;
    
    if (Math.random() > 0.4) {
      const chordNotes = this.chords[this.currentChordIndex];
      const baseNote = chordNotes[Math.floor(Math.random() * chordNotes.length)];
      const freq = baseNote * (Math.random() > 0.5 ? 2 : 4);
      
      const synthGain = this.ctx.createGain();
      synthGain.gain.setValueAtTime(0, now);
      synthGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      synthGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      
      const delay = this.ctx.createDelay();
      delay.delayTime.value = 0.3;
      
      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.4;
      
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      osc.connect(synthGain);
      synthGain.connect(this.musicGain);
      
      synthGain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(this.musicGain);
      
      osc.start(now);
      osc.stop(now + 2.0);
    }
    
    this.melodyTimer = setTimeout(() => {
      this.playGenerativeMelody();
    }, 1000 + Math.random() * 1500);
  }

  playTypeClick() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    const pitch = 250 + Math.random() * 80;
    osc.frequency.setValueAtTime(pitch, now);
    
    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.12, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    
    const noiseOsc = this.ctx.createOscillator();
    noiseOsc.type = 'sine';
    noiseOsc.frequency.setValueAtTime(5000 + Math.random() * 2000, now);
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.015, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    
    osc.connect(clickGain);
    noiseOsc.connect(noiseGain);
    
    clickGain.connect(this.sfxGain);
    noiseGain.connect(this.sfxGain);
    
    osc.start(now);
    osc.stop(now + 0.04);
    
    noiseOsc.start(now);
    noiseOsc.stop(now + 0.02);
  }

  playSwoosh() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    const now = this.ctx.currentTime;
    
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 4.0;
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
    filter.frequency.exponentialRampToValueAtTime(80, now + 1.4);
    
    const whooshGain = this.ctx.createGain();
    whooshGain.gain.setValueAtTime(0.001, now);
    whooshGain.gain.linearRampToValueAtTime(0.18, now + 0.5);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    
    noiseNode.connect(filter);
    filter.connect(whooshGain);
    whooshGain.connect(this.sfxGain);
    
    noiseNode.start(now);
    noiseNode.stop(now + 1.5);
  }

  playButtonTap() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    
    const tapGain = this.ctx.createGain();
    tapGain.gain.setValueAtTime(0.15, now);
    tapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(tapGain);
    tapGain.connect(this.sfxGain);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const audioEngineInstance = new AudioEngine();
