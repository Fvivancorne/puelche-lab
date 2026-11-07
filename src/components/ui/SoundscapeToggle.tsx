'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Wind } from 'lucide-react';

class ProceduralPatagonianWind {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  // Generative Ambient Musical Drone (Brian Eno / Active Theory style)
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneLFO: OscillatorNode | null = null;
  private droneLFOGain: GainNode | null = null;
  private chordOscillators: OscillatorNode[] = [];
  private harmonicTimer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    if (!this.ctx) return;

    const ctx = this.ctx;

    // Master Gain with silky 2.5s exponential ramp
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.masterGain.connect(ctx.destination);
    this.masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);

    // =========================================================================
    // 1. CAPA DE VIENTO PUELCHE (Brown noise leaky integrator + resonant sweep)
    // =========================================================================
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      output[i] = lastOut * 2.8;
    }

    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(280, ctx.currentTime);
    this.filterNode.Q.setValueAtTime(2.0, ctx.currentTime);

    this.lfoNode = ctx.createOscillator();
    this.lfoNode.type = 'sine';
    this.lfoNode.frequency.setValueAtTime(0.08, ctx.currentTime);

    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.setValueAtTime(120, ctx.currentTime);

    this.lfoNode.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);

    this.noiseNode.start();
    this.lfoNode.start();

    // =========================================================================
    // 2. MÚSICA GENERATIVA: DRONE AMBIENTAL ETÉREO (F minor 9 / Nordic Ambient)
    // Acordes: Fa (87.31Hz / 174.6Hz), Lab (207.6Hz), Do (261.6Hz), Mib (311.1Hz)
    // =========================================================================
    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 3.0);

    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(450, ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(1.5, ctx.currentTime);

    // LFO lento para respiración del pad armónico (0.05 Hz = 20s ciclo)
    this.droneLFO = ctx.createOscillator();
    this.droneLFO.type = 'sine';
    this.droneLFO.frequency.setValueAtTime(0.05, ctx.currentTime);

    this.droneLFOGain = ctx.createGain();
    this.droneLFOGain.gain.setValueAtTime(180, ctx.currentTime);

    this.droneLFO.connect(this.droneLFOGain);
    this.droneLFOGain.connect(this.droneFilter.frequency);
    this.droneLFO.start();

    // Banco de frecuencias armónicas (Fa minor 9 extendido)
    const chordFrequencies = [
      { freq: 87.31, type: 'sine' as OscillatorType, detune: 0 },    // F2 (Sub fundamental)
      { freq: 130.81, type: 'sine' as OscillatorType, detune: -2 },  // C3 (Quinta)
      { freq: 174.61, type: 'triangle' as OscillatorType, detune: 3 },// F3 (Octava)
      { freq: 207.65, type: 'sine' as OscillatorType, detune: -4 },  // Ab3 (Tercera menor)
      { freq: 261.63, type: 'sine' as OscillatorType, detune: 2 },   // C4 (Quinta)
      { freq: 311.13, type: 'sine' as OscillatorType, detune: -3 },  // Eb4 (Séptima menor)
    ];

    this.chordOscillators = chordFrequencies.map(({ freq, type, detune }) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detune, ctx.currentTime);

      const oscGain = ctx.createGain();
      // Atenuación suave para no saturar
      const relativeGain = freq < 100 ? 0.35 : 0.18;
      oscGain.gain.setValueAtTime(relativeGain, ctx.currentTime);

      osc.connect(oscGain);
      if (this.droneFilter) {
        oscGain.connect(this.droneFilter);
      }
      osc.start();
      return osc;
    });

    if (this.droneFilter && this.droneGain) {
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);
    }

    // =========================================================================
    // 3. ARMÓNICOS DE CRISTAL INTERMITENTES (Generative Crystal Overtones)
    // Pequeños destellos de piano etéreo pentatónico a intervalos orgánicos
    // =========================================================================
    const scheduleCrystalHarmonic = () => {
      if (!this.isRunning || !this.ctx || this.ctx.state !== 'running') return;
      const crystalNotes = [523.25, 622.25, 698.46, 783.99, 932.33]; // C5, Eb5, F5, G5, Bb5
      const note = crystalNotes[Math.floor(Math.random() * crystalNotes.length)];

      try {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, this.ctx.currentTime);

        g.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.012, this.ctx.currentTime + 0.6);
        g.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 3.8);

        osc.connect(g);
        if (this.masterGain) g.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 4.0);
      } catch {
        // Safe execution
      }

      const nextDelay = 4500 + Math.random() * 5000;
      this.harmonicTimer = setTimeout(scheduleCrystalHarmonic, nextDelay);
    };

    this.harmonicTimer = setTimeout(scheduleCrystalHarmonic, 3500);
    this.isRunning = true;
  }

  public stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    if (this.harmonicTimer) {
      clearTimeout(this.harmonicTimer);
      this.harmonicTimer = null;
    }

    const ctx = this.ctx;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.2);

    setTimeout(() => {
      try {
        this.noiseNode?.stop();
        this.noiseNode?.disconnect();
        this.lfoNode?.stop();
        this.lfoNode?.disconnect();
        this.filterNode?.disconnect();

        this.droneLFO?.stop();
        this.droneLFO?.disconnect();
        this.droneLFOGain?.disconnect();
        this.droneFilter?.disconnect();
        this.droneGain?.disconnect();

        this.chordOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Safe cleanup
          }
        });
        this.chordOscillators = [];
        this.masterGain?.disconnect();
      } catch {
        // Safe cleanup
      }
      this.isRunning = false;
    }, 1250);
  }

  public playHapticTick() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(698.46, this.ctx.currentTime); // Fa suave
      osc.frequency.exponentialRampToValueAtTime(174.61, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // safe fallback
    }
  }

  /**
   * Modula la intensidad del viento con la energía del scroll (ráfagas reactivas)
   */
  public setGust(gust: number) {
    if (!this.ctx || !this.filterNode || this.ctx.state !== 'running') return;
    try {
      const t = this.ctx.currentTime;
      const targetFreq = 280 + Math.min(1, Math.max(0, gust)) * 480;
      this.filterNode.frequency.linearRampToValueAtTime(targetFreq, t + 0.08);
    } catch {
      // Safe fallback
    }
  }
}

