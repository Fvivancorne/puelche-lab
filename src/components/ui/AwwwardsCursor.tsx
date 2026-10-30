'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function AwwwardsCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'explore' | 'button' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState<string>('');

  useEffect(() => {
    // Disable custom cursor on touch devices or screens without fine pointer
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for 60fps performance
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);

      // Check element under cursor to set state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const exploreTarget = target.closest('[data-cursor="explore"], .group, article, .cursor-explore');
      const buttonTarget = target.closest('button, a, input, select, textarea, [role="button"]');

      if (exploreTarget && !buttonTarget) {
        setCursorState('explore');
        const customText = (exploreTarget as HTMLElement).getAttribute('data-cursor-text') || 'VER';
        setCursorText(customText);
      } else if (buttonTarget) {
        setCursorState('button');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
      isVisible = false;
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
      isVisible = true;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-difference hidden md:block"
      style={{ left: 0, top: 0 }}
      aria-hidden="true"
    >
      {/* Default State: Small precision optic point */}
      {cursorState === 'default' && (
        <div className="w-4 h-4 rounded-full border border-white/80 bg-white/20 flex items-center justify-center transition-all duration-300 ease-out">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      )}

      {/* Button Hover State: Magnetic subtle ring */}
      {cursorState === 'button' && (
        <div className="w-10 h-10 rounded-full border border-white/90 bg-white/10 scale-110 flex items-center justify-center transition-all duration-300 ease-out shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      )}

      {/* Explore / Photo State: High-End Optical Lens Viewfinder */}
      {cursorState === 'explore' && (
        <div className="relative w-20 h-20 rounded-full border border-white/80 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 ease-out shadow-2xl">
          {/* Viewfinder crosshairs */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/80" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/80" />
          <div className="absolute left-1 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white/80" />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white/80" />

          {/* Center Text */}
          <span
            ref={textRef}
            className="font-condensed font-bold uppercase tracking-widest text-[11px] text-white text-center select-none"
          >
            {cursorText || 'VER'}
          </span>
        </div>
      )}
    </div>
  );
}
