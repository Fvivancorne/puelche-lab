'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
  strength?: number; // Elastic pull strength (default: 0.35)
  radius?: number;   // Proximity detection radius in px (default: 90)
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.35,
  radius = 90,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = gsap.matchMedia();
    media.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.hypot(distX, distY);

        if (distance < radius) {
          xTo(distX * strength);
          yTo(distY * strength);
        } else {
          xTo(0);
          yTo(0);
        }
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      el.addEventListener('mouseleave', onMouseLeave);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => media.revert();
  }, [strength, radius]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export default Magnetic;
