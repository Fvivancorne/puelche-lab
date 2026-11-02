'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sliders, X, ChevronRight, ChevronLeft, ArrowRight, ArrowDown, Eye } from 'lucide-react';

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
      {/* ── 1. AUTHENTIC FULL-BLEED 100VH HERO ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <Image
          src="/images/real/bg-edit-fotografica-1-min.jpg"
          alt="Puelche Lab - Edición Fotográfica & Revelado Digital"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* Floating Cyan Pill: EDICIÓN FOTOGRÁFICA */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 md:left-6 z-20">
          <div className="bg-puelche-cyan text-white pl-6 pr-8 sm:pl-8 sm:pr-12 py-3.5 sm:py-5 rounded-r-2xl sm:rounded-r-3xl shadow-[0_10px_35px_rgba(89,191,214,0.4)] flex items-center gap-3 backdrop-blur-sm transition-transform duration-300 hover:translate-x-1">
            <h1 className="font-condensed text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider font-extrabold leading-none">
              EDICIÓN FOTOGRÁFICA
            </h1>
          </div>
        </div>

        {/* Bottom Caption & Cue */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-puelche-cyan block mb-1">
              SALA DE MAGIA DIGITAL • PUELCHE LAB
            </span>
            <p className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed">
              Retoque digital de precisión, revelado digital de archivos RAW y color grading para fotografía publicitaria, industrial y de arquitectura.
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 group-hover:from-black/80 transition-colors duration-500" />

            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgba(89,191,214,0.35)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 block mb-1">
                Postproducción {idx + 1} de {REAL_EDICION_PROJECTS.length}
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
                  <span>VER DETALLES</span>
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
            SALA DE MAGIA DIGITAL
          </span>
          <h3 className="font-condensed text-3xl sm:text-4xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Necesitas retoque de nivel publicitario o color grading?
          </h3>
          <p className="font-sans text-sm sm:text-base text-puelche-gray font-light leading-relaxed">
            Tratamiento cromático, eliminación de impurezas y calibración tonal para catálogos fine art y campañas de alto impacto.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-lg hover:scale-105 duration-200"
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

            {activeModalProject.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
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
