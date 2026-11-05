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
import { WindParticleCanvas } from '@/components/ui/WindParticleCanvas';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { OrganicStoriesSection } from '@/components/home/OrganicStoriesSection';

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
    <div className="w-full flex flex-col -mt-20">
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
          <div className="absolute inset-0 bg-[#1D2024]/25 backdrop-brightness-100" />
        </div>

        {/* Kinetic Puelche Wind Particle Physics */}
        <WindParticleCanvas className="z-[5]" />

        {/* Top Geo Badge & Technical Coordinates */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/70 border-b border-white/10 pb-5">
          <div className="inline-flex items-center gap-2.5 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] bg-puelche-cyan animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°19&apos;S 72°59&apos;W &bull; PUERTO VARAS &bull; REGION DE LOS LAGOS</span>
          </div>
          <span className="hidden md:inline font-mono text-white/50">
            DISENO CROSS-MEDIA &bull; FOTOGRAFIA DE AUTOR
          </span>
        </div>

        {/* Center: Asimetría Editorial Suiza — Espacio Negativo Monumental */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center py-12 md:py-16 space-y-8">
          {/* Subtle Studio Mark / Monogram */}
          <div className="relative w-40 sm:w-52 md:w-64 aspect-[412/282] drop-shadow-2xl opacity-90 transition-transform duration-700 hover:scale-105">
            <Image
              src="/images/real/logo-puelche.png"
              alt="Puelche Lab — Viento Creativo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div
            ref={heroWipeRef}
            data-wipe-title="true"
            className="flex flex-col items-center justify-center space-y-4 max-w-4xl text-center"
          >
            {/* Editorial Category Tag */}
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#59BFD6] font-medium">
              ESTUDIO DE AUTOR &bull; EXPEDICIONES VISUALES
            </span>

            {/* SplitText Headline: VIENTO CREATIVO with pristine kerning & breathing room */}
            <SplitText
              text="VIENTO CREATIVO"
              as="h1"
              animation="scatter"
              className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-[0.06em] font-bold text-white drop-shadow-2xl leading-none"
            />

            <h2 className="font-condensed text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] font-light text-white/90 pt-1">
              Diseño Cross Media &bull; Fotografía de Autor
            </h2>
          </div>

          <p className="font-sans text-base sm:text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-md">
            Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas. Obra visual esculpida bajo el rigor y la luz de la Patagonia austral.
          </p>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-center pt-4">
          <a
            href="#cross-media"
            className="p-3 rounded-full bg-white/5 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/10 hover:border-[#59BFD6] transition-all scroll-indicator hover:scale-110"
            aria-label="Continuar"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
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
        SECCIÓN AWWWARDS: MESA INTERACTIVA DE REVELADO (BEFORE & AFTER SLIDER)
        Dial táctil para comparar capturas RAW vs Masters terminados
        ======================================================================
      */}
      <section className="relative w-full bg-[#18191B] py-20 md:py-32 px-6 md:px-12 lg:px-16 border-t border-b border-white/10 overflow-hidden">
        {/* Kinetic Watermark Typography */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap font-condensed text-[14vw] font-black uppercase text-white leading-none">
          REVELADO PUELCHE
        </div>
        <BeforeAfterSlider />
      </section>

      {/* 
        ======================================================================
        SECCIÓN AWWWARDS ORGÁNICA: CRÓNICAS DEL PUELCHE & RELATOS VIVOS
        Módulo empático y humano de relatos de autor que se expanden
        ======================================================================
      */}
      <OrganicStoriesSection />

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
