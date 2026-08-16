class VoiceoverManager {
  constructor() {
    this.utterance = null;
    this.voiceoverEnabled = true;
    this.playbackRate = 1.0;
    this.onWordSpoken = null; // Callback when a word is reached
  }

  setParams(enabled, rate) {
    this.voiceoverEnabled = enabled;
    this.playbackRate = rate;
    if (!enabled) {
      window.speechSynthesis.cancel();
    }
  }

  speak(text, onEndCallback) {
    if (!this.voiceoverEnabled) {
      if (onEndCallback) onEndCallback();
      return;
    }
    
    // Cancel active speech
    window.speechSynthesis.cancel();
    
    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Find natural voice
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.lang.includes("en-US") && v.name.toLowerCase().includes("natural")) ||
                          voices.find(v => v.lang.includes("en-US") && v.name.toLowerCase().includes("google")) ||
                          voices.find(v => v.lang.includes("en-US")) ||
                          voices.find(v => v.lang.startsWith("en"));
    
    if (selectedVoice) {
      this.utterance.voice = selectedVoice;
    }
    
    this.utterance.rate = this.playbackRate * 0.95;
    this.utterance.pitch = 0.95; // cinematic voice
    
    this.utterance.onend = () => {
      if (onEndCallback) onEndCallback();
    };
    
    this.utterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        console.warn("SpeechSynthesis error:", e);
      }
      if (onEndCallback) onEndCallback();
    };
    
    this.utterance.onboundary = (event) => {
      if (event.name === 'word') {
        if (this.onWordSpoken) {
          const wordText = text.slice(event.charIndex).split(/\s+/)[0];
          this.onWordSpoken(event.charIndex, wordText);
        }
      }
    };
    
    window.speechSynthesis.speak(this.utterance);
  }

  pause() {
    if (this.voiceoverEnabled) {
      window.speechSynthesis.pause();
    }
  }

  resume() {
    if (this.voiceoverEnabled) {
      window.speechSynthesis.resume();
    }
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}

export const voiceoverInstance = new VoiceoverManager();
