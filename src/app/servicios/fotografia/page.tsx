'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, X, ChevronRight, ChevronLeft, ArrowDown, Eye, ArrowRight, Compass, Sparkles } from 'lucide-react';

interface PhotoProject {
  id: string;
  client: string;
  location: string;
  specialty: string;
  image: string;
  gallery: string[];
  tag?: string;
  quote?: string;
}

const FEATURED_EXPEDITIONS: PhotoProject[] = [
  {
    id: 'nazca-oceanografia',
    client: 'Nazca Oceanografía & Robótica Submarina',
    location: 'Puerto Montt & Océano Pacífico',
    specialty: 'Servicios oceanográficos, batimetría y robot submarino DEFENDER.',
    image: '/images/real/facebook/fb-nazca-1.jpg',
    gallery: [
      '/images/real/facebook/fb-nazca-1.jpg',
      '/images/real/facebook/fb-nazca-2.jpg',
      '/images/real/facebook/fb-nazca-3.jpg',
    ],
    tag: 'Faena en Alta Mar',
    quote: 'Realizamos una producción integral de fotografía y dron para Nazca, especialista en servicios oceanográficos, hidrográficos y robótica submarina, con el objetivo de documentar sus operaciones en terreno.',
  },
  {
    id: 'cohosting-chile',
    client: 'CoHosting Chile — Interiorismo Austral',
    location: 'Puerto Varas & Lago Llanquihue',
    specialty: 'Fotografía de interiores, luz natural y arquitectura residencial contemporánea.',
    image: '/images/real/facebook/fb-cohosting-1.jpg',
    gallery: [
      '/images/real/facebook/fb-cohosting-1.jpg',
      '/images/real/facebook/fb-cohosting-2.jpg',
    ],
    tag: 'Interiorismo Boutique',
    quote: 'Un nuevo trabajo de fotografía de interiores e inmobiliario para nuestros queridos amigos de @cohostingchile, una bellísima casa a las afueras de Puerto Varas, exquisita luz y vistas abiertas al sur.',
  },
  {
    id: 'parcelaciones-sur',
    client: 'Parcelaciones & Cuencas Fluviales',
    location: 'Cuenca Austral & Llanquihue',
    specialty: 'Fotografía aérea y dron 4K de loteos ecológicos y ríos patagónicos.',
    image: '/images/real/facebook/fb-parcelacion-1.jpg',
    gallery: [
      '/images/real/facebook/fb-parcelacion-1.jpg',
      '/images/real/facebook/fb-parcelacion-2.jpg',
    ],
    tag: 'Dron & Paisajismo',
    quote: 'Registro aéreo de alta resolución capturando los meandros del río, praderas de pastizales y el desarrollo de parcelaciones de conservación en equilibrio con el ecosistema.',
  },
  {
    id: 'estancia-rilan',
    client: 'Estancia Rilán — Hotel y Cava',
    location: 'Península de Rilán, Chiloé',
    specialty: 'Fotografías de interiores, arquitectura vernácula y cava subterránea.',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
      '/images/real/bg-portafolios-fotografia-min.jpg',
      '/images/real/bg-home-2.jpg',
    ],
    tag: 'Hito de Hospitalidad',
    quote: 'Captura de la quietud y luz austral en la península de Rilán, documentando la comunión entre la arquitectura contemporánea de maderas nativas y la gastronomía del mar interior.',
  },
];

const REAL_PHOTO_PROJECTS: PhotoProject[] = [
  {
    id: 'nazca-oceanografia-grid',
    client: 'Nazca Oceanografía & Robótica Submarina',
    location: 'Puerto Montt & Océano Pacífico.',
    specialty: 'Faena marítima, batimetría y robot submarino DEFENDER.',
    image: '/images/real/facebook/fb-nazca-1.jpg',
    gallery: [
      '/images/real/facebook/fb-nazca-1.jpg',
      '/images/real/facebook/fb-nazca-2.jpg',
      '/images/real/facebook/fb-nazca-3.jpg',
    ],
  },
  {
    id: 'cohosting-chile-grid',
    client: 'CoHosting Chile',
    location: 'Puerto Varas & Lago Llanquihue.',
    specialty: 'Fotografía de interiores e inmobiliario de alta gama.',
    image: '/images/real/facebook/fb-cohosting-1.jpg',
    gallery: [
      '/images/real/facebook/fb-cohosting-1.jpg',
      '/images/real/facebook/fb-cohosting-2.jpg',
    ],
  },
  {
    id: 'parcelaciones-sur-grid',
    client: 'Parcelaciones & Cuencas Fluviales',
    location: 'Cuenca Austral & Llanquihue.',
    specialty: 'Fotografía aérea y dron 4K de loteos ecológicos y ríos.',
    image: '/images/real/facebook/fb-parcelacion-1.jpg',
    gallery: [
      '/images/real/facebook/fb-parcelacion-1.jpg',
      '/images/real/facebook/fb-parcelacion-2.jpg',
    ],
  },
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
  {
    id: 'turistour-expediciones',
    client: 'Turistour Patagonia',
    location: 'Puerto Varas & Cruce Andino.',
    specialty: 'Fotografía de expediciones, turismo lacustre y territorio.',
    image: '/images/real/facebook/albums/turistour/turistour_001.jpg',
    gallery: [
      '/images/real/facebook/albums/turistour/turistour_001.jpg',
      '/images/real/facebook/albums/turistour/turistour_002.jpg',
      '/images/real/facebook/albums/turistour/turistour_003.jpg',
      '/images/real/facebook/albums/turistour/turistour_004.jpg',
    ],
  },
];

