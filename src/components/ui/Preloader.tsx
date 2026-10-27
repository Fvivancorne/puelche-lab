'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip preloader if already loaded this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('puelche-loaded')) {
      setDone(true);
      return;
    }

    // Pause Lenis during preloader
    const lenis = (window as any).lenisInstance;
    if (lenis) lenis.stop();

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.val)),
      onComplete: () => {
        // Split reveal: top slides up, bottom slides down
        const tl = gsap.timeline({
          onComplete: () => {
            setDone(true);
            sessionStorage.setItem('puelche-loaded', '1');
            // Resume Lenis
            const lenisRef = (window as any).lenisInstance;
            if (lenisRef) lenisRef.start();
          },
        });

        tl.to(topRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        });
        tl.to(
          botRef.current,
          {
            yPercent: 100,
            duration: 0.8,
            ease: 'power3.inOut',
          },
          '<' // simultaneous
        );
      },
    });
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Top Half — Logo */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-puelche-dark flex items-end justify-center pb-6"
      >
        <div className="relative w-48 sm:w-56 md:w-64 aspect-[412/282]">
          <Image
            src="/images/real/logo-puelche.png"
            alt="Puelche Lab"
            fill
            priority
            className="object-contain opacity-90 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom Half — Counter */}
      <div
        ref={botRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-puelche-dark flex items-start justify-center pt-8"
      >
        <div className="flex items-baseline gap-1">
          <span className="font-condensed text-7xl sm:text-8xl md:text-9xl text-white/90 tracking-widest tabular-nums font-bold">
            {count}
          </span>
          <span className="font-condensed text-4xl sm:text-5xl md:text-6xl text-puelche-cyan font-bold">
            %
          </span>
        </div>
      </div>

      {/* Center divider line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-puelche-cyan/30" />
    </div>
  );
}
