'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cortinillas Horizontales de Obturador de Medio Formato
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);

  // Diafragma y Anillo Óptico de Cámara
  const lensDiaphragmRef = useRef<HTMLDivElement>(null);
  const lensInnerRingRef = useRef<HTMLDivElement>(null);

  // Destello Estroboscópico de Exposición
  const flashOverlayRef = useRef<HTMLDivElement>(null);

  // Textos Editoriales & Sello de Autor
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const introPhaseRef = useRef<HTMLDivElement>(null);
  const lockPillRef = useRef<HTMLDivElement>(null);
  const skipTimelineRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Skip if already viewed in this tab or if the user requests reduced motion.
    if (
      typeof window !== 'undefined' &&
      (sessionStorage.getItem('puelche-loaded') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      setDone(true);
      return;
    }

    // Pause Lenis virtual scroll while curtain plays
    const lenis = (window as any).lenisInstance;
    if (lenis) lenis.stop();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isCleanedUp = false;

    // Retina / High-DPI display calibration
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Official logo asset
    const img = new window.Image();
    img.src = '/images/real/logo-puelche.png';

    // Grid of tiles for wind assembly
    const COLS = 10;
    const ROWS = 7;
    interface Tile {
      sx: number;
      sy: number;
      sw: number;
      sh: number;
      tx: number;
      ty: number;
      startX: number;
      startY: number;
      startRot: number;
      expX: number;
      expY: number;
      expRot: number;
      delay: number;
    }

    const tiles: Tile[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const windDist = 350 + Math.random() * 450;
        const windAngle = -0.6 + (Math.random() - 0.5) * 0.6;

        tiles.push({
          sx: (c * 412) / COLS,
          sy: (r * 282) / ROWS,
          sw: 412 / COLS,
          sh: 282 / ROWS,
          tx: (c + 0.5) / COLS - 0.5,
          ty: (r + 0.5) / ROWS - 0.5,
          startX: Math.cos(windAngle) * windDist + (Math.random() - 0.5) * 120,
          startY: Math.sin(windAngle) * windDist + (Math.random() - 0.5) * 120,
          startRot: (Math.random() - 0.5) * 1.5,
          expX: (Math.random() * 500 + 150) * (Math.random() > 0.25 ? 1 : -0.5),
          expY: -Math.random() * 400 - 150,
          expRot: (Math.random() - 0.5) * 3,
          delay: Math.random() * 0.12,
        });
      }
    }

    // Ambient Wind Streams
    interface WindParticle {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
    }
    const windStreams: WindParticle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 3 + 1.8,
      alpha: Math.random() * 0.25 + 0.05,
    }));

    // Animation reactive state
    const state = {
      assemble: 0,
      solidCrossfade: 0,
      flash: 0,
      breathe: 1,
      cyanGlow: 0,
      explode: 0,
      opacity: 0,
      lensFocus: 14, // Blur de foco analógico en px (bokeh a nítido)
    };

    // Render loop
    const render = () => {
      if (isCleanedUp) return;

      const w = canvas.width;
      const h = canvas.height;
      const midX = w / 2;
      const midY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw ambient wind streams
      if (state.opacity > 0.05) {
        ctx.save();
        ctx.strokeStyle = '#59BFD6';
        ctx.lineWidth = 1 * dpr;
        for (const p of windStreams) {
          p.x -= p.speed * dpr * 2.5;
          p.y += p.speed * dpr * 1.4;
          if (p.x < -100) p.x = w + 100;
          if (p.y > h + 100) p.y = -100;

          ctx.beginPath();
          ctx.globalAlpha = p.alpha * state.opacity * 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.len * 0.85, p.y - p.len * 0.45);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Draw Logo: Assembly & Solid Crossfade with Analog Lens Focus
      ctx.save();
      ctx.translate(midX, midY);
      ctx.scale(state.breathe, state.breathe);

      const targetW = Math.min(window.innerWidth * 0.75, 340) * dpr;
      const targetH = (targetW * 282) / 412;

      // Soft focus filter simulation on canvas
      if (state.lensFocus > 0.5) {
        ctx.filter = `blur(${state.lensFocus * dpr}px)`;
      } else {
        ctx.filter = 'none';
      }

      if (img.complete && img.naturalWidth > 0 && state.opacity > 0) {
        // Cyan ethereal backlight
        if (state.cyanGlow > 0.05) {
          ctx.save();
          ctx.globalAlpha = state.cyanGlow * 0.35 * state.opacity;
          ctx.shadowColor = '#59BFD6';
          ctx.shadowBlur = 40 * dpr;
          ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
          ctx.restore();
        }

        // Particle Assembly Phase
        if (state.solidCrossfade < 0.99) {
          ctx.save();
          ctx.globalAlpha = state.opacity * (1 - state.solidCrossfade);

          for (const tile of tiles) {
            const easeProgress = Math.max(
              0,
              Math.min(1, (state.assemble - tile.delay) / (1 - tile.delay || 1))
            );
            const curEase = 1 - Math.pow(1 - easeProgress, 3);

            let curX = tile.startX * (1 - curEase);
            let curY = tile.startY * (1 - curEase);
            let curRot = tile.startRot * (1 - curEase);

            if (state.explode > 0) {
              const expEase = Math.pow(state.explode, 2);
              curX += tile.expX * expEase;
              curY += tile.expY * expEase;
              curRot += tile.expRot * expEase;
            }

            const renderTileW = (tile.sw * targetW) / 412;
            const renderTileH = (tile.sh * targetH) / 282;
            const tileCenterX = tile.tx * targetW + curX;
            const tileCenterY = tile.ty * targetH + curY;

            ctx.save();
            ctx.translate(tileCenterX, tileCenterY);
            ctx.rotate(curRot);

            ctx.drawImage(
              img,
              tile.sx,
              tile.sy,
              tile.sw,
              tile.sh,
              -renderTileW / 2,
              -renderTileH / 2,
              renderTileW,
              renderTileH
            );
            ctx.restore();
          }
          ctx.restore();
        }

        // Solid Vector Logo Phase (100% Crisp)
        if (state.solidCrossfade > 0.01) {
          ctx.save();
          ctx.globalAlpha = state.opacity * state.solidCrossfade;
          ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
          ctx.restore();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const stopCanvasLoop = () => {
      if (isCleanedUp) return;
      isCleanedUp = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
    let handleKeyDown: ((event: KeyboardEvent) => void) | null = null;

    // Initial GSAP setup
    gsap.set([shutterTopRef.current, shutterBottomRef.current], { yPercent: 0 });
    gsap.set(lensDiaphragmRef.current, { opacity: 0, scale: 0.85, rotation: -25 });
    gsap.set(lensInnerRingRef.current, { scale: 0.6, opacity: 0 });
    gsap.set(flashOverlayRef.current, { opacity: 0 });
    gsap.set([hudTopRef.current, hudBottomRef.current], { opacity: 0, y: -8 });
    gsap.set(introPhaseRef.current, { opacity: 0, y: 12 });
    gsap.set(lockPillRef.current, { opacity: 0, y: 12 });

    // Master Cinematic Opening Timeline (~1.7s total poetic & agile flow)
    const tl = gsap.timeline({
      onComplete: () => {
        stopCanvasLoop();
        if (handleKeyDown) window.removeEventListener('keydown', handleKeyDown);
        skipTimelineRef.current = null;
        setDone(true);
        sessionStorage.setItem('puelche-loaded', '1');
        const lenisRef = (window as any).lenisInstance;
        if (lenisRef) lenisRef.start();
      },
    });

    // ── FASE 1: Búsqueda de Foco y Calibración Óptica (0.0s - 0.4s) ──
    tl.to([hudTopRef.current, hudBottomRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
      .to(introPhaseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power3.out',
      }, '-=0.15')
      .to(lensDiaphragmRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.25')
      .to(lensInnerRingRef.current, {
        opacity: 0.7,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, '<+=0.05')

      // La poesía de entrada se retira con suavidad antes del ensamble
      .to(introPhaseRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: 'power2.in',
      }, '+=0.05');

    // ── FASE 2: Ráfaga del Puelche, Enfoque Manual y Condensación (0.4s - 0.9s) ──
    tl.to(
      state,
      {
        opacity: 1,
        assemble: 1,
        lensFocus: 0,
        cyanGlow: 0.8,
        duration: 0.5,
        ease: 'expo.out',
      },
      '-=0.1'
    )
      // Transición al logo sólido
      .to(
        state,
        {
          solidCrossfade: 1,
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=0.15'
      )
      // Rotación precisa del anillo de apertura (Ajuste de diafragma f/2.8)
      .to(
        lensDiaphragmRef.current,
        {
          rotation: 15,
          scale: 1.02,
          duration: 0.25,
          ease: 'power1.inOut',
        },
        '<'
      );

    // ── FASE 3: El Disparo de Obturador & Destello (0.9s - 1.2s) ──
    tl.to(
      flashOverlayRef.current,
      {
        opacity: 0.85,
        duration: 0.06,
        ease: 'power4.in',
      },
      '-=0.05'
    )
      .to(
        flashOverlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        }
      )
      // Sello de autor emerge tras el destello
      .to(
        lockPillRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power3.out',
        },
        '-=0.15'
      );

    // ── FASE 4: Descompresión Inmediata y Desvanecimiento Central (1.2s - 1.4s) ──
    tl.to(
      [lensDiaphragmRef.current, lockPillRef.current, hudTopRef.current, hudBottomRef.current],
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
      },
      '+=0.05'
    )
      .to(
        state,
        {
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        },
        '<'
      );

    // ── FASE 5: Apertura Rápida de Cortinillas de Obturador Dual (1.3s - 1.8s) ──
    // Cortina superior sube, cortina inferior baja
    tl.to(
      shutterTopRef.current,
      {
        yPercent: -100,
        duration: 0.55,
        ease: 'power4.inOut',
      },
      '-=0.1'
    )
      .to(
        shutterBottomRef.current,
        {
          yPercent: 100,
          duration: 0.55,
          ease: 'power4.inOut',
        },
        '<'
      );

    // Skip handler (Click o tecla Escape)
    const handleSkip = () => {
      tl.progress(1);
    };

    handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);
    skipTimelineRef.current = handleSkip;

    return () => {
      stopCanvasLoop();
      if (handleKeyDown) window.removeEventListener('keydown', handleKeyDown);
      skipTimelineRef.current = null;
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <aside
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex select-none overflow-hidden cursor-pointer"
      aria-label="Apertura fotográfica Puelche Lab"
      onClick={() => skipTimelineRef.current?.()}
    >
      {/* Cortinilla Superior de Obturador */}
      <div
        ref={shutterTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#121417] border-b border-white/10 z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Cortinilla Inferior de Obturador */}
      <div
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#121417] border-t border-white/10 z-10"
        style={{ willChange: 'transform' }}
      />

      {/* Destello de Exposición Estroboscópico de Sala Oscura */}
      <div
        ref={flashOverlayRef}
        className="fixed inset-0 bg-[#FFFDF2] z-30 pointer-events-none mix-blend-screen"
        style={{ willChange: 'opacity' }}
      />

      {/* Canvas Central de Partículas del Viento */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      {/* Interfaz de Visor Óptico & Textos Editoriales */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
        {/* Cabecera Editorial */}
        <div ref={hudTopRef} className="flex justify-between items-start tracking-wider text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-puelche-cyan" />
            <span className="font-condensed uppercase tracking-widest text-white/90 font-medium">
              PUELCHE LAB &bull; PUERTO VARAS
            </span>
          </div>
          <span className="font-serif italic text-white/50 text-[11px] sm:text-xs">
            Luz de estudio &bull; Territorio austral
          </span>
        </div>

        {/* Centro: Anillo de Diafragma Óptico & Sello de Exposición */}
        <div className="relative flex items-center justify-center">
          {/* Anillo de Diafragma de Objetivo Prime (Lens Aperture Ring) */}
          <div
            ref={lensDiaphragmRef}
            className="w-[280px] sm:w-[380px] md:w-[460px] aspect-square rounded-full border border-white/15 backdrop-blur-[2px] flex items-center justify-center relative pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Graduaciones Perimetrales de Diafragma */}
            <div className="absolute top-3 inset-x-0 text-center font-serif italic text-[10px] sm:text-xs text-white/40 tracking-wider">
              Apertura f/2.8 &bull; Objetivo de Autor
            </div>
            <div className="absolute bottom-3 inset-x-0 text-center font-condensed uppercase text-[9px] sm:text-[10px] text-puelche-cyan tracking-[0.25em]">
              85mm Prime &bull; Puerto Varas 41°S
            </div>

            {/* Muescas Ópticas Norte / Sur / Este / Oeste */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-puelche-cyan/60" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-puelche-cyan/60" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-2.5 bg-puelche-cyan/60" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-2.5 bg-puelche-cyan/60" />

            {/* Anillo Interno Concétrico */}
            <div
              ref={lensInnerRingRef}
              className="w-3/4 h-3/4 rounded-full border border-puelche-cyan/20 border-dashed"
              style={{ willChange: 'transform, opacity' }}
            />
          </div>

          {/* Poesía de Entrada — Transiciona antes del ensamble */}
          <div
            ref={introPhaseRef}
            className="absolute max-w-lg mx-auto text-center px-4 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="font-serif italic text-sm sm:text-base text-puelche-cyan">
              El viento cálido que baja de la cordillera
            </span>
            <h2 className="font-condensed text-3xl sm:text-5xl uppercase tracking-wider text-white font-bold drop-shadow-lg">
              VIENTO CREATIVO
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/60 tracking-wide font-light">
              Búsqueda de foco óptico &bull; Revelando la luz del sur
            </p>
          </div>

          {/* Sello de Autor — Aparece con el destello de la toma */}
          <div
            ref={lockPillRef}
            className="absolute -bottom-16 sm:-bottom-20 flex items-center gap-3 px-5 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md pointer-events-none shadow-2xl"
          >
            <span className="font-condensed uppercase tracking-[0.2em] text-xs sm:text-sm text-white/95 font-medium">
              ESTUDIO PUELCHE LAB
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-puelche-cyan shadow-[0_0_8px_#59BFD6]" />
            <span className="font-serif italic text-xs sm:text-sm text-puelche-cyan">
              Puerto Varas, Patagonia
            </span>
          </div>
        </div>

        {/* Pie Inferior Editorial */}
        <div ref={hudBottomRef} className="flex justify-between items-end tracking-wider text-xs text-white/50">
          <div className="flex flex-col gap-0.5 font-light">
            <span className="text-white/80 font-medium">Toma de autor &bull; Territorio &bull; Oficio fotográfico</span>
            <span className="text-[11px] text-white/40">Región de Los Lagos, Chile</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-condensed uppercase text-white/50 tracking-widest text-[11px]">
            <span>Haz clic para entrar</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
