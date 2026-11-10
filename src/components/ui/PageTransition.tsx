'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { prefersReducedMotion, startEnergy } from '@/lib/energy';

/**
 * Transición de Página con ClipPath Inset y Prefetching Especulativo (R7).
 * Utiliza clipPath: inset(...) para un barrido cinemático vertical y
 * prefetching automático en onMouseEnter/mouseover y onTouchStart (0ms latencia percibida).
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  // 1. Prefetching Especulativo Global: mouseover y touchstart
  useEffect(() => {
    const prefetchLink = (target: HTMLElement | null) => {
      if (!target) return;
      const a = target.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          router.prefetch(url.pathname + url.search);
        }
      } catch {
        // Ignorar URLs no parseables
      }
    };

    const handlePointerOver = (e: MouseEvent) => prefetchLink(e.target as HTMLElement);
    const handleTouchStart = (e: TouchEvent) => prefetchLink(e.target as HTMLElement);

    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [router]);

  // 2. Interceptor de Navegación con ClipPath
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

      // Barrido de entrada: de fondo recortado a cobertura completa
      gsap.timeline()
        .set(curtainRef.current, { display: 'flex', clipPath: 'inset(100% 0% 0% 0%)' })
        .to(curtainRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.42,
          ease: 'power3.inOut',
        })
        .add(() => router.push(url.pathname + url.search + url.hash));
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  // 3. Barrido de Salida (Apertura al cargar la nueva ruta)
  useEffect(() => {
    if (!pending.current || !curtainRef.current) return;
    pending.current = false;

    // Resetear scroll nativo y Lenis inmediatamente
    window.scrollTo(0, 0);
    const win = window as Window & { lenisInstance?: { scrollTo: (y: number, opts?: { immediate?: boolean }) => void } };
    win.lenisInstance?.scrollTo(0, { immediate: true });

    const main = document.querySelector<HTMLElement>('main');
    main?.setAttribute('tabindex', '-1');
    main?.focus({ preventScroll: true });

    // Barrido de salida: hacia clipPath: inset(0% 0% 100% 0%) revelando la nueva ruta
    gsap.to(curtainRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.48,
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
      className="fixed inset-0 z-[9998] pointer-events-none hidden bg-[#111215] flex-col items-center justify-center border-t border-[#59BFD6]/30 shadow-2xl"
      style={{
        clipPath: 'inset(0% 0% 100% 0%)',
        willChange: 'clip-path',
      }}
    >
      {/* Emblema fotográfico de autor que palpita durante la transición */}
      <div className="relative w-28 sm:w-36 aspect-[412/282] opacity-35 drop-shadow-2xl">
        <Image
          src="/images/real/logo-puelche.png"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </div>
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#59BFD6] mt-4 opacity-60">
        PUELCHE LAB &bull; EXPEDICIONES
      </span>
    </div>
  );
}
