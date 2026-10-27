'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render (initial page load — preloader handles that)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    const el = curtainRef.current;
    if (!el) return;

    // Curtain cian: slide down → pause → slide up
    const tl = gsap.timeline();
    tl.set(el, { yPercent: -100, display: 'block' })
      .to(el, { yPercent: 0, duration: 0.3, ease: 'power2.in' })
      .to(el, { yPercent: 100, duration: 0.3, ease: 'power2.out', delay: 0.08 })
      .set(el, { display: 'none' });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9997] bg-puelche-cyan pointer-events-none hidden"
      aria-hidden="true"
    />
  );
}
