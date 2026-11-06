'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function AwwwardsCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'explore' | 'button' | 'drag' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState<string>('');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const media = gsap.matchMedia();
    media.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        // quickTo reuses tweens rather than allocating one on every pointer event.
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

        let isVisible = false;
        let lastX = -100;
        let lastY = -100;

        const evaluateTarget = (target: HTMLElement | null) => {
          if (!target) {
            setCursorState('default');
            setCursorText('');
            return;
          }

          const dragTarget = target.closest('[data-cursor="drag"], [data-cursor="ARRASTRAR"], .cursor-ew-resize');
          const exploreTarget = target.closest('[data-cursor="explore"], .cursor-explore');
          const buttonTarget = target.closest('button, a, input, select, textarea, [role="button"]');

          if (dragTarget && !buttonTarget) {
            setCursorState('drag');
            setCursorText('');
          } else if (exploreTarget && !buttonTarget) {
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

        const onMouseMove = (e: MouseEvent) => {
          lastX = e.clientX;
          lastY = e.clientY;
          if (!isVisible) {
            gsap.to(cursor, { opacity: 1, duration: 0.2 });
            isVisible = true;
          }
          xTo(e.clientX);
          yTo(e.clientY);
          evaluateTarget(e.target as HTMLElement | null);
        };

        const onScroll = () => {
          if (lastX >= 0 && lastY >= 0) {
            evaluateTarget(document.elementFromPoint(lastX, lastY) as HTMLElement | null);
          }
        };

        const onMouseLeave = () => {
          gsap.to(cursor, { opacity: 0, duration: 0.2 });
          isVisible = false;
          setCursorState('default');
          setCursorText('');
        };

        const onMouseEnter = () => {
          gsap.to(cursor, { opacity: 1, duration: 0.2 });
          isVisible = true;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('blur', onMouseLeave);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('blur', onMouseLeave);
          document.removeEventListener('mouseleave', onMouseLeave);
          document.removeEventListener('mouseenter', onMouseEnter);
        };
      }, cursor);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 will-change-transform hidden md:block"
      style={{ left: 0, top: 0 }}
      aria-hidden="true"
    >
      {/* Default State: Small precision optic point with mix-blend-difference */}
      {cursorState === 'default' && (
        <div className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/20 flex items-center justify-center transition-all duration-300 ease-out mix-blend-difference">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      )}

      {/* Button Hover State: Magnetic subtle ring */}
      {cursorState === 'button' && (
        <div className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/10 scale-110 flex items-center justify-center transition-all duration-300 ease-out shadow-[0_0_15px_rgba(255,255,255,0.4)] mix-blend-difference">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      )}

      {/* Drag State: Minimal optic dial with dual lateral chevrons (zero text) */}
      {cursorState === 'drag' && (
        <div className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C29B63]/80 bg-[#141518]/90 backdrop-blur-md flex items-center justify-center gap-0.5 transition-all duration-200 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_12px_rgba(194,155,99,0.3)]">
          <span className="text-[#C29B63] text-xs font-mono select-none">‹</span>
          <span className="text-[#C29B63] text-xs font-mono select-none">›</span>
        </div>
      )}

      {/* Explore / Photo State: High-End Optical Lens Viewfinder */}
      {cursorState === 'explore' && (
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/80 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 ease-out shadow-2xl">
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
