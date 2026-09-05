// Web Audio and Indonesian Speech Synthesis Utilities

class AudioManager {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public speechEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Soft cheerful pop sound for button clicks
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  // Ding / correct answer chime
  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch {}
  }

  // Joyful star award sound
  playStar() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [587.33, 739.99, 880, 1046.5];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.15, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.09 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.28);
      });
    } catch {}
  }

  // Fanfare celebration sound for level completion and certificate
  playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const chords = [
        { freqs: [523.25, 659.25, 783.99], time: 0, dur: 0.18 },
        { freqs: [523.25, 659.25, 783.99], time: 0.2, dur: 0.18 },
        { freqs: [523.25, 659.25, 783.99], time: 0.4, dur: 0.18 },
        { freqs: [659.25, 783.99, 1046.5], time: 0.65, dur: 0.55 },
      ];
      const now = ctx.currentTime;
      chords.forEach(({ freqs, time, dur }) => {
        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + time);
          gain.gain.setValueAtTime(0.12, now + time);
          gain.gain.exponentialRampToValueAtTime(0.01, now + time + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + time);
          osc.stop(now + time + dur);
        });
      });
    } catch {}
  }

  // Speak Indonesian text aloud with child-friendly pace
  speak(text: string, rate: number = 0.85) {
    if (!this.speechEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop prior speech

      // Clean punctuation for crisp phonics if needed
      const cleanText = text.replace(/[\/\*\_]/g, ' ').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = rate; // slightly slower for children
      utterance.pitch = 1.15; // slightly friendly child-like pitch

      // Try to find an Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(
        (v) => v.lang === 'id-ID' || v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia')
      );
      if (idVoice) {
        utterance.voice = idVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundFx = new AudioManager();
