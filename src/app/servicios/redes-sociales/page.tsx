'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, X, ChevronRight, ChevronLeft, Eye, ArrowRight, Instagram, Sparkles } from 'lucide-react';

interface SocialProject {
  id: string;
  client: string;
  location: string;
  specialty: string;
  image: string;
  gallery: string[];
}

const REAL_SOCIAL_PROJECTS: SocialProject[] = [
  {
    id: 'blue-seal-social',
    client: 'BlueSeal.SPA',
    location: 'Puerto Montt & Océano Pacífico',
    specialty: 'Estrategia de contenidos, comunidad digital y difusión técnica submarina',
    image: '/images/real/bg-redes-1-min.jpg',
    gallery: [
      '/images/real/bg-redes-1-min.jpg',
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    ],
  },
  {
    id: 'estrategia-social-puelche',
    client: 'Estrategia & Difusión Cross-Media',
    location: 'Puerto Varas, Región de Los Lagos',
    specialty: 'Gestión y segmentación publicitaria para marcas del territorio austral',
    image: '/images/real/bg-redes-1-min.jpg',
    gallery: [
      '/images/real/bg-redes-1-min.jpg',
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    ],
  },
];

export default function RedesSocialesPage() {
  const [activeModalProject, setActiveModalProject] = useState<SocialProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (proj: SocialProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextImage = () => {
    if (!activeModalProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % activeModalProject.gallery.length);
  };

  const prevImage = () => {
    if (!activeModalProject) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeModalProject.gallery.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as any).lenisInstance : null;
    if (activeModalProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
  }, [activeModalProject]);

  return (
    <div className="w-full flex flex-col -mt-20 bg-white selection:bg-puelche-cyan selection:text-white">
      {/* ── 1. AUTHENTIC HERO BANNER (MacBook Pro BlueSeal shot - Matches media_1793374347503_6ca7696d 1:1) ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <Image
          src="/images/real/bg-redes-1-min.jpg"
          alt="Puelche Lab - Redes Sociales"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35" />

        {/* Floating Cyan Pill: REDES SOCIALES (Left-anchored on bottom left of screen) */}
        <div className="absolute bottom-12 left-0 sm:left-4 md:left-6 z-20">
          <div className="bg-puelche-cyan text-white pl-6 pr-8 sm:pl-8 sm:pr-12 py-3.5 sm:py-5 rounded-r-2xl sm:rounded-r-3xl shadow-[0_10px_35px_rgba(89,191,214,0.4)] flex items-center gap-3 backdrop-blur-sm transition-transform duration-300 hover:translate-x-1">
            <h1 className="font-condensed text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider font-extrabold leading-none">
              REDES SOCIALES
            </h1>
          </div>
        </div>

        {/* Bottom Right Cue to Section 2 */}
        <div className="absolute bottom-12 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-3 text-white">
          <button
            onClick={() => openModal(REAL_SOCIAL_PROJECTS[0])}
            className="px-5 py-2.5 rounded-full bg-black/60 hover:bg-puelche-cyan text-white text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Caso BlueSeal.SPA</span>
          </button>
          <a
            href="#estrategia"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Ir a estrategia"
          >
            <ArrowDown className="w-4 h-4 animate-bounce text-puelche-cyan" />
          </a>
        </div>
      </section>

      {/* ── 2. SECTION 2: ORGANIC EDITORIAL TYPOGRAPHY ON LANDSCAPE (Matches media_1793383637189_59b0015a 1:1) ── */}
      <section
        id="estrategia"
        className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black text-white px-6 sm:px-12"
      >
        {/* Full Viewport Landscape Image: Patagonian Grassland with wooden fence */}
        <Image
          src="/images/real/bg-redes-2-min.jpg"
          alt="Estrategia en Redes Sociales Puelche Lab"
          fill
          priority
          className="object-cover object-center scale-105 will-change-transform"
        />

        {/* Subtle, soft ambient vignette allowing the landscape and text to breathe naturally */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

        {/* Centered Organic Poetic Copy (Identical to original site) */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Main Headline with delicate editorial tracking */}
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug sm:leading-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] tracking-normal">
            Aplicamos las estrategias que tu marca necesita para atraer,{' '}
            <span className="font-normal italic">convertir y fidelizar clientes en tus redes sociales.</span>
          </h2>

          {/* Body Paragraph */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Creamos y administramos comunidades digitales en Facebook, Twitter, YouTube, Instagram, LinkedIn y otras redes sociales. 
            Configuramos, administramos y monitoreamos cuentas en redes sociales, diseñando una estrategia a través de anuncios publicitarios que se adecuan al objetivo de tu negocio.
          </p>

          {/* Interactive Portal Icon: 'Haz click en el ícono para ir a conocer nuestro trabajo' */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-3">
            <button
              onClick={() => openModal(REAL_SOCIAL_PROJECTS[0])}
              data-cursor="explore"
              data-cursor-text="VER CASO"
              className="group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-puelche-cyan/90 hover:bg-puelche-cyan text-white flex items-center justify-center shadow-[0_0_30px_rgba(89,191,214,0.5)] transition-all duration-300 hover:scale-110 border border-white/40"
              aria-label="Abrir caso BlueSeal.SPA"
            >
              <Instagram className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover/btn:scale-110" />
              <div className="absolute inset-0 rounded-full animate-ping bg-puelche-cyan opacity-25 pointer-events-none" />
            </button>
            <span className="font-mono text-xs sm:text-sm text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wider">
              Haz click en el ícono para ir a conocer nuestro trabajo.
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM CTA ── */}
      <section className="bg-white py-20 px-6 text-center border-t border-gray-100">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            ESTRATEGIA & GESTIÓN DIGITAL
          </span>
          <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Listo para llevar tus redes a un nivel profesional?
          </h3>
          <p className="font-sans text-sm sm:text-base text-puelche-gray font-light leading-relaxed">
            Conversemos sobre tu marca y diseñemos una pauta de contenidos auténtica, con fotografía real en Puerto Varas y la Patagonia.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-lg hover:scale-105 duration-200"
            >
              <span>Cotizar Redes Sociales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. LIGHTBOX MODAL FOR HIGH-RES ASSETS ── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div>
              <span className="text-puelche-cyan font-condensed uppercase tracking-widest text-xs font-bold block">
                Puelche Lab • Redes Sociales
              </span>
              <h2 className="text-lg sm:text-2xl font-condensed font-bold tracking-wide uppercase">
                {activeModalProject.client}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans font-light">
                {activeModalProject.location} • {activeModalProject.specialty}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Display */}
          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Fotografía ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            {activeModalProject.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Fotografía anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Siguiente fotografía"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div>
              Imagen <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
              <span className="font-bold">{activeModalProject.gallery.length}</span>
            </div>
            <Link
              href="/contacto"
              className="text-puelche-cyan font-condensed uppercase tracking-wider font-bold hover:underline"
            >
              Cotizar Proyecto Similar &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
