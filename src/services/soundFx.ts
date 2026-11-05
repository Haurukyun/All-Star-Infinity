/**
 * Procedural Retro Sound Effects Engine (Web Audio API)
 * 100% offline, zero external audio assets, zero network requests.
 * Handcrafted audio synthesis with Web Audio oscillators and filters.
 */

let isSoundGlobalEnabled = true;

export const setSoundGlobalEnabled = (enabled: boolean) => {
  isSoundGlobalEnabled = enabled;
};

export const getSoundGlobalEnabled = () => isSoundGlobalEnabled;

export const suspendAudio = () => {
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend().catch(() => {});
  }
};

export const resumeAudio = () => {
  if (audioCtx && audioCtx.state === 'suspended' && isSoundGlobalEnabled) {
    audioCtx.resume().catch(() => {});
  }
};

// AudioContext singleton with lazy initialization on user gesture
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
};

export const soundService = {
  /**
   * Snappy subtle click for general button taps and tabs
   */
  click: () => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Resonant swoosh when drawing or flipping a prompt card
   */
  cardFlip: () => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // White noise buffer for whoosh air feel
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(280, now + 0.12);
      filter.Q.setValueAtTime(2.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.12);

      // Subtle warm undertone
      const tone = ctx.createOscillator();
      const toneGain = ctx.createGain();
      tone.type = 'triangle';
      tone.frequency.setValueAtTime(260, now);
      tone.frequency.exponentialRampToValueAtTime(140, now + 0.1);
      toneGain.gain.setValueAtTime(0.06, now);
      toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      tone.connect(toneGain);
      toneGain.connect(ctx.destination);

      tone.start(now);
      tone.stop(now + 0.1);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Tension countdown tick (metronome / clock pulse)
   */
  tick: () => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.02);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Countdown beep for 3-2-1 "Point" or urgency warnings
   */
  countdownStep: (pitchMultiplier = 1.0) => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33 * pitchMultiplier, now); // D5 base

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Harsh party fail buzzer for penalty / chickened out / time expired
   */
  buzzer: () => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Dual detuned sawtooths for raspy party buzzer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(138, now);
      osc1.frequency.exponentialRampToValueAtTime(90, now + 0.38);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(147, now); // slightly detuned
      osc2.frequency.exponentialRampToValueAtTime(95, now + 0.38);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.setValueAtTime(0.14, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.38);
      osc2.stop(now + 0.38);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Ascending cheerful victory chime (Hot Seat success / Answered)
   */
  chime: () => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Arpeggio notes: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.1, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.16);
      });
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Forfeit slide / chicken pass sound
   */
  passSlide: () => {
    if (!isSoundGlobalEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // AudioContext unavailable
    }
  }
};

