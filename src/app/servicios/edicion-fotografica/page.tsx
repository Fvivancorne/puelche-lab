'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sliders, X, ChevronRight, ChevronLeft, ArrowRight, ArrowDown, Eye, Sparkles } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';

interface EditProject {
  id: string;
  client: string;
  location: string;
  specialty: string;
  image: string;
  gallery: string[];
}

const REAL_EDICION_PROJECTS: EditProject[] = [
  {
    id: 'doosan',
    client: 'Doosan.',
    location: 'Zona Sur & Austral.',
    specialty: 'Servicio y venta de equipamientos para la construcción.',
    image: '/images/real/bg-edit-fotografica-2-min.jpg',
    gallery: [
      '/images/real/bg-edit-fotografica-2-min.jpg',
      '/images/real/bg-edit-fotografica-1-min.jpg',
    ],
  },
  {
    id: 'fire-safe',
    client: 'Fire Safe.',
    location: 'Santiago & Los Lagos.',
    specialty: 'Seguridad para edificios y condominios.',
    image: '/images/real/bg-portafolios-edicion-fotografia-2-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-edicion-fotografia-2-min.jpg',
      '/images/real/bg-edit-fotografica-1-min.jpg',
    ],
  },
  {
    id: 'bomberos-santiago',
    client: 'Vigésima Compañía de Bomberos de Santiago.',
    location: 'Santiago, Chile.',
    specialty: 'Compañía especializada en incendios en altura.',
    image: '/images/real/bg-edit-fotografica-7-min.jpg',
    gallery: [
      '/images/real/bg-edit-fotografica-7-min.jpg',
      '/images/real/bg-portafolios-marca-bomberos-min.jpg',
    ],
  },
  {
    id: 'carnaval-del-sur',
    client: 'Carnaval del Sur.',
    location: 'Puerto Varas & Cerro Philippi.',
    specialty: 'Artes y entretención.',
    image: '/images/real/bg-edit-fotografica-9-min.jpg',
    gallery: [
      '/images/real/bg-edit-fotografica-9-min.jpg',
      '/images/real/facebook/albums/carnaval_del_sur/carnaval_del_sur_001.jpg',
      '/images/real/facebook/albums/carnaval_del_sur/carnaval_del_sur_002.jpg',
      '/images/real/facebook/albums/carnaval_del_sur/carnaval_del_sur_003.jpg',
      '/images/real/bg-edit-fotografica-4-min.jpg',
    ],
  },
  {
    id: 'campana-interna-puelche',
    client: 'Campaña interna Puelche Lab.',
    location: 'Puerto Varas, Patagonia.',
    specialty: 'Laboratorio visual de autor & postproducción digital.',
    image: '/images/real/bg-edit-fotografica-5-min.jpg',
    gallery: [
      '/images/real/bg-edit-fotografica-5-min.jpg',
      '/images/real/bg-edit-fotografica-6-min.jpg',
      '/images/real/bg-edit-fotografica-8-min.jpg',
      '/images/real/bg-edit-fotografica-4-min.jpg',
    ],
  },
];

