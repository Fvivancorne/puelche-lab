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

    // Master Gain (Smooth fade in)
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.masterGain.connect(ctx.destination);
    this.masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.5); // Subtle, non-intrusive volume

    // Generate 4-second Brown/Pink noise buffer
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration (leaky integrator)
      lastOut = (lastOut + 0.02 * white) / 1.02;
      output[i] = lastOut * 3.5;
    }

    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Lowpass filter sculpted to sound like distant Patagonian wind
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, ctx.currentTime);
    this.filterNode.Q.setValueAtTime(2.5, ctx.currentTime);

    // LFO to create natural wind gust oscillations (0.12 Hz)
    this.lfoNode = ctx.createOscillator();
    this.lfoNode.type = 'sine';
    this.lfoNode.frequency.setValueAtTime(0.12, ctx.currentTime);

    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.setValueAtTime(140, ctx.currentTime); // modulate frequency by +/- 140 Hz

    this.lfoNode.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    // Connect noise -> filter -> master -> destination
    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);

    this.noiseNode.start();
    this.lfoNode.start();
    this.isRunning = true;
  }

  public stop() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.8);

    setTimeout(() => {
      try {
        this.noiseNode?.stop();
        this.noiseNode?.disconnect();
        this.lfoNode?.stop();
        this.lfoNode?.disconnect();
        this.filterNode?.disconnect();
        this.masterGain?.disconnect();
      } catch {
        // cleanup safe
      }
      this.isRunning = false;
    }, 850);
  }

  public playHapticTick() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // safe fallback
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
