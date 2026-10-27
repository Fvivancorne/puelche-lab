'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

    let trigger: ScrollTrigger | undefined;

    if (variant === 'clip') {
      gsap.set(el, {
        clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}%)`,
        opacity: 0.3,
      });

      gsap.to(el, {
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
      });
    } else {
      gsap.set(el, { opacity: 0, y: 60 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      // Clean up ScrollTrigger instances for this element
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [inset, duration, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
