'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { prefersReducedMotion, startEnergy } from '@/lib/energy';

/**
 * Transición Atmosférica Puelche (Este a Oeste).
 * El viento puelche desciende de la cordillera (Este) barriendo en niebla
 * y saliendo hacia el océano Pacífico (Oeste) al revelar la nueva ruta.
 */
const FROM_EAST = 100; // Entra desde el Este (Cordillera)
const TO_WEST = -100;  // Sale hacia el Oeste (Océano)

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    startEnergy();

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (prefersReducedMotion() || !curtainRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      pending.current = true;

      gsap.timeline()
        .set(curtainRef.current, { display: 'block', xPercent: FROM_EAST })
        .to(curtainRef.current, { xPercent: 0, duration: 0.45, ease: 'power3.inOut' })
        .add(() => router.push(url.pathname + url.search + url.hash));
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current || !curtainRef.current) return;
    pending.current = false;
    window.scrollTo(0, 0);

    const main = document.querySelector<HTMLElement>('main');
    main?.setAttribute('tabindex', '-1');
    main?.focus({ preventScroll: true });

    gsap.to(curtainRef.current, {
      xPercent: TO_WEST,
      duration: 0.5,
      ease: 'power3.inOut',
      delay: 0.05,
      onComplete: () => {
        if (curtainRef.current) gsap.set(curtainRef.current, { display: 'none' });
      },
    });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9998] pointer-events-none hidden w-[140%] -ml-[20%]"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(89, 191, 214, 0.12) 15%, rgba(17, 18, 21, 0.97) 45%, rgba(17, 18, 21, 0.97) 55%, rgba(89, 191, 214, 0.12) 85%, transparent 100%)',
      }}
    />
  );
}
