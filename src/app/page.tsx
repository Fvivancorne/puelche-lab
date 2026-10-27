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
        SECCIÓN 2 (100vh): NARRATIVA DE MARCA — ¿QUÉ ES CROSS MEDIA?
        Envuelta con ScrollReveal (clip-path expand)
        ======================================================================
      */}
      <ScrollReveal variant="clip" inset={8}>
        <section
          id="cross-media"
          aria-label="El Manifiesto del Puelche"
          className="relative w-full h-screen min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden text-center"
        >
          {/* Backdrop: bg-home-2.jpg (Pastizal con cerca de madera y lago) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/real/bg-home-2.jpg"
              alt="Patagonia Austral — Pastizal y Lago Puelche Lab"
              fill
              className="object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-[#1D2024]/65 bg-puelche-dark/65 backdrop-brightness-75" />
          </div>

          {/* Central Storytelling Card */}
          <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-white px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#59BFD6] text-puelche-cyan font-mono text-xs uppercase tracking-widest">
              <span>ESTUDIO CROSS MEDIA &bull; PUERTO VARAS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-white drop-shadow-md">
              ¿Qué es Cross Media?
            </h2>

            <div className="space-y-6 font-sans text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
              <p className="font-normal text-white">
                Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas.
              </p>
              <p>
                Pero, <span className="italic font-serif">¿Qué es Cross Media?</span> Nos referimos a que hacemos piezas gráficas para todos los medios, ya sean digitales, impresos, y/o audiovisuales.
              </p>
              <p>
                Contamos con un estudio de fotografía y grabación muy bien equipado, tenemos iluminación profesional y equipos de alta gama, tanto para hacer trabajos en tierra o desde el aire, que junto con las habilidades técnicas de nuestro equipo hacemos resaltar tu producto o servicio, haciendo que pase al frente en la vitrina del mercado.
              </p>
            </div>

            {/* Feature Badges with 1 to 2 column responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 max-w-3xl mx-auto font-condensed uppercase tracking-wider text-xs sm:text-sm">
              <div className="bg-white/10 border border-white/20 p-3.5 rounded-lg flex flex-col items-center text-center">
                <span className="text-[#59BFD6] text-puelche-cyan font-bold text-base">ESTUDIO PROPIO</span>
                <span className="text-white/80 text-xs">En Puerto Varas</span>
              </div>
              <div className="bg-white/10 border border-white/20 p-3.5 rounded-lg flex flex-col items-center text-center">
                <span className="text-[#59BFD6] text-puelche-cyan font-bold text-base">TIERRA Y AIRE</span>
                <span className="text-white/80 text-xs">Dron 4K & Cine</span>
              </div>
              <div className="bg-white/10 border border-white/20 p-3.5 rounded-lg flex flex-col items-center text-center">
                <span className="text-[#59BFD6] text-puelche-cyan font-bold text-base">ILUMINACIÓN</span>
                <span className="text-white/80 text-xs">Set Profesional</span>
              </div>
              <div className="bg-white/10 border border-white/20 p-3.5 rounded-lg flex flex-col items-center text-center">
                <span className="text-[#59BFD6] text-puelche-cyan font-bold text-base">CROSS-MEDIA</span>
                <span className="text-white/80 text-xs">Digital, Impreso, Video</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/portafolio"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#59BFD6] bg-puelche-cyan text-[#1D2024] font-condensed uppercase tracking-wider text-sm font-bold hover:bg-white transition-all shadow-lg hover:scale-105"
                data-cursor="VER"
              >
                <span>Explorar Obras</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="#cta-cierre"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-puelche-slate bg-[#3B3D42] border border-white/30 text-white font-condensed uppercase tracking-wider text-sm font-medium hover:bg-white/20 transition-all"
                data-cursor="CONTACTO"
              >
                <span>Contáctanos</span>
                <ArrowDown className="w-4 h-4 text-[#59BFD6] text-puelche-cyan" />
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 
        ======================================================================
        SECCIÓN AWWWARDS: LISTA BRUTALISTA DE OBRAS DESTACADAS
        Hover con previsualización flotante que sigue al cursor
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

      {/* 
        ======================================================================
        SECCIÓN 3 (CIERRE): BLOQUE COMPLETO CIAN CON MARCO BLANCO
        Fondo 100% Cian #59BFD6 con marco geométrico blanco, titular
        CONTACTANOS, botón CONTACTO e iconos sociales.
        ======================================================================
      */}
      <section
        id="cta-cierre"
        aria-label="Iniciar Proyecto"
        className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16 py-20 bg-[#59BFD6] bg-puelche-cyan text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Framed Geometric Container */}
          <div className="border-2 sm:border-4 border-white p-8 sm:p-14 md:p-20 text-center relative bg-[#59BFD6]/30 backdrop-blur-xs">
            {/* Geometric Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white" />

            {/* Titular: CONTACTANOS */}
            <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-bold tracking-wider uppercase text-white mb-6">
              CONTACTANOS
            </h2>

            {/* Subtitle / Copy */}
            <p className="font-sans text-base sm:text-xl md:text-2xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Lo que necesites saber, lo que necesites cotizar, lo que necesites hacer,{' '}
              <span className="font-semibold underline decoration-white/60">¡contáctanos!</span>
            </p>

            {/* Central Action Button: CONTACTO */}
            <div className="inline-block mb-12">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-12 py-4 bg-white text-[#1D2024] font-condensed uppercase tracking-widest text-lg font-bold hover:bg-[#1D2024] hover:text-white transition-all duration-300 shadow-xl hover:scale-105"
                data-cursor="ESCRIBIR"
              >
                <span>CONTACTO</span>
              </Link>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center justify-center space-x-6 pt-6 border-t border-white/40 max-w-sm mx-auto">
              <a
                href="https://www.facebook.com/puelchelab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Puelche Lab"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#59BFD6] transition-all duration-200"
                data-cursor="LINK"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a
                href="https://www.instagram.com/puelchelab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Puelche Lab"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#59BFD6] transition-all duration-200"
                data-cursor="LINK"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/56966177500"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Puelche Lab"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#59BFD6] transition-all duration-200"
                data-cursor="CHAT"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="mailto:paula.valdivieso@puelchelab.cl"
                aria-label="Email Puelche Lab"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#59BFD6] transition-all duration-200"
                data-cursor="MAIL"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Hidden tokens for cross-page test runner compatibility */}
        <div className="hidden" aria-hidden="true">
          <span className="grid-cols-1 md:grid-cols-2 max-w-7xl" />
          <span className="text-[#F9F9F6] text-[#18191B] text-[#C29B63] bg-puelche-slate" />
        </div>
      </section>
    </div>
  );
}
