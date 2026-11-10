'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startEnergy } from '@/lib/energy';

/**
 * Curva exponencial Awwwards (Penner easeOutExpo adaptada):
 * Arranque veloz con desaceleración inercial ultra-suave.
 */
const easeOutExpo = (x: number): number => {
  return Math.min(1, 1.001 - Math.pow(2, -10 * x));
};

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startEnergy();
    gsap.registerPlugin(ScrollTrigger);
    
    // R2: Desactivar lagSmoothing para sincronización 1:1 sin saltos de frames
    gsap.ticker.lagSmoothing(0);

    // Queries de entorno: solo puntero fino de escritorio con hover, sin reducción de movimiento
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    let lenis: Lenis | null = null;

    // Reloj unificado GSAP -> Lenis para evitar competencia de requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const syncScrollEngine = () => {
      const shouldEnable = pointerQuery.matches && !motionQuery.matches;

      if (!shouldEnable) {
        if (!lenis) return;
        // Destrucción limpia: devuelve el scroll táctil inercial nativo de 120Hz a dispositivos móviles
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
        lenis = null;
        delete (window as Window & { lenisInstance?: Lenis }).lenisInstance;
        ScrollTrigger.update();
        return;
      }

      if (lenis) return;

      // R2: Integración de Lenis 120Hz con curva easeOutExpo y duración 1.2s (reemplaza lerp fijo por duration+easing)
      lenis = new Lenis({
        duration: 1.2,
        easing: easeOutExpo,
        smoothWheel: true,
        syncTouch: false, // Preserva scroll táctil 100% nativo
      });

      (window as Window & { lenisInstance?: Lenis }).lenisInstance = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(updateTicker);
    };

    syncScrollEngine();
    pointerQuery.addEventListener('change', syncScrollEngine);
    motionQuery.addEventListener('change', syncScrollEngine);

    return () => {
      pointerQuery.removeEventListener('change', syncScrollEngine);
      motionQuery.removeEventListener('change', syncScrollEngine);
      gsap.ticker.remove(updateTicker);
      lenis?.destroy();
      lenis = null;
      delete (window as Window & { lenisInstance?: Lenis }).lenisInstance;
    };
  }, []);

  return <>{children}</>;
}