export default function EdicionFotograficaPage() {
  const [activeModalProject, setActiveModalProject] = useState<EditProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (proj: EditProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_EDICION_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % REAL_EDICION_PROJECTS.length;
    setActiveModalProject(REAL_EDICION_PROJECTS[nextIdx]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_EDICION_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + REAL_EDICION_PROJECTS.length) % REAL_EDICION_PROJECTS.length;
    setActiveModalProject(REAL_EDICION_PROJECTS[prevIdx]);
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

  return (
    <div className="w-full flex flex-col -mt-20 bg-[#0d0e12] text-white selection:bg-[#59BFD6] selection:text-[#0d0e12]">
      {/* ── 1. AUTHENTIC FULL-BLEED 100VH HERO ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <Image
          src="/images/real/bg-edit-fotografica-1-min.jpg"
          alt="Puelche Lab - Edición Fotográfica & Revelado Digital"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/25 pointer-events-none" />

        {/* Editorial Title Block */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 z-20 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>DISCIPLINA DE AUTOR &bull; SALA DE MAGIA DIGITAL & COLOR</span>
          </div>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight font-black text-white leading-none drop-shadow-2xl">
            Edición Fotográfica
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/80 font-medium pt-1 drop-shadow-md">
            Revelado digital de archivos RAW, calibración cromática y microtexturas de alta resolución.
          </p>
        </div>

        {/* Bottom Caption & Cue */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] block mb-1">
              SALA DE MAGIA DIGITAL • PUELCHE LAB
            </span>
            <p className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed">
              Retoque digital de precisión, revelado digital de archivos RAW y color grading para fotografía publicitaria, industrial y de arquitectura.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MESA DE REVELADO & RETOQUE FINE ART (BEFORE / AFTER INTERACTIVO) ── */}
      <section id="mesa-de-retoque" className="w-full bg-[#18191B] py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-white/10">
        <BeforeAfterSlider />
      </section>

      {/* ── 3. PANORAMIC PROJECT BANDS WITH OPTICAL HOVER ── */}
      <section id="obras" className="w-full flex flex-col" aria-label="Proyectos de Edición Fotográfica">
        {REAL_EDICION_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            data-cursor="explore"
            data-cursor-text="VER RETOQUE"
            className="relative w-full h-[480px] sm:h-[550px] md:h-[620px] overflow-hidden group border-b border-gray-900/15 cursor-pointer"
            onClick={() => openModal(proj)}
          >
            <Image
              src={proj.image}
              alt={proj.client}
              fill
              priority={idx < 2}
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 group-hover:from-black/60 transition-colors duration-500 pointer-events-none" />

            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-[#0d0e12]/85 backdrop-blur-md border border-white/15 text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#59BFD6]/50">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#59BFD6] block mb-1">
                Postproducción {idx + 1} de {REAL_EDICION_PROJECTS.length}
              </span>
              <h2 className="font-condensed uppercase tracking-wider text-xl sm:text-2xl font-bold leading-snug text-white">
                Cliente: {proj.client}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/80 mt-1 font-light">
                {proj.location}
              </p>
              <p className="font-sans text-xs text-white/60 mt-0.5 font-light">
                {proj.specialty}
              </p>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(proj);
                  }}
                  className="inline-flex items-center gap-2 font-condensed uppercase tracking-widest text-xs sm:text-sm font-bold text-[#59BFD6] hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>VER DETALLES</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="text-[11px] text-white/60 font-mono">1920 × 1010 HD</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 3. BOTTOM CTA ── */}
      <section className="bg-[#141519] py-20 px-6 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-[#59BFD6]">
            SALA DE MAGIA DIGITAL
          </span>
          <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold text-white">
            ¿Necesitas retoque de nivel publicitario o color grading?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Tratamiento cromático, eliminación de impurezas y calibración tonal para catálogos fine art y campañas de alto impacto.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/servicios#edicion-fotografica"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-xs font-condensed uppercase tracking-wider text-white font-bold transition-all"
            >
              Ver en One-Page de Servicios
            </Link>
            <Link
              href="/contacto?servicio=Edici%C3%B3n%20Fotogr%C3%A1fica"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-widest text-xs font-bold rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
            >
              <span>Cotizar Edición Fotográfica</span>
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
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div>
              <span className="text-puelche-cyan font-condensed uppercase tracking-widest text-xs font-bold block">
                Puelche Lab • Edición & Retoque
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

          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
            {/* Ambient blur backdrop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt=""
                fill
                className="object-cover blur-3xl opacity-20 scale-125"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative w-full h-full max-w-6xl max-h-[75vh] z-10 flex items-center justify-center">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Imagen ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Botones Laterales Flotantes en Pantalla (< y >) */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Anterior (←)"
              title="Anterior (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/75 hover:bg-[#59BFD6] text-white hover:text-puelche-dark transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
              aria-label="Siguiente (→)"
              title="Siguiente (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Barrita Lateral Tickeable de Proyectos de Edición */}
            <aside
              aria-label="Proyectos de edición fotográfica"
              className="hidden lg:flex absolute right-4 bottom-4 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl"
            >
              {REAL_EDICION_PROJECTS.map((proj, idx) => {
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

          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div>
              Imagen <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
              <span className="font-bold">{activeModalProject.gallery.length}</span>
            </div>
            <Link
              href="/contacto"
              className="text-puelche-cyan font-condensed uppercase tracking-wider font-bold hover:underline"
            >
              Cotizar Retoque Similar &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
