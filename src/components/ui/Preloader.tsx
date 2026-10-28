'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function Preloader() {
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slat1Ref = useRef<HTMLDivElement>(null);
  const slat2Ref = useRef<HTMLDivElement>(null);
  const slat3Ref = useRef<HTMLDivElement>(null);
  const slat4Ref = useRef<HTMLDivElement>(null);
  const slat5Ref = useRef<HTMLDivElement>(null);

  const pulse1Ref = useRef<HTMLDivElement>(null);
  const pulse2Ref = useRef<HTMLDivElement>(null);
  const pulse3Ref = useRef<HTMLDivElement>(null);

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

    // Master Cinematic Opening Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        sessionStorage.setItem('puelche-loaded', '1');
        const lenisRef = (window as any).lenisInstance;
        if (lenisRef) lenisRef.start();
      },
    });

    // Initial state setup
    gsap.set(slats, { yPercent: 0 });
    gsap.set([pulse1Ref.current, pulse2Ref.current, pulse3Ref.current], {
      opacity: 0,
      y: 20,
    });

    // Pulse 1: "EL VIENTO QUE DESCIENDE DE LOS ANDES"
    tl.to(pulse1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(pulse1Ref.current, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.35,
      })

      // Pulse 2: "LA LUZ QUE MODELA EL SUR"
      .to(pulse2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(pulse2Ref.current, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.35,
      })

      // Pulse 3: Imagotipo & "PUELCHE LAB • PUERTO VARAS"
      .to(pulse3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
      // Ráfaga de viento horizontal (Puelche Wind Gust sweep)
      .to(pulse3Ref.current, {
        x: 80,
        skewX: -15,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.45,
        ease: 'power3.in',
        delay: 0.4,
      })

      // Cortinas Staggered: 5 Slats se elevan de forma asimétrica
      .to(slats, {
        yPercent: -100,
        duration: 0.85,
        stagger: {
          each: 0.08,
          from: 'center', // Centro abre primero, expandiendo hacia los lados
        },
        ease: 'power4.inOut',
      });

    // Permite al usuario saltar la intro con click o Escape
    const handleSkip = () => {
      tl.progress(1);
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') handleSkip();
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <aside
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex select-none overflow-hidden cursor-pointer"
      aria-label="Apertura poética Puelche Lab"
      onClick={() => {
        setDone(true);
        sessionStorage.setItem('puelche-loaded', '1');
        const lenisRef = (window as any).lenisInstance;
        if (lenisRef) lenisRef.start();
      }}
    >
      {/* 5 Columnas Verticales (Slats) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
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

      {/* Escenario Central de Micro-Poemas Cinéticos */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none px-6 text-center">
        {/* Pulso 1 */}
        <div
          ref={pulse1Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center justify-center space-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-puelche-cyan">
            PATAGONIA AUSTRAL &bull; 41°S
          </span>
          <h2 className="font-condensed text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold drop-shadow-2xl">
            EL VIENTO QUE DESCIENDE DE LOS ANDES
          </h2>
        </div>

        {/* Pulso 2 */}
        <div
          ref={pulse2Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center justify-center space-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-puelche-cyan">
            ESTUDIO CROSS MEDIA
          </span>
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-white font-normal drop-shadow-2xl">
            La luz que modela el sur.
          </h2>
        </div>

        {/* Pulso 3: Emblema Oficial + Imagotipo Puelche Lab */}
        <div
          ref={pulse3Ref}
          className="absolute max-w-xl mx-auto flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative w-44 sm:w-56 md:w-64 aspect-[412/282] drop-shadow-[0_0_35px_rgba(89,191,214,0.35)]">
            <Image
              src="/images/real/logo-puelche.png"
              alt="Puelche Lab"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-3 font-condensed uppercase tracking-[0.25em] text-sm sm:text-base text-white/90">
            <span>VIENTO CREATIVO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-puelche-cyan" />
            <span>PUERTO VARAS</span>
          </div>
        </div>

        {/* Pista sutil de skip */}
        <span className="absolute bottom-6 right-6 font-mono text-[10px] text-white/40 uppercase tracking-widest pointer-events-none hidden sm:inline">
          [Click o ESC para entrar]
        </span>
      </div>
    </aside>
  );
}