export function SoundscapeToggle({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const soundEngineRef = useRef<ProceduralPatagonianWind | null>(null);

  useEffect(() => {
    soundEngineRef.current = new ProceduralPatagonianWind();
    return () => {
      soundEngineRef.current?.stop();
    };
  }, []);

  // Modulación reactiva al scroll mientras el audio está encendido
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    const pollEnergy = () => {
      if (typeof window !== 'undefined') {
        const energyModule = (window as any).__puelche_energy;
        const currentGust = energyModule ? energyModule.gust : 0;
        soundEngineRef.current?.setGust(currentGust);
      }
      animId = requestAnimationFrame(pollEnergy);
    };
    animId = requestAnimationFrame(pollEnergy);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const toggleSound = useCallback(() => {
    if (!soundEngineRef.current) return;

    if (isPlaying) {
      soundEngineRef.current.stop();
      setIsPlaying(false);
    } else {
      soundEngineRef.current.start();
      soundEngineRef.current.playHapticTick();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <button
      type="button"
      onClick={toggleSound}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="soundscape-toggle"
      aria-label={isPlaying ? 'Desactivar sonido ambiental' : 'Activar sonido ambiental'}
      className={`relative inline-flex items-center gap-2.5 h-8 px-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 select-none group focus:outline-none focus:ring-1 focus:ring-[#59BFD6]/50 ${
        isPlaying ? 'border-[#59BFD6]/30 bg-white/[0.08]' : ''
      } ${className}`}
    >
      {/* 4 Kinetic Equalizer Soundwave Bars (Awwwards Boutique Standard) */}
      <div className="flex items-center gap-[2.5px] h-3.5 w-3.5 justify-center" aria-hidden="true">
        <span
          className={`w-[1.5px] rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-[#59BFD6] animate-soundwave-1' : 'h-[2px] bg-white/40'
          }`}
        />
        <span
          className={`w-[1.5px] rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-[#59BFD6] animate-soundwave-2' : 'h-[2px] bg-white/40'
          }`}
        />
        <span
          className={`w-[1.5px] rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-[#59BFD6] animate-soundwave-3' : 'h-[2px] bg-white/40'
          }`}
        />
        <span
          className={`w-[1.5px] rounded-full transition-all duration-300 ${
            isPlaying ? 'bg-[#59BFD6] animate-soundwave-4' : 'h-[2px] bg-white/40'
          }`}
        />
      </div>

      {/* Label: Minimalist typographic audio indicator */}
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium text-white/70 group-hover:text-white transition-colors">
        {isPlaying ? (isHovered ? 'MUTE' : 'SOUND') : 'SOUND'}
      </span>

      {/* Micro Status Dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          isPlaying
            ? 'bg-[#59BFD6] shadow-[0_0_8px_#59BFD6] scale-105'
            : 'bg-white/20 group-hover:bg-white/40'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