export default function FotografiaPage() {
  const [activeModalProject, setActiveModalProject] = useState<PhotoProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeExpeditionIdx, setActiveExpeditionIdx] = useState(0);

  const openModal = (proj: PhotoProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_PHOTO_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % REAL_PHOTO_PROJECTS.length;
    setActiveModalProject(REAL_PHOTO_PROJECTS[nextIdx]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_PHOTO_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + REAL_PHOTO_PROJECTS.length) % REAL_PHOTO_PROJECTS.length;
    setActiveModalProject(REAL_PHOTO_PROJECTS[prevIdx]);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    if (!activeModalProject) return;
    if (activeModalProject.gallery.length > 1 && currentImageIndex < activeModalProject.gallery.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      nextProject();
    }
  };

  const handlePrev = () => {
    if (!activeModalProject) return;
    if (activeModalProject.gallery.length > 1 && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    } else {
      prevProject();
    }
  };

  const nextImage = handleNext;
  const prevImage = handlePrev;

  const nextExpedition = () => {
    setActiveExpeditionIdx((prev) => (prev + 1) % FEATURED_EXPEDITIONS.length);
  };

  const prevExpedition = () => {
    setActiveExpeditionIdx((prev) =>
      prev === 0 ? FEATURED_EXPEDITIONS.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as any).lenisInstance : null;
    if (activeModalProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehaviorX = 'none';
      document.documentElement.style.overscrollBehaviorX = 'none';

      let accumulatorX = 0;
      let isMomentumLocked = false;
      let unlockTimer: NodeJS.Timeout | null = null;
      const HORIZONTAL_THRESHOLD = 140;

      const handleModalWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > 0) {
          e.preventDefault();
        }

        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 3;
        if (!isHorizontal) return;

        e.preventDefault();
        e.stopPropagation();

        if (isMomentumLocked) {
          if (unlockTimer) clearTimeout(unlockTimer);
          unlockTimer = setTimeout(() => {
            isMomentumLocked = false;
            accumulatorX = 0;
          }, 250);
          return;
        }

        accumulatorX += e.deltaX;

        if (Math.abs(accumulatorX) >= HORIZONTAL_THRESHOLD) {
          isMomentumLocked = true;
          if (accumulatorX > 0) {
            handleNext();
          } else {
            handlePrev();
          }
          accumulatorX = 0;

          if (unlockTimer) clearTimeout(unlockTimer);
          unlockTimer = setTimeout(() => {
            isMomentumLocked = false;
            accumulatorX = 0;
          }, 700);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleNext();
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handlePrev();
        if (e.key === 'ArrowDown' || e.key === 'PageDown') nextProject();
        if (e.key === 'ArrowUp' || e.key === 'PageUp') prevProject();
      };

      let touchStartX = 0;
      let touchStartY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(deltaX) > Math.abs(deltaY) * 1.5 && Math.abs(deltaX) > 60) {
            if (deltaX < 0) {
              handleNext();
            } else {
              handlePrev();
            }
          }
        }
      };

      window.addEventListener('wheel', handleModalWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        if (unlockTimer) clearTimeout(unlockTimer);
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        document.body.style.overscrollBehaviorX = '';
        document.documentElement.style.overscrollBehaviorX = '';
        window.removeEventListener('wheel', handleModalWheel);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      document.body.style.overscrollBehaviorX = '';
      document.documentElement.style.overscrollBehaviorX = '';
    }
  }, [activeModalProject, currentImageIndex]);

  const currentExpedition = FEATURED_EXPEDITIONS[activeExpeditionIdx];

  return (
    <div className="w-full flex flex-col -mt-20 bg-[#0d0e12] text-white selection:bg-[#59BFD6] selection:text-[#0d0e12]">
      {/* ── 1. AUTHENTIC FULL-BLEED 100VH HERO ── */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/25 pointer-events-none" />

        {/* Editorial Title Block */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 z-20 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>DISCIPLINA DE AUTOR &bull; EXPEDICIONES & ÓPTICA AUSTRAL</span>
          </div>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight font-black text-white leading-none drop-shadow-2xl">
            Fotografía
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/80 font-medium pt-1 drop-shadow-md">
            Registro visual para hotelería, arquitectura vernácula, faena marítima e industria en la Patagonia.
          </p>
        </div>

        {/* Bottom Editorial Caption & Scroll Indicator */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] block mb-1">
              ESTUDIO PUELCHE LAB • PUERTO VARAS
            </span>
            <p className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed">
              Registro visual para hotelería, interiorismo, arquitectura, Industria & Procesos en el sur de Chile y Patagonia.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. CARRUSEL CINEMÁTICO AWWWARDS: EXPEDICIONES & FAENA EN TERRENO ── */}
      <section id="carrusel-expediciones" className="bg-[#0b0d11] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-white/10 relative overflow-hidden">
        {/* Ambient Gradient Flares */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-puelche-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-puelche-cyan/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
            <div>
              <div className="flex items-center gap-2 text-puelche-cyan font-mono text-xs uppercase tracking-widest mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Expediciones en Terreno • Faena Marítima, Drones & Arquitectura</span>
              </div>
              <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white">
                Producciones de Alta Complejidad
              </h2>
            </div>

            {/* Paginator & Navigation Controls */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm tracking-widest text-white/60">
                <span className="text-puelche-cyan font-bold">{String(activeExpeditionIdx + 1).padStart(2, '0')}</span> / {String(FEATURED_EXPEDITIONS.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevExpedition}
                  className="p-3 rounded-full bg-white/5 hover:bg-puelche-cyan hover:text-white text-white/80 transition-all border border-white/10 hover:border-puelche-cyan"
                  aria-label="Expedición anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextExpedition}
                  className="p-3 rounded-full bg-white/5 hover:bg-puelche-cyan hover:text-white text-white/80 transition-all border border-white/10 hover:border-puelche-cyan"
                  aria-label="Siguiente expedición"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expedition Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {FEATURED_EXPEDITIONS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveExpeditionIdx(idx)}
                className={`text-left p-3 sm:p-4 rounded-sm transition-all duration-300 border ${
                  activeExpeditionIdx === idx
                    ? 'bg-white/10 border-puelche-cyan shadow-[0_0_20px_rgba(89,191,214,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                }`}
              >
                <span className="font-mono text-[10px] text-puelche-cyan block mb-1">
                  0{idx + 1} • {item.tag}
                </span>
                <span className="font-condensed font-bold text-sm sm:text-base uppercase tracking-wider block text-white truncate">
                  {item.client.split('—')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Expedition Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-white/[0.03] border border-white/10 rounded-sm p-4 sm:p-6 md:p-8">
            {/* Visual Frame Stage (7 cols) - Framed & Centered (Anti-Cropping) */}
            <div
              className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] md:min-h-[540px] rounded-sm overflow-hidden group cursor-pointer bg-[#08090c] border border-white/10 flex items-center justify-center p-4 sm:p-6 md:p-8"
              onClick={() => openModal(currentExpedition)}
            >
              {/* Layer 1: Ambient atmospheric blur glow based on photo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={currentExpedition.image}
                  alt=""
                  fill
                  className="object-cover blur-3xl opacity-20 scale-125"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
              </div>

              {/* Layer 2: Studio Framing Corner Brackets */}
              <div className="absolute inset-3 border border-white/10 rounded-sm pointer-events-none z-10" />
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-puelche-cyan pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-puelche-cyan pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-puelche-cyan pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-puelche-cyan pointer-events-none z-10" />

              {/* Layer 3: Main Artwork Centered in Frame - 100% visible, complete, never cropped */}
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center z-10">
                <Image
                  src={currentExpedition.image}
                  alt={currentExpedition.client}
                  fill
                  priority
                  className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-puelche-cyan text-white font-condensed text-xs uppercase font-bold tracking-wider rounded-sm shadow-md">
                  {currentExpedition.tag}
                </span>
                <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-white/90 font-mono text-[11px] uppercase tracking-wider rounded-sm border border-white/15">
                  {currentExpedition.gallery.length} tomas de alta resolución
                </span>
              </div>

              {/* Hover Action */}
              <div className="absolute bottom-5 right-5 z-20 bg-black/80 backdrop-blur-md group-hover:bg-puelche-cyan text-white px-4 py-2 rounded-sm text-xs font-condensed uppercase tracking-wider font-bold transition-all flex items-center gap-2 border border-white/20 group-hover:border-puelche-cyan shadow-xl">
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Galería Completa</span>
              </div>
            </div>

            {/* Narrative & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-puelche-cyan">
                  <span>{currentExpedition.location}</span>
                </div>
                <h3 className="font-condensed text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white leading-tight">
                  {currentExpedition.client}
                </h3>
                <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                  {currentExpedition.specialty}
                </p>

                {currentExpedition.quote && (
                  <div className="p-4 bg-white/[0.04] border-l-2 border-puelche-cyan rounded-r-sm space-y-2 mt-4">
                    <p className="font-sans text-xs sm:text-sm text-white/90 font-light italic leading-relaxed">
                      &ldquo;{currentExpedition.quote}&rdquo;
                    </p>
                    <span className="text-[11px] font-condensed uppercase tracking-wider text-puelche-cyan block font-semibold">
                      — Puelche Lab Producciones, Puerto Varas
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openModal(currentExpedition)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-puelche-cyan text-white font-condensed uppercase tracking-wider font-bold text-sm rounded-sm hover:bg-puelche-cyan-dark transition-all shadow-md hover:scale-[1.02]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explorar Fotografías</span>
                </button>
                <Link
                  href={`/contacto?servicio=Fotograf%C3%ADa&proyecto=${encodeURIComponent(currentExpedition.client)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-white text-white font-condensed uppercase tracking-wider font-bold text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  <span>Cotizar Faena</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PANORAMIC PROJECT BANDS WITH OPTICAL HOVER ── */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 group-hover:from-black/60 transition-colors duration-500 pointer-events-none" />

            {/* Luxury Obsidian Card on Bottom Left */}
            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-[#0d0e12]/85 backdrop-blur-md border border-white/15 text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#59BFD6]/50">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#59BFD6] block mb-1">
                Expedición {idx + 1} de {REAL_PHOTO_PROJECTS.length}
              </span>
              <h2 className="font-condensed uppercase tracking-wider text-xl sm:text-2xl font-bold leading-snug text-white">
                CLIENTE: {proj.client.toUpperCase()}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/80 mt-1 font-light">
                {proj.location}
              </p>
              <p className="font-sans text-xs text-white/60 font-light">
                {proj.specialty}
              </p>

              {/* Interactive View CTA Button */}
              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                <button
                  onClick={() => openModal(proj)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold text-[#59BFD6] hover:text-white transition-colors"
                >
                  <span>VER FOTOGRAFÍAS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-white/60 font-mono">
                  {idx + 1} / {REAL_PHOTO_PROJECTS.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 4. BOTTOM CTA ── */}
      <section className="bg-[#141519] py-20 px-6 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold text-white">
            ¿Planeando una producción fotográfica en el sur?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/70 font-light">
            Equipo técnico para condiciones extremas, ópticas luminosas fijas y registro en dron 4K para proyectos en toda la Patagonia.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/servicios#fotografia"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-xs font-condensed uppercase tracking-wider text-white font-bold transition-all"
            >
              Ver en One-Page de Servicios
            </Link>
            <Link
              href="/contacto?servicio=Fotograf%C3%ADa"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-widest text-xs font-bold rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
            >
              <span>Cotizar Producción</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. LIGHTBOX MODAL WITH REAL GALLERY AND LENIS PAUSE ── */}
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
                {activeModalProject.location} &bull; {activeModalProject.specialty}
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

          {/* Active Image Canvas */}
          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden bg-black/60 rounded-sm border border-white/10 p-4 sm:p-6">
            {/* Ambient blur behind lightbox image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt=""
                fill
                className="object-cover blur-3xl opacity-20 scale-125"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative w-full h-full max-w-5xl max-h-[78vh] flex items-center justify-center z-10">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Foto ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
              />
            </div>

            {/* Botones Laterales Flotantes en Pantalla (< y >) */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Fotografía anterior (←)"
              title="Anterior (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Siguiente fotografía (→)"
              title="Siguiente (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Barrita Lateral Tickeable de Proyectos de Fotografía */}
            <aside
              aria-label="Expediciones fotográficas"
              className="hidden lg:flex absolute right-4 bottom-4 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl"
            >
              {REAL_PHOTO_PROJECTS.map((proj, idx) => {
                const isActive = proj.id === activeModalProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(proj);
                      setCurrentImageIndex(0);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-5 h-1.5 bg-[#59BFD6] shadow-[0_0_8px_#59BFD6]'
                        : 'w-2 h-1 bg-white/30 hover:bg-white/80 hover:w-3.5'
                    }`}
                    title={`${idx + 1}. ${proj.client}`}
                    aria-label={`Ver ${proj.client}`}
                  />
                );
              })}
            </aside>
          </div>

          {/* Footer & Conversion Link */}
          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div>
              Imagen <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
              <span className="font-bold">{activeModalProject.gallery.length}</span>
            </div>
            <Link
              href={`/contacto?proyecto=${encodeURIComponent(activeModalProject.client)}`}
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
