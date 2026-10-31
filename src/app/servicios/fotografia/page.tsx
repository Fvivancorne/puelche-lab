'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, X, ChevronRight, ChevronLeft, ArrowDown, Eye, ArrowRight } from 'lucide-react';

interface PhotoProject {
  id: string;
  client: string;
  location: string;
  specialty: string;
  image: string;
  gallery: string[];
}

const REAL_PHOTO_PROJECTS: PhotoProject[] = [
  {
    id: 'estancia-rilan',
    client: 'Estancia Rilan, Hotel y Cava.',
    location: 'Península de Rilán, Chiloé.',
    specialty: 'Fotografías de interiores e inmobiliario',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
      '/images/real/bg-portafolios-fotografia-min.jpg',
      '/images/real/bg-home-2.jpg',
    ],
  },
  {
    id: 'cala-meli',
    client: 'Cala Melí, Cabañas.',
    location: 'Puerto Varas.',
    specialty: 'Fotografías de interiores e inmobiliario.',
    image: '/images/real/bg-portafolios-fotografia-b-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-b-min.jpg',
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
    ],
  },
  {
    id: 'costaustralis',
    client: 'Costaustralis, Hotel.',
    location: 'Puerto Natales.',
    specialty: 'Fotografías de interiores e inmobiliario.',
    image: '/images/real/bg-portafolios-fotografia-c-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-c-min.jpg',
      '/images/real/bg-portafolios-fotografia-b-min.jpg',
    ],
  },
  {
    id: 'cabo-de-hornos',
    client: 'Cabo de Hornos, Hotel.',
    location: 'Punta Arenas.',
    specialty: 'Fotografías de interiores e inmobiliario.',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-d-min.jpg',
      '/images/real/bg-portafolios-fotografia-c-min.jpg',
    ],
  },
  {
    id: 'muebles-yunge',
    client: 'Muebles Yunge.',
    location: 'Puerto Varas.',
    specialty: 'Fotografías de interiores e inmobiliario.',
    image: '/images/real/bg-fotografia-6-min.jpg',
    gallery: [
      '/images/real/bg-fotografia-6-min.jpg',
      '/images/real/bg-portafolios-fotografia-d-min.jpg',
    ],
  },
  {
    id: 'tagua-tagua',
    client: 'Tagua Tagua, Lodge.',
    location: 'Río Puelo / Cochamó.',
    specialty: 'Fotografías de interiores e inmobiliario.',
    image: '/images/real/bg-portafolios-fotografia-f-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-f-min.jpg',
      '/images/real/bg-agencia.jpg',
    ],
  },
  {
    id: 'aquachile',
    client: 'Aqua Chile.',
    location: 'Puerto Montt & Fiordos.',
    specialty: 'Fotografía de producto / Industria & Procesos.',
    image: '/images/real/bg-portafolios-fotografia-g-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-g-min.jpg',
      '/images/real/bg-fotografia-9-min.jpg',
    ],
  },
  {
    id: 'hotel-ohana',
    client: 'Hotel Ohana.',
    location: 'Isla Rapa Nui.',
    specialty: 'Fotografías de interiores e inmobiliario.',
    image: '/images/real/bg-fotografia-9-min.jpg',
    gallery: [
      '/images/real/bg-fotografia-9-min.jpg',
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
    ],
  },
  {
    id: 'maestranza-san-aurelio',
    client: 'Maestranza San Aurelio.',
    location: 'Puerto Montt.',
    specialty: 'Fotografía de procesos productivos.',
    image: '/images/real/bg-portafolios-fotografia-h-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-h-min.jpg',
      '/images/real/bg-fotografia-9-min.jpg',
    ],
  },
  {
    id: 'soldasur',
    client: 'Soldasur.',
    location: 'Puerto Montt.',
    specialty: 'Fotografía de procesos productivos.',
    image: '/images/real/bg-portafolios-fotografia-i-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-i-min.jpg',
      '/images/real/bg-portafolios-fotografia-h-min.jpg',
    ],
  },
];

