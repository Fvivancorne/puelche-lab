'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 5 Slats Arquitectónicos
  const slat1Ref = useRef<HTMLDivElement>(null);
  const slat2Ref = useRef<HTMLDivElement>(null);
  const slat3Ref = useRef<HTMLDivElement>(null);
  const slat4Ref = useRef<HTMLDivElement>(null);
  const slat5Ref = useRef<HTMLDivElement>(null);

  // Viewfinder HUD references
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const focusRingRef = useRef<HTMLDivElement>(null);
  const introPhaseRef = useRef<HTMLDivElement>(null);
  const lockPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already viewed in this browser tab session
    if (typeof window !== 'undefined' && sessionStorage.getItem('puelche-loaded')) {
      setDone(true);
      return;
    }

    // Pause Lenis virtual scroll while curtain plays
    const lenis = (window as any).lenisInstance;
    if (lenis) lenis.stop();

    const slats = [
      slat1Ref.current,
      slat2Ref.current,
      slat3Ref.current,
      slat4Ref.current,
      slat5Ref.current,
    ];

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

    // 1. Grid of tiles for smooth magnetic snap
    const COLS = 10;
    const ROWS = 7;
    interface Tile {
      sx: number;
      sy: number;
      sw: number;
      sh: number;
      // Coordinates relative to logo center
      tx: number;
      ty: number;
      // Start wind vector
      startX: number;
      startY: number;
      startRot: number;
      // Explode vector
      expX: number;
      expY: number;
      expRot: number;
      delay: number;
    }

    const tiles: Tile[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Cohesive directional wind flow: comes down from Andes (upper right / 35deg)
        const windDist = 350 + Math.random() * 450;
        const windAngle = -0.6 + (Math.random() - 0.5) * 0.6; // focused stream

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
          delay: Math.random() * 0.12, // Tighter delay: locks as a unified wave
        });
      }
    }

    // 2. Ambient Wind Streams (Patagonian gusts that escort the logo)
    interface WindParticle {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
      size: number;
    }
    const windStreams: WindParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth + 200,
      y: Math.random() * window.innerHeight * 0.8 - 100,
      len: 30 + Math.random() * 90,
      speed: 8 + Math.random() * 14,
      alpha: 0.15 + Math.random() * 0.45,
      size: 1 + Math.random() * 2,
    }));

    // Animation state driven by GSAP
    const state = {
      assemble: 0,      // 0 = scattered wind, 1 = snapped 100%
      solidCrossfade: 0,// 0 = tiles, 1 = 100% crisp solid logo
      logoScale: 1.0,
      breathe: 1.0,
      cyanGlow: 0,
      flash: 0,         // Lock flash burst
      explode: 0,
      opacity: 0,
    };

    // Render loop: 120 FPS Hardware-accelerated canvas
    const render = () => {
      if (isCleanedUp || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      ctx.save();
      ctx.scale(dpr, dpr);

      // --- A. Draw Ambient Patagonian Wind Streams ---
      if (state.opacity > 0.05 && state.explode < 0.9) {
        ctx.strokeStyle = '#59BFD6';
        windStreams.forEach((p) => {
          ctx.beginPath();
          ctx.globalAlpha = p.alpha * state.opacity * (1 - state.explode);
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.len, p.y + p.len * 0.35); // wind slant
          ctx.stroke();

          // Advance wind particle
          p.x -= p.speed;
          p.y += p.speed * 0.35;
          if (p.x < -100 || p.y > screenH + 100) {
            p.x = screenW + 100 + Math.random() * 150;
            p.y = Math.random() * screenH * 0.7 - 50;
          }
        });
      }

      // --- B. Draw Assembling / Solid Logo ---
      if (img.complete && img.naturalWidth > 0 && state.opacity > 0.01) {
        const maxLogoW = Math.min(screenW * 0.72, 330);
        const logoW = maxLogoW * state.logoScale * state.breathe;
        const logoH = logoW * (282 / 412);
        const centerX = screenW / 2;
        const centerY = screenH / 2 - 12;

        const tileTargetW = logoW / COLS;
        const tileTargetH = logoH / ROWS;

        // 1. Draw tiles (when assembling or exploding)
        if (state.solidCrossfade < 0.99 || state.explode > 0) {
          const tileAlpha = (1 - state.solidCrossfade) * state.opacity;

          tiles.forEach((t) => {
            // Normalized individual progress
            const pRaw = Math.max(0, Math.min(1, (state.assemble - t.delay) / (1 - t.delay + 0.0001)));
            // Magnetic acceleration curve
            const prog = 1 - Math.pow(1 - pRaw, 4);

            let curX = centerX + t.tx * logoW;
            let curY = centerY + t.ty * logoH;
            let curRot = 0;
            let curScale = 1;
            let a = tileAlpha;

            if (state.explode > 0) {
              const eProg = Math.pow(state.explode, 2);
              curX += t.expX * eProg;
              curY += t.expY * eProg;
              curRot = t.expRot * eProg;
              a = Math.max(0, state.opacity * (1 - state.explode * 1.3));
              curScale = Math.max(0.1, 1 - eProg * 0.6);
            } else if (pRaw < 1) {
              curX += t.startX * (1 - prog);
              curY += t.startY * (1 - prog);
              curRot = t.startRot * (1 - prog);
              curScale = 0.4 + 0.6 * prog;
              a = tileAlpha * prog;
            }

            if (a > 0.01) {
              ctx.save();
              ctx.globalAlpha = a;
              ctx.translate(curX, curY);
              ctx.rotate(curRot);
              ctx.scale(curScale, curScale);

              // Draw slice with slight overlap to guarantee 0 gaps
              ctx.drawImage(
                img,
                t.sx,
                t.sy,
                t.sw,
                t.sh,
                -tileTargetW / 2 - 0.75,
                -tileTargetH / 2 - 0.75,
                tileTargetW + 1.5,
                tileTargetH + 1.5
              );

              // Cyan dust gleam while in flight
              if (prog < 0.95 && state.cyanGlow > 0.1) {
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = `rgba(89, 191, 214, ${0.5 * (1 - prog)})`;
                ctx.fillRect(-tileTargetW / 2, -tileTargetH / 2, tileTargetW, tileTargetH);
              }

              ctx.restore();
            }
          });
        }

        // 2. Draw 100% PRISTINE SOLID LOGO (No gaps, no seams, razor sharp)
        if (state.solidCrossfade > 0.01 && state.explode === 0) {
          ctx.save();
          ctx.globalAlpha = state.solidCrossfade * state.opacity;

          // Soft Cyan Boutique Aura behind solid logo
          if (state.cyanGlow > 0.05) {
            ctx.shadowColor = '#59BFD6';
            ctx.shadowBlur = 24 * state.cyanGlow * dpr;
          }

          ctx.drawImage(
            img,
            centerX - logoW / 2,
            centerY - logoH / 2,
            logoW,
            logoH
          );

          // Flash overlay on lock
          if (state.flash > 0.01) {
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = `rgba(255, 255, 255, ${state.flash})`;
            ctx.fillRect(centerX - logoW / 2, centerY - logoH / 2, logoW, logoH);
          }

          ctx.restore();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Initial GSAP setup
    gsap.set(slats, { yPercent: 0 });
    gsap.set([hudTopRef.current, hudBottomRef.current], { opacity: 0, y: -8 });
    gsap.set(bracketsRef.current, { opacity: 0, scale: 1.25 });
    gsap.set(focusRingRef.current, { opacity: 0, scale: 1.8 });
    gsap.set(introPhaseRef.current, { opacity: 0, y: 12 });
    gsap.set(lockPillRef.current, { opacity: 0, y: 10 });

    // Master Cinematic Opening Timeline (~4.8s total ceremonial flow)
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        sessionStorage.setItem('puelche-loaded', '1');
        const lenisRef = (window as any).lenisInstance;
        if (lenisRef) lenisRef.start();
      },
    });

    // ── FASE 1: Calibración y Poesía de Entrada (0.0s - 1.2s) ──
    // Se muestra SOLA para no tapar el logo
    tl.to([hudTopRef.current, hudBottomRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
      .to(introPhaseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2')
      .to(bracketsRef.current, {
        opacity: 0.6,
        scale: 1.12,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.4')
      .to(focusRingRef.current, {
        opacity: 0.4,
        scale: 1.4,
        duration: 0.7,
        ease: 'power2.out',
      }, '<')

      // La poesía de entrada se retira con elegancia ANTES del ensamble
      .to(introPhaseRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
      }, '+=0.2');

    // ── FASE 2: Ráfaga del Puelche y Unión Magnética (1.4s - 2.8s) ──
    tl.to(
      state,
      {
        opacity: 1,
        assemble: 1,
        cyanGlow: 0.9,
        duration: 1.2,
        ease: 'expo.out', // Snaps cleanly without lagging pieces
      },
      '-=0.1'
    )
      // Transición fluida e instantánea al logo sólido 100% puro
      .to(
        state,
        {
          solidCrossfade: 1,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.45'
      )
      // Viewfinder Brackets y Anillo cierran al punto exacto
      .to(
        bracketsRef.current,
        {
          scale: 1.0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        '<+=0.1'
      )
      .to(
        focusRingRef.current,
        {
          scale: 1.0,
          opacity: 0.85,
          duration: 0.5,
          ease: 'power3.out',
        },
        '<'
      )

      // Destello blanco-cian de "Foco Bloqueado" (Camera Lock)
      .to(
        state,
        {
          flash: 0.8,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        },
        '-=0.1'
      )

      // Aparece el pill de estudio debajo (sin tapar el logo)
      .to(
        lockPillRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.1'
      );

    // ── FASE 3: Respiración Boutique (2.8s - 3.6s) ──
    tl.to(state, {
      breathe: 1.035,
      cyanGlow: 1.0,
      duration: 0.45,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut',
    });

    // ── FASE 4: Ráfaga en Polvo / Dispersión Cinética (3.6s - 4.1s) ──
    tl.to(
      state,
      {
        solidCrossfade: 0, // Regresa a partículas para la explosión
        explode: 1,
        opacity: 0,
        duration: 0.5,
        ease: 'power4.in',
      },
      '+=0.15'
    )
      .to(
        [bracketsRef.current, focusRingRef.current, lockPillRef.current, hudTopRef.current, hudBottomRef.current],
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: 'power3.in',
        },
        '<'
      );

    // ── FASE 5: Apertura Asimétrica de los 5 Slats (4.0s - 4.8s) ──
    tl.to(
      slats,
      {
        yPercent: -100,
        duration: 0.85,
        stagger: {
          each: 0.08,
          from: 'center', // Apertura desde el centro hacia los lados
        },
        ease: 'power4.inOut',
      },
      '-=0.15'
    );

    // Skip handler (Click o tecla Escape)
    const handleSkip = () => {
      tl.progress(1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isCleanedUp = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <aside
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex select-none overflow-hidden cursor-pointer bg-[#1D2024]"
      aria-label="Apertura poética Puelche Lab"
      onClick={() => {
        setDone(true);
        sessionStorage.setItem('puelche-loaded', '1');
        const lenisRef = (window as any).lenisInstance;
        if (lenisRef) lenisRef.start();
      }}
    >
      {/* 5 Columnas Verticales Arquitectónicas (Slats) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none z-10">
        <div ref={slat1Ref} className="relative w-1/5 h-full bg-[#1D2024] border-r border-white/5">
          <div className="absolute bottom-0 inset-x-0 h-1 bg-puelche-cyan shadow-[0_0_12px_#59BFD6]" />
        </div>
        <div ref={slat2Ref} className="relative w-1/5 h-full bg-[#191B1F] border-r border-white/5">
          <div className="absolute bottom-0 inset-x-0 h-1 bg-puelche-cyan shadow-[0_0_12px_#59BFD6]" />
        </div>
        <div ref={slat3Ref} className="relative w-1/5 h-full bg-[#15171A] border-r border-white/5">
          <div className="absolute bottom-0 inset-x-0 h-1 bg-puelche-cyan shadow-[0_0_12px_#59BFD6]" />
        </div>
        <div ref={slat4Ref} className="relative w-1/5 h-full bg-[#191B1F] border-r border-white/5">
          <div className="absolute bottom-0 inset-x-0 h-1 bg-puelche-cyan shadow-[0_0_12px_#59BFD6]" />
        </div>
        <div ref={slat5Ref} className="relative w-1/5 h-full bg-[#1D2024]">
          <div className="absolute bottom-0 inset-x-0 h-1 bg-puelche-cyan shadow-[0_0_12px_#59BFD6]" />
        </div>
      </div>

      {/* Escenario Central: Canvas de Partículas y Logo Sólido */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Interfaz Óptica de Visor de Cámara Fotográfica (HUD) */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 font-mono text-[11px] sm:text-xs text-white/60">
        {/* HUD Superior */}
        <div ref={hudTopRef} className="flex justify-between items-start tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-puelche-cyan animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span className="text-white font-bold">REC ● [00:00:05]</span>
            <span className="hidden sm:inline text-white/40">• 41° 19′ S 72° 59′ W</span>
          </div>
          <div className="flex items-center gap-4 text-white/50">
            <span className="hidden md:inline">PUELCHE OPTICS</span>
            <span className="text-puelche-cyan font-bold">ISO 100 • 1/250s • f/1.4</span>
          </div>
        </div>

        {/* Viewfinder Central (Brackets, Foco y Textos) */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {/* Anillo de enfoque óptico */}
          <div
            ref={focusRingRef}
            className="absolute w-72 sm:w-88 md:w-96 aspect-square rounded-full border border-puelche-cyan/30 pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-puelche-cyan rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-puelche-cyan rounded-full" />
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-puelche-cyan rounded-full" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-puelche-cyan rounded-full" />
          </div>

          {/* Brackets [ ] alrededor del logo */}
          <div
            ref={bracketsRef}
            className="relative w-64 sm:w-80 md:w-96 aspect-[412/282] pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-puelche-cyan" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-puelche-cyan" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-puelche-cyan" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-puelche-cyan" />

            {/* Cruz Central de Alineación */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-puelche-cyan">
              <span className="text-lg leading-none">+</span>
            </div>
          </div>

          {/* Fase 1: Poesía de Apertura — Desaparece antes de que llegue el logo */}
          <div
            ref={introPhaseRef}
            className="absolute max-w-lg mx-auto text-center px-4 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-puelche-cyan">
              PATAGONIA AUSTRAL &bull; 41°S
            </span>
            <h2 className="font-condensed text-2xl sm:text-4xl uppercase tracking-widest text-white font-bold drop-shadow-lg">
              VIENTO CREATIVO
            </h2>
            <p className="font-mono text-[10px] sm:text-xs text-white/40 tracking-wider">
              [ BUSCANDO FOCO ÓPTICO ]
            </p>
          </div>

          {/* Sello Boutique que aparece sincronizado con el logo YA fijado */}
          <div
            ref={lockPillRef}
            className="absolute bottom-10 sm:bottom-14 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md pointer-events-none"
          >
            <span className="font-condensed uppercase tracking-[0.25em] text-xs sm:text-sm text-white/90 font-medium">
              ESTUDIO CROSS MEDIA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-puelche-cyan shadow-[0_0_8px_#59BFD6]" />
            <span className="font-mono text-[10px] sm:text-xs text-puelche-cyan uppercase tracking-wider">
              PUERTO VARAS &bull; 41°S
            </span>
          </div>
        </div>

        {/* HUD Inferior */}
        <div ref={hudBottomRef} className="flex justify-between items-end tracking-wider text-[10px] sm:text-xs text-white/40">
          <div className="flex flex-col gap-0.5">
            <span className="text-white/70 uppercase font-medium">DISEÑO &bull; BRANDING &bull; FOTOGRAFÍA BOUTIQUE</span>
            <span>PUERTO VARAS &bull; PATAGONIA CHILE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-white/40 uppercase">
            <span>[CLICK O ESC PARA ENTRAR]</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
