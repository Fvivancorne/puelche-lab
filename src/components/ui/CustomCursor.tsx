'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    if (!visible) setVisible(true);

    const target = (e.target as HTMLElement).closest('[data-cursor]');
    if (target) {
      setExpanded(true);
      setLabel(target.getAttribute('data-cursor') || 'VER');
    } else {
      setExpanded(false);
      setLabel('');
    }
  }, [visible]);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [onMove]);

  // Don't render anything on touch or if not visible
  if (!visible && typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 z-[9998] pointer-events-none rounded-full
        flex items-center justify-center
        transition-[width,height,background-color,opacity] duration-300 ease-out
        ${visible ? 'opacity-100' : 'opacity-0'}
        ${expanded
          ? 'w-[60px] h-[60px] bg-puelche-cyan/90'
          : 'w-2 h-2 bg-puelche-cyan'
        }`}
      style={{ mixBlendMode: expanded ? 'normal' : 'difference' }}
      aria-hidden="true"
    >
      {expanded && label && (
        <span className="text-white text-[10px] font-condensed uppercase tracking-widest font-bold select-none">
          {label}
        </span>
      )}
    </div>
  );
}
