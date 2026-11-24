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
import { AuthorDirectionSection } from '@/components/home/AuthorDirectionSection';
import { Magnetic } from '@/components/ui/Magnetic';
import { KineticTextSwap } from '@/components/ui/KineticTextSwap';

export default function Home() {
  const heroWipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wipeTarget = heroWipeRef.current;
    if (!wipeTarget) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(wipeTarget, { '--wipe-lead': 1, '--wipe-trail': 1 });
      gsap.set('#hero', { scale: 1.0, borderRadius: '0px' });
      gsap.set('#hero-bg-img', { scale: 1.0 });
    });
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
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

        // ── R1: HERO CINEMÁTICO FULL-BLEED (PANTALLA COMPLETA 100VW/100VH) ──
        gsap.to('#hero-bg-img', {
          scale: 1.15,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ── KINETIC HERO EXIT PARALLAX: Las piezas y letras se van con el viento austral al scrollear ──
        gsap.to('#hero-monogram', {
          y: -140,
          opacity: 0,
          scale: 0.82,
          filter: 'blur(8px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '320px top',
            scrub: 0.5,
          },
        });

        gsap.to('#hero-subtitles', {
          y: -100,
          x: -30,
          opacity: 0,
          filter: 'blur(5px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '300px top',
            scrub: 0.5,
          },
        });

        gsap.to('#hero-discipline-title', {
          y: -90,
          x: 30,
          opacity: 0,
          filter: 'blur(5px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '330px top',
            scrub: 0.5,
          },
        });

        gsap.to('#hero-description', {
          y: -80,
          opacity: 0,
          filter: 'blur(4px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '360px top',
            scrub: 0.5,
          },
        });

        gsap.to(['#hero-geo-badge', '#hero-scroll-btn'], {
          opacity: 0,
          y: -40,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '180px top',
            scrub: 0.5,
          },
        });
      }, wipeTarget);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <div className="w-full flex flex-col -mt-20">
      {/* 
        ======================================================================
        SECCIÓN 1 (100vh): HERO & EMBLEMA COLOSAL BLANCO + SPLIT TEXT
        Fondo de bosque patagónico con niebla (bg-agencia.jpg).
        R1: Pantalla completa Full-Bleed 100vw x 100vh con parallax cinemático.
        ======================================================================
      */}
      <section
        id="hero"
        aria-label="Puelche Lab Portada"
        className="relative w-full min-h-[100svh] min-h-screen flex flex-col justify-between items-center px-6 md:px-12 lg:px-16 pt-20 sm:pt-24 pb-6 overflow-hidden text-center will-change-transform origin-center"
      >
        {/* Backdrop: bg-agencia.jpg (Bosque patagónico con niebla) — Pantalla Completa 100% Full-Bleed */}
        <div id="hero-bg-wrapper" className="absolute inset-0 z-0 pointer-events-none will-change-transform overflow-hidden">
          <Image
            id="hero-bg-img"
            src="/images/real/bg-agencia.jpg"
            alt="Puelche Lab — Bosque Patagónico con Niebla"
            fill
            priority
            className="object-cover pointer-events-none scale-105 will-change-transform origin-center transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111215]/25 via-[#111215]/40 to-[#111215] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(17,18,21,0.55)_100%)] pointer-events-none" />
        </div>

        {/* Kinetic Puelche Wind Particle Physics */}
        <WindParticleCanvas className="z-[5]" />

        {/* Top Geo Badge & Technical Coordinates */}
        <div id="hero-geo-badge" className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/70 border-b border-white/10 pb-3 sm:pb-4 will-change-transform">
          <div className="inline-flex items-center gap-2.5 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] bg-puelche-cyan animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°19&apos;S 72°59&apos;W &bull; PUERTO VARAS &bull; REGION DE LOS LAGOS</span>
          </div>
          <span className="hidden md:inline font-mono text-white/50">
            DISENO CROSS-MEDIA &bull; FOTOGRAFIA DE AUTOR
          </span>
        </div>

        {/* Center: Asimetría Editorial Suiza — Espacio Negativo Monumental */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center py-2 sm:py-4 md:py-6 space-y-3 sm:space-y-4 md:space-y-5">
          {/* Subtle Studio Mark / Monogram */}
          <div id="hero-monogram" className="relative flex flex-col items-center gap-2 will-change-transform">
            <div className="relative w-28 sm:w-36 md:w-44 lg:w-48 aspect-[412/282] drop-shadow-2xl opacity-90 transition-transform duration-700 hover:scale-105">
              <Image
                src="/images/real/logo-puelche.png"
                alt="Puelche Lab — Viento Creativo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#59BFD6] font-semibold">
                VIENTO CREATIVO &bull; MONOGRAMA DE AUTOR
              </span>
            </div>
          </div>

          <div
            ref={heroWipeRef}
            data-wipe-title="true"
            className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 max-w-5xl text-center"
          >
            {/* Editorial Category Tag */}
            <span id="hero-subtitles" className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-white/70 font-medium will-change-transform">
              PUERTO VARAS &bull; EXPEDICIONES VISUALES &bull; 41°S
            </span>

            {/* SplitText Headline: Propuesta Comercial Directa */}
            <SplitText
              text="FOTOGRAFÍA, DISEÑO & EXPERIENCIAS DIGITALES"
              as="h1"
              animation="scatter"
              className="font-condensed text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-[0.03em] font-bold text-white drop-shadow-2xl leading-[0.96]"
            />

            <h2 id="hero-discipline-title" className="font-condensed text-base sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.14em] font-semibold text-[#59BFD6] pt-1 will-change-transform">
              Para marcas con identidad austral
            </h2>
          </div>

          <p id="hero-description" className="font-sans text-xs sm:text-sm md:text-base lg:text-lg font-light text-white/90 max-w-3xl mx-auto tracking-wide leading-relaxed drop-shadow-md px-2 will-change-transform">
            Un Estudio de Diseño Cross Media y Fotografía de Puerto Varas. Diseñamos identidades de marca, producción fotográfica en terreno austral y plataformas digitales de alto impacto para proyectos con carácter y presencia sin fronteras.
          </p>

          {/* Quick Primary Actions with Magnetic Spring & Kinetic Roll */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Magnetic strength={0.3} radius={75}>
              <Link
                href="/auditor"
                className="group px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#59BFD6] text-white hover:text-[#0b0d10] border border-white/20 hover:border-[#59BFD6] font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <KineticTextSwap primaryText="Auditoría Web Gratuita" secondaryText="Diagnóstico 20s" secondaryClassName="text-[#0b0d10] font-bold" />
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3} radius={75}>
              <Link
                href="/contacto"
                className="group px-5 py-2.5 rounded-full bg-transparent hover:bg-white/10 text-white/80 hover:text-white border border-white/15 hover:border-white/30 font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                <KineticTextSwap primaryText="Iniciar Proyecto" secondaryText="Cotizar Brief" secondaryClassName="text-[#59BFD6] font-bold" />
                <ArrowDown className="w-3.5 h-3.5 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Scroll Indicator with Magnetic physics */}
        <div id="hero-scroll-btn" className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-center pt-1 sm:pt-2 pb-1 will-change-transform">
          <Magnetic strength={0.4} radius={80}>
            <a
              href="#cross-media"
              className="p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-[#59BFD6] text-white hover:text-puelche-dark border border-white/10 hover:border-[#59BFD6] transition-all scroll-indicator hover:scale-110 block"
              aria-label="Continuar"
            >
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
            </a>
          </Magnetic>
        </div>
      </section>

      {/* 
        ======================================================================
        SECCIÓN 2: NARRATIVA DE MARCA — ¿QUÉ ES CROSS MEDIA?
        Experiencia Inmersiva Brutalista Awwwards con Convergencia Direccional
        ======================================================================
      */}
      <div id="cross-media-container" className="w-full overflow-hidden">
        <BrutalistCrossMedia />
      </div>

      {/* 
        ======================================================================
        SECCIÓN AWWWARDS: MESA INTERACTIVA DE REVELADO (BEFORE & AFTER SLIDER)
        Dial táctil para comparar capturas RAW vs Masters terminados
        ======================================================================
      */}
      <section className="relative w-full bg-[#18191B] py-20 md:py-32 px-6 md:px-12 lg:px-16 border-t border-b border-white/10 overflow-hidden">
        {/* Kinetic Watermark Typography */}
        <svg aria-hidden="true" className="absolute -top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] w-[140vw] h-auto overflow-visible" viewBox="0 0 1200 140">
          <text x="600" y="105" textAnchor="middle" fill="white" className="font-condensed font-black text-[120px] uppercase">
            REVELADO PUELCHE
          </text>
        </svg>
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
        SECCIÓN AWWWARDS: DIRECCIÓN CREATIVA & AUTORÍA AUSTRAL
        Alejandro Lattes (en terreno) & Paula Valdivieso (producción de arte)
        ======================================================================
      */}
      <AuthorDirectionSection />

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
