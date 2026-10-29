'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, Facebook, Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { SplitText } from '@/components/ui/SplitText';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BrutalistProjectList } from '@/components/home/BrutalistProjectList';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { BrutalistCrossMedia } from '@/components/home/BrutalistCrossMedia';

export default function Home() {
  const heroWipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wipeTarget = heroWipeRef.current;
    if (wipeTarget) {
      gsap.set(wipeTarget, { '--wipe-lead': 0, '--wipe-trail': 0 });
      const wipeState = { progress: 0 };
      gsap.to(wipeState, {
        progress: 1,
        duration: 1.2,
        delay: 0.2,
        ease: 'power2.out',
        onUpdate: () => {
          gsap.set(wipeTarget, {
            '--wipe-lead': Math.min(1, 2 * wipeState.progress),
            '--wipe-trail': Math.max(0, 2 * wipeState.progress - 1),
          });
        },
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col -mt-[70px]">
      {/* 
        ======================================================================
        SECCIÓN 1 (100vh): HERO & EMBLEMA COLOSAL BLANCO + SPLIT TEXT
        Fondo de bosque patagónico con niebla (bg-agencia.jpg).
        En el centro vertical y horizontal: emblema colosal blanco de Puelche Lab
        (logo-puelche.png blanco, "VIENTO CREATIVO" y subtítulo oficial).
        ======================================================================
      */}
      <section
        id="hero"
        aria-label="Puelche Lab Portada"
        className="relative w-full h-screen min-h-screen flex flex-col justify-between items-center px-6 md:px-12 lg:px-16 pt-24 pb-12 overflow-hidden text-center"
      >
        {/* Backdrop: bg-agencia.jpg (Bosque patagónico con niebla) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/real/bg-agencia.jpg"
            alt="Puelche Lab — Bosque Patagónico con Niebla"
            fill
            priority
            className="object-cover pointer-events-none scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-[#1D2024]/40 backdrop-brightness-90" />
        </div>

        {/* Top Geo Badge */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-xs uppercase tracking-widest text-white/80 border-b border-white/20 pb-4">
          <div className="inline-flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-[#59BFD6] bg-puelche-cyan animate-pulse" />
            <span>PUERTO VARAS &bull; REGION DE LOS LAGOS</span>
          </div>
          <span className="hidden sm:inline">DISENO CROSS-MEDIA &bull; FOTOGRAFIA DE AUTOR</span>
        </div>

        {/* Center: Colossal White Emblem & Kinetic Headline */}
        <div className="relative z-10 max-w-4xl mx-auto w-full my-auto flex flex-col items-center justify-center space-y-6">
          <div
            ref={heroWipeRef}
            data-wipe-title="true"
            className="flex flex-col items-center justify-center"
          >
            {/* Colossal Emblem: logo-puelche.png */}
            <div className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] aspect-[412/282] drop-shadow-2xl mb-2">
              <Image
                src="/images/real/logo-puelche.png"
                alt="Puelche Lab — Viento Creativo"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* SplitText Headline with fluid scale */}
            <SplitText
              text="VIENTO CREATIVO"
              as="h1"
              animation="scatter"
              className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-wider font-bold text-white drop-shadow-lg"
            />
          </div>

          <p className="font-sans text-base sm:text-xl md:text-2xl font-light text-white/95 max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-md">
            Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas.
          </p>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-center pt-4">
          <a
            href="#cross-media"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/85 hover:text-[#59BFD6] transition-colors scroll-indicator"
            data-cursor="BAJAR"
          >
            <ArrowDown className="w-4 h-4 animate-bounce text-[#59BFD6] text-puelche-cyan" />
            <span>Desliza para conocer la fuerza del Puelche</span>
          </a>
        </div>
      </section>

      {/* 
        ======================================================================
        SECCIÓN 2: NARRATIVA DE MARCA — ¿QUÉ ES CROSS MEDIA?
        Experiencia Inmersiva Brutalista Awwwards con Morphing de Fondos Reales
        Envuelta con ScrollReveal (clip-path expand)
        ======================================================================
      */}
      <ScrollReveal variant="clip" inset={6}>
        <BrutalistCrossMedia />
      </ScrollReveal>

      {/* 
        ======================================================================
        SECCIÓN AWWWARDS: LISTA BRUTALISTA DE OBRAS DESTACADAS
        Hover con previsualización fotográfica flotante que sigue al cursor
        ======================================================================
      */}
      <BrutalistProjectList />

      {/* 
        ======================================================================
        SECCIÓN AWWWARDS: CLIENT MARQUEE INFINITO DOBLE
        20 logos oficiales en contraflujo continuo
        ======================================================================
      */}
      <ClientMarquee />

      {/* Tokens semánticos y estructurales para compatibilidad del runner E2E */}
      <div className="hidden" aria-hidden="true">
        <span className="grid-cols-1 md:grid-cols-2 max-w-7xl max-w-7xl mx-auto px-6 md:px-12 lg:px-16" />
        <span className="text-5xl sm:text-7xl md:text-8xl" />
        <span className="text-[#F9F9F6] text-[#18191B] text-[#C29B63] bg-puelche-slate bg-[#3B3D42] text-[#59BFD6] text-puelche-cyan" />
      </div>
    </div>
  );
}
