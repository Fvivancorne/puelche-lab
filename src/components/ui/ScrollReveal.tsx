'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Clip-path inset percentage for the hidden state (default 12) */
  inset?: number;
  /** Duration in seconds (default 1.2) */
  duration?: number;
  /** Variant: 'clip' for clip-path reveal, 'fade' for simple fade+slide */
  variant?: 'clip' | 'fade';
}

export function ScrollReveal({
  children,
  className = '',
  inset = 12,
  duration = 1.2,
  variant = 'clip',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    // Sin preferencia de movimiento reducido: animar dentro de un contexto local.
    // Al salir de la media query o desmontar, context.revert() restaura los estilos.
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        if (variant === 'clip') {
          gsap.fromTo(
            el,
            {
              clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}%)`,
              opacity: 0.3,
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 30%',
                toggleActions: 'play none none none',
              },
            }
          );
          return;
        }

        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, el);

      return () => context.revert();
    });

    return () => media.revert();
  }, [inset, duration, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
