'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startEnergy } from '@/lib/energy';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startEnergy();
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;

    // Usar un único reloj para Lenis y GSAP evita dos loops de animación compitiendo.
    const updateTicker = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const syncMotionPreference = () => {
      if (motionQuery.matches) {
        if (!lenis) return;

        gsap.ticker.remove(updateTicker);
        lenis.destroy();
        lenis = null;
        delete (window as Window & { lenisInstance?: Lenis }).lenisInstance;
        ScrollTrigger.update();
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      (window as Window & { lenisInstance?: Lenis }).lenisInstance = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(updateTicker);
    };

    syncMotionPreference();
    motionQuery.addEventListener('change', syncMotionPreference);

    return () => {
      motionQuery.removeEventListener('change', syncMotionPreference);
      gsap.ticker.remove(updateTicker);
      lenis?.destroy();
      lenis = null;
      delete (window as Window & { lenisInstance?: Lenis }).lenisInstance;
    };
  }, []);

  return <>{children}</>;
}
