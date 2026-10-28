'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 5 Slats
  const slat1Ref = useRef<HTMLDivElement>(null);
  const slat2Ref = useRef<HTMLDivElement>(null);
  const slat3Ref = useRef<HTMLDivElement>(null);
  const slat4Ref = useRef<HTMLDivElement>(null);
  const slat5Ref = useRef<HTMLDivElement>(null);

  // Viewfinder UI references
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const focusRingRef = useRef<HTMLDivElement>(null);
  const poeticTextRef = useRef<HTMLDivElement>(null);
  const brandPillRef = useRef<HTMLDivElement>(null);

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

    // High DPI setup
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

    // Particle / Tile System for logo-puelche.png (412x282)
    const img = new window.Image();
    img.src = '/images/real/logo-puelche.png';

    interface Tile {
      sx: number;
      sy: number;
      sw: number;
      sh: number;
      startRelX: number;
      startRelY: number;
      startAngle: number;
      startScale: number;
      explodeRelX: number;
      explodeRelY: number;
      explodeAngle: number;
      delay: number;
    }

    const COLS = 16;
    const ROWS = 11;
    const tiles: Tile[] = [];

    // Pre-calculate randomized wind trajectories for each tile
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Wind originates predominantly from Andes / upper-right & sides (wind drift ~ -25°)
        const windDist = 500 + Math.random() * 700;
        const windAngle = -0.4 + (Math.random() - 0.5) * 1.2; // directional gust
        const sideMultiplier = Math.random() > 0.4 ? 1 : -1;

        tiles.push({
          sx: (c * 412) / COLS,
          sy: (r * 282) / ROWS,
          sw: 412 / COLS,
          sh: 282 / ROWS,
          startRelX: Math.cos(windAngle) * windDist * sideMultiplier + (Math.random() - 0.5) * 300,
          startRelY: Math.sin(windAngle) * windDist - 200 + (Math.random() - 0.5) * 200,
          startAngle: (Math.random() - 0.5) * Math.PI * 2,
          startScale: 0.1 + Math.random() * 0.4,
          explodeRelX: (Math.random() * 600 + 200) * (Math.random() > 0.3 ? 1 : -0.7),
          explodeRelY: -Math.random() * 500 - 150,
          explodeAngle: (Math.random() - 0.5) * Math.PI * 4,
          delay: Math.random() * 0.35,
        });
      }
    }

    // Animation state object driven by GSAP
    const state = {
      assemble: 0,     // 0 = scattered, 1 = locked
      focusBlur: 24,   // 24px blur down to 0px (optical camera focus)
      logoScale: 1.15, // settles to 1.0
      breathe: 1.0,    // subtle scale pulse
      cyanGlow: 0,     // glow intensity
      explode: 0,      // 0 = intact, 1 = blown away
      opacity: 0,      // master logo opacity
    };

    // Render loop for the wind-assembled logo
    const render = () => {
      if (isCleanedUp || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img.complete && img.naturalWidth > 0 && state.opacity > 0.01) {
        ctx.save();
        ctx.scale(dpr, dpr);

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        // Responsive logo display dimensions
        const maxLogoW = Math.min(screenW * 0.65, 340);
        const logoW = maxLogoW * state.logoScale * state.breathe;
        const logoH = logoW * (282 / 412);
        const centerX = screenW / 2;
        const centerY = screenH / 2 - 15;

        // Apply optical focus blur filter directly on canvas rendering
        if (state.focusBlur > 0.5) {
          ctx.filter = `blur(${state.focusBlur.toFixed(1)}px)`;
        } else {
          ctx.filter = 'none';
        }

        const tileTargetW = logoW / COLS;
        const tileTargetH = logoH / ROWS;

        tiles.forEach((t) => {
          // Progress adjusted with individual tile wind delay
          const rawAssemble = Math.max(0, Math.min(1, (state.assemble - t.delay) / (1 - t.delay + 0.001)));
          // Smooth power curve for realistic wind deceleration
          const assembleProg = 1 - Math.pow(1 - rawAssemble, 3);

          let curX = centerX - logoW / 2 + (t.sx / 412) * logoW + tileTargetW / 2;
          let curY = centerY - logoH / 2 + (t.sy / 282) * logoH + tileTargetH / 2;
          let curAngle = 0;
          let curScale = 1;
          let tileAlpha = state.opacity;

          if (state.explode > 0) {
            // Explosion / wind gust dispersion
            const expProg = Math.pow(state.explode, 2);
            curX += t.explodeRelX * expProg;
            curY += t.explodeRelY * expProg;
            curAngle = t.explodeAngle * expProg;
            tileAlpha = Math.max(0, state.opacity * (1 - state.explode * 1.2));
            curScale = Math.max(0.1, 1 - expProg * 0.5);
          } else if (rawAssemble < 1) {
            // Flying in from outer bounds
            curX += t.startRelX * (1 - assembleProg);
            curY += t.startRelY * (1 - assembleProg);
            curAngle = t.startAngle * (1 - assembleProg);
            curScale = t.startScale + (1 - t.startScale) * assembleProg;
            tileAlpha = state.opacity * assembleProg;
          }

          if (tileAlpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = tileAlpha;
            ctx.translate(curX, curY);
            ctx.rotate(curAngle);
            ctx.scale(curScale, curScale);

            // Draw tile slice
            ctx.drawImage(
              img,
              t.sx,
              t.sy,
              t.sw,
              t.sh,
              -tileTargetW / 2 - 0.5,
              -tileTargetH / 2 - 0.5,
              tileTargetW + 1,
              tileTargetH + 1
            );

            // Subtle cyan tint on particles as they travel
            if (rawAssemble < 0.95 && state.cyanGlow > 0.1) {
              ctx.globalCompositeOperation = 'source-atop';
              ctx.fillStyle = `rgba(89, 191, 214, ${0.4 * (1 - assembleProg)})`;
              ctx.fillRect(-tileTargetW / 2, -tileTargetH / 2, tileTargetW, tileTargetH);
            }

            ctx.restore();
          }
        });

        // Add soft cyan boutique bloom when locked
        if (state.cyanGlow > 0.05 && state.explode === 0) {
          ctx.save();
          ctx.globalAlpha = state.cyanGlow * 0.45;
          ctx.filter = `blur(${16 * dpr}px)`;
          ctx.drawImage(
            img,
            centerX - logoW / 2,
            centerY - logoH / 2,
            logoW,
            logoH
          );
          ctx.restore();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Initial GSAP setup
    gsap.set(slats, { yPercent: 0 });
    gsap.set([hudTopRef.current, hudBottomRef.current], { opacity: 0, y: -10 });
    gsap.set(bracketsRef.current, { opacity: 0, scale: 1.4 });
    gsap.set(focusRingRef.current, { opacity: 0, scale: 2.2 });
    gsap.set(poeticTextRef.current, { opacity: 0, y: 15 });
    gsap.set(brandPillRef.current, { opacity: 0, y: 10 });

    // Master Cinematic Opening Timeline (~4.8s total ceremonial duration)
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        sessionStorage.setItem('puelche-loaded', '1');
        const lenisRef = (window as any).lenisInstance;
        if (lenisRef) lenisRef.start();
      },
    });

    // PHASE 1: Viewfinder HUD & Poetic Stagger (0.0s - 1.2s)
    tl.to([hudTopRef.current, hudBottomRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
      .to(
        poeticTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .to(
        bracketsRef.current,
        {
          opacity: 0.8,
          scale: 1.1,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        focusRingRef.current,
        {
          opacity: 0.6,
          scale: 1.3,
          duration: 0.9,
          ease: 'power2.out',
        },
        '-=0.8'
      );

    // PHASE 2: "El Viento Trae el Logo" + Enfoque Óptico de Cámara (1.0s - 2.8s)
    tl.to(
      state,
      {
        opacity: 1,
        assemble: 1,
        focusBlur: 0,
        logoScale: 1.0,
        cyanGlow: 0.8,
        duration: 1.8,
        ease: 'power3.out',
      },
      '-=0.4'
    )
      .to(
        bracketsRef.current,
        {
          scale: 1.0,
          opacity: 1,
          borderColor: '#59BFD6',
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '<+=0.4'
      )
      .to(
        focusRingRef.current,
        {
          scale: 1.0,
          opacity: 0.9,
          borderColor: '#59BFD6',
          duration: 0.7,
          ease: 'power3.inOut',
        },
        '<'
      )
      .to(
        poeticTextRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: 'power2.in',
        },
        '<+=0.3'
      )
      .to(
        brandPillRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      );

    // PHASE 3: Respiración y Bloqueo de Foco Boutique (2.8s - 3.6s)
    tl.to(state, {
      breathe: 1.04,
      cyanGlow: 1.0,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut',
    });

    // PHASE 4: Ráfaga en Polvo / Dispersión Cinética (3.6s - 4.1s)
    tl.to(
      state,
      {
        explode: 1,
        opacity: 0,
        duration: 0.5,
        ease: 'power4.in',
      },
      '+=0.1'
    )
      .to(
        [bracketsRef.current, focusRingRef.current, brandPillRef.current, hudTopRef.current, hudBottomRef.current],
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.4,
          ease: 'power3.in',
        },
        '<'
      );

    // PHASE 5: Apertura Asimétrica de los 5 Slats (4.0s - 4.8s)
    tl.to(
      slats,
      {
        yPercent: -100,
        duration: 0.85,
        stagger: {
          each: 0.08,
          from: 'center', // Apertura desde el eje central hacia los extremos
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

      {/* Escenario Central: Canvas de Partículas del Logo */}
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

        {/* Viewfinder Brackets Centrales y Anillo de Enfoque */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {/* Anillo de enfoque óptico que se contrae hacia el logo */}
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
            {/* Esquina Superior Izquierda */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-puelche-cyan" />
            {/* Esquina Superior Derecha */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-puelche-cyan" />
            {/* Esquina Inferior Izquierda */}
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-puelche-cyan" />
            {/* Esquina Inferior Derecha */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-puelche-cyan" />

            {/* Cruz Central de Alineación */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-puelche-cyan">
              <span className="text-lg leading-none">+</span>
            </div>
          </div>

          {/* Frase poética introductoria previa al ensamble */}
          <div
            ref={poeticTextRef}
            className="absolute max-w-lg mx-auto text-center px-4 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-puelche-cyan">
              PATAGONIA AUSTRAL &bull; 41°S
            </span>
            <h2 className="font-condensed text-2xl sm:text-4xl uppercase tracking-widest text-white font-bold drop-shadow-lg">
              VIENTO CREATIVO
            </h2>
            <p className="font-mono text-[10px] sm:text-xs text-white/50 tracking-wider">
              [ BUSCANDO FOCO CINEMÁTICO ]
            </p>
          </div>

          {/* Pill de Sello Boutique que aparece con el logo ensamblado */}
          <div
            ref={brandPillRef}
            className="absolute bottom-12 sm:bottom-16 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md pointer-events-none"
          >
            <span className="font-condensed uppercase tracking-[0.25em] text-xs sm:text-sm text-white/90 font-medium">
              VIENTO CREATIVO
            </span>
            <span className="w-1 h-1 rounded-full bg-puelche-cyan shadow-[0_0_6px_#59BFD6]" />
            <span className="font-mono text-[10px] sm:text-xs text-puelche-cyan uppercase tracking-wider">
              PUERTO VARAS
            </span>
          </div>
        </div>

        {/* HUD Inferior */}
        <div ref={hudBottomRef} className="flex justify-between items-end tracking-wider text-[10px] sm:text-xs text-white/40">
          <div className="flex flex-col gap-0.5">
            <span className="text-white/70 uppercase font-medium">ESTUDIO CROSS MEDIA & FOTOGRAFÍA</span>
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