export default function FotografiaPage() {
  const [activeModalProject, setActiveModalProject] = useState<PhotoProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (proj: PhotoProject) => {
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
      {/* ── 1. AUTHENTIC FULL-BLEED 100VH HERO (Matches original puelchelab.cl/fotografia-y-edicion-2/ 1:1) ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        {/* Full Viewport Background Image: Estancia Rilán pavilion at night with starry sky */}
        <Image
          src="/images/real/bg-portafolios-fotografia-min.jpg"
          alt="Fotografía Puelche Lab - Pabellón Estancia Rilán bajo cielo estrellado"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-subtle transition-transform duration-1000"
        />

        {/* Cinematic ambient optical vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Floating Cyan Pill: FOTOGRAFÍA (Left-anchored exactly like original site) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 md:left-6 z-20">
          <div className="bg-puelche-cyan text-white pl-6 pr-8 sm:pl-8 sm:pr-12 py-3.5 sm:py-5 rounded-r-2xl sm:rounded-r-3xl shadow-[0_10px_35px_rgba(89,191,214,0.4)] flex items-center gap-3 backdrop-blur-sm transition-transform duration-300 hover:translate-x-1">
            <h1 className="font-condensed text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider font-extrabold leading-none">
              FOTOGRAFÍA
            </h1>
          </div>
        </div>

        {/* Bottom Editorial Caption & Scroll Indicator */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-puelche-cyan block mb-1">
              ESTUDIO PUELCHE LAB • PUERTO VARAS
            </span>
            <p className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed">
              Registro visual para hotelería, interiorismo, arquitectura, Industria & Procesos en el sur de Chile y Patagonia.
            </p>
          </div>

          <a
            href="#obras"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-puelche-cyan transition-colors"
          >
            <span>Deslizar para explorar obras</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-puelche-cyan" />
          </a>
        </div>
      </section>

      {/* ── 2. PANORAMIC PROJECT BANDS WITH OPTICAL HOVER ── */}
      <section id="obras" className="w-full flex flex-col" aria-label="Proyectos de Fotografía">
        {REAL_PHOTO_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            data-cursor="explore"
            data-cursor-text="VER FOTOS"
            className="relative w-full h-[480px] sm:h-[550px] md:h-[620px] overflow-hidden group border-b border-gray-900/15 cursor-pointer"
            onClick={() => openModal(proj)}
          >
            {/* Panoramic Background Image with smooth telephoto zoom on hover */}
            <Image
              src={proj.image}
              alt={proj.client}
              fill
              priority={idx < 2}
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
            />
            {/* Ambient Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 group-hover:from-black/80 transition-colors duration-500" />

            {/* Signature Puelche Cyan Overlay Card on Bottom Left */}
            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(89,191,214,0.35)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 block mb-1">
                Expedición {idx + 1} de {REAL_PHOTO_PROJECTS.length}
              </span>
              <h2 className="font-condensed uppercase tracking-wider text-xl sm:text-2xl font-bold leading-snug">
                Cliente: {proj.client}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-1 font-light">
                {proj.location}
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-0.5 font-light">
                {proj.specialty}
              </p>

              <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(proj);
                  }}
                  className="inline-flex items-center gap-2 font-condensed uppercase tracking-widest text-xs sm:text-sm font-bold text-white hover:text-white/80 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>VER FOTOGRAFÍAS</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-[11px] text-white/70 font-mono">1920 × 1010 HD</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 3. BOTTOM CTA ── */}
      <section className="bg-white py-20 px-6 text-center border-t border-gray-100">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            PRODUCCIÓN FOTOGRÁFICA EN TERRENO
          </span>
          <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Planeando documentar tu arquitectura, hotel o faena?
          </h3>
          <p className="font-sans text-sm sm:text-base text-puelche-gray font-light leading-relaxed">
            Operamos con equipo propio, ópticas de primera línea y drones 4K en Puerto Varas, Chiloé, Llanquihue y toda la Patagonia.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-lg hover:scale-105 duration-200"
            >
              <span>Cotizar Producción Fotográfica</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. LIGHTBOX MODAL ── */}
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
                Puelche Lab • Fotografía de Autor
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
              Fotografía <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
              <span className="font-bold">{activeModalProject.gallery.length}</span>
            </div>
            <Link
              href="/contacto"
              className="text-puelche-cyan font-condensed uppercase tracking-wider font-bold hover:underline"
            >
              Cotizar Expedición Similar &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
