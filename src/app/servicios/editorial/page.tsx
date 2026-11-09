'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Layers, Printer, ArrowRight, X, ChevronRight, ChevronLeft, Eye, Sparkles } from 'lucide-react';

interface EditorialProject {
  id: string;
  client: string;
  service: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
}

const REAL_EDITORIAL_PROJECTS: EditorialProject[] = [
  {
    id: 'libro-patagonia',
    client: 'Alejo Lattes — Letras de la Patagonia (Chile - Argentina)',
    service: 'Diseño de libro de autor, fotografía fine-art y poesía bilingüe',
    category: 'Libro Fine-Art de Colección & Fotolibro de Autor',
    description: 'Edición en papeles de algodón, encuadernación artesanal de pasta dura sobre tronco nativo, diagramación reposada y pliegos panorámicos de selva fría con lírica bilingüe ("Driven by a force", "¡Hola a todos! yo soy el león").',
    image: '/images/real/bg-portafolios-editorial-libro-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-libro-min.jpg',
      '/images/real/bg-portafolios-editorial-libro2-min.jpg',
      '/images/real/bg-portafolios-editorial-libro3-min.jpg',
    ],
  },
  {
    id: 'seremi-medio-ambiente',
    client: 'Seremi de Medio Ambiente & FNDR Los Lagos',
    service: 'Paisaje de Conservación Chiloé Noroeste — Tríptico & Cartografía Ilustrada',
    category: 'Cartografía Ilustrada & Divulgación Ecológica',
    description: 'Diseño de tríptico e infografía territorial con mapa ilustrado de gran formato sobre humedales de Chepu, cuencas hidrográficas, santuarios naturales y fauna protegida de Chiloé.',
    image: '/images/real/bg-portafolios-editorial-folleto-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-folleto-min.jpg',
      '/images/real/bg-portafolios-editorial-folleto3-min.jpg',
      '/images/real/bg-portafolios-editorial-folleto2-min.jpg',
    ],
  },
  {
    id: 'falabella-estudios',
    client: 'Viajes Falabella — Guía Territorial & Viajes de Estudio',
    service: 'Diseño de brochure & catálogo de expediciones de gran formato',
    category: 'Guía Turística & Brochure Territorial',
    description: 'Diagramación suiza contemporánea, espacios limpios, mapas de ruta y fotografía de destinos de gran formato (Machu Picchu, Río de Janeiro, Costa Rica).',
    image: '/images/real/bg-portafolios-editorial-Viajes-estudios-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-Viajes-estudios-min.jpg',
      '/images/real/bg-portafolios-editorial-Viajes-estudios2-min.jpg',
      '/images/real/bg-portafolios-editorial-min.jpg',
    ],
  },
  {
    id: 'falabella-2x',
    client: 'Viajes Falabella — Catálogo Comercial 2X Travel Hunters',
    service: 'Diseño y maquetación de catálogo comercial 2014 de alta tirada',
    category: 'Catálogo Comercial Retail',
    description: 'Catálogo promocional de gran formato con retícula editorial rigurosa para retail y agencias turísticas internacionales (República Dominicana, Punta Cana).',
    image: '/images/real/bg-portafolios-editorial-2x-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-2x-min.jpg',
      '/images/real/bg-portafolios-editorial-2x2-min.jpg',
    ],
  },
  {
    id: 'anasac-agricola',
    client: 'Anasac / Impagro — Catálogos Agrícolas & Fichas Técnicas',
    service: 'Diseño de brochures técnicos y desarrollo de montajes fotográficos',
    category: 'Biotecnología & Agroindustria',
    description: 'Manuales técnicos y brochures agrícolas de alta fidelidad cromática para bioestimulantes vegetales (Amino-Max y Phyllum Max F) y nutrición de cultivos.',
    image: '/images/real/bg-portafolios-editorial-amino-max-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-amino-max-min.jpg',
      '/images/real/bg-portafolios-editorial-phyllum-min.jpg',
    ],
  },
  {
    id: 'pillan-aguas-azules',
    client: 'Pillán de las Aguas Azules — Ensayos de Naturaleza Viva',
    service: 'Ensayos de naturaleza viva, volcán Osorno y mitología austral',
    category: 'Libro de Autor & Territorio',
    description: 'Obra editorial que documenta la fuerza de la geografía austral a través de ensayos visuales, poesía territorial e impresión de estándar fine-art.',
    image: '/images/real/facebook/albums/pillan_aguas_azules/pillan_aguas_azules_001.jpg',
    gallery: [
      '/images/real/facebook/albums/pillan_aguas_azules/pillan_aguas_azules_001.jpg',
      '/images/real/facebook/albums/pillan_aguas_azules/pillan_aguas_azules_002.jpg',
      '/images/real/facebook/albums/pillan_aguas_azules/pillan_aguas_azules_003.jpg',
      '/images/real/facebook/albums/pillan_aguas_azules/pillan_aguas_azules_004.jpg',
    ],
  },
];

export default function EditorialPage() {
  const [activeModalProject, setActiveModalProject] = useState<EditorialProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navDirection, setNavDirection] = useState<'next' | 'prev'>('next');

  const openModal = (proj: EditorialProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
    setNavDirection('next');
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextProject = () => {
    if (!activeModalProject) return;
    setNavDirection('next');
    const currIdx = REAL_EDITORIAL_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % REAL_EDITORIAL_PROJECTS.length;
    setActiveModalProject(REAL_EDITORIAL_PROJECTS[nextIdx]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!activeModalProject) return;
    setNavDirection('prev');
    const currIdx = REAL_EDITORIAL_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + REAL_EDITORIAL_PROJECTS.length) % REAL_EDITORIAL_PROJECTS.length;
    setActiveModalProject(REAL_EDITORIAL_PROJECTS[prevIdx]);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    if (!activeModalProject) return;
    setNavDirection('next');
    if (activeModalProject.gallery.length > 1 && currentImageIndex < activeModalProject.gallery.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      nextProject();
    }
  };

  const handlePrev = () => {
    if (!activeModalProject) return;
    setNavDirection('prev');
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
          src="/images/real/bg-portafolios-editorial-min.jpg"
          alt="Puelche Lab - Diseño Editorial & Publicaciones"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/25 pointer-events-none" />

        {/* Editorial Title Block */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 z-20 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>DISCIPLINA DE AUTOR &bull; PUBLICACIONES & PRE-PRENSA</span>
          </div>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight font-black text-white leading-none drop-shadow-2xl">
            Diseño Editorial
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/80 font-medium pt-1 drop-shadow-md">
            Publicaciones corporativas, memorias y libros con rigor tipográfico de estándar suizo.
          </p>
        </div>

        {/* Bottom Caption & Manifesto */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] block mb-1">
              ESTUDIO PUELCHE LAB • PUBLICACIONES DE COLECCIÓN
            </span>
            <p className="font-sans text-sm sm:text-base text-white/95 font-light leading-relaxed italic">
              &ldquo;Diseñamos y creamos publicaciones como revistas, periódicos, libros, catálogos y memorias corporativas con el más riguroso estándar tipográfico y de pre-prensa.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. EDITORIAL PILLARS ── */}
      <section className="bg-[#0e1014] py-16 px-6 sm:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#141519] border border-white/10 rounded-sm space-y-3 shadow-lg hover:border-[#59BFD6]/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#59BFD6]/15 flex items-center justify-center text-[#59BFD6]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-white">
              Memorias & Libros
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Diagramación rigurosa de publicaciones corporativas, memorias de sustentabilidad y libros de autor que documentan el patrimonio austral.
            </p>
          </div>

          <div className="p-6 bg-[#141519] border border-white/10 rounded-sm space-y-3 shadow-lg hover:border-[#59BFD6]/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#59BFD6]/15 flex items-center justify-center text-[#59BFD6]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-white">
              Catálogos & Folletos
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Brochures de alta gama para proyectos como Viajes Falabella, guías territoriales, cartas gastronómicas y catálogos comerciales.
            </p>
          </div>

          <div className="p-6 bg-[#141519] border border-white/10 rounded-sm space-y-3 shadow-lg hover:border-[#59BFD6]/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#59BFD6]/15 flex items-center justify-center text-[#59BFD6]">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-white">
              Supervisión de Imprenta
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Control técnico de pre-prensa, selección de papeles de algodón, barnices y pruebas de color para asegurar fidelidad absoluta.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PANORAMIC EDITORIAL PROJECT STRIPES ── */}
      <section id="obras" className="w-full flex flex-col" aria-label="Proyectos de Diseño Editorial">
        {REAL_EDITORIAL_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            data-cursor="explore"
            data-cursor-text="VER EDITORIAL"
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
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#59BFD6] block">
                {proj.category}
              </span>
              <h2 className="font-condensed uppercase tracking-wider text-lg sm:text-2xl font-bold leading-snug mt-0.5 text-white">
                Cliente: {proj.client}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/80 mt-1 font-light">
                {proj.service}
              </p>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                <button
                  onClick={() => openModal(proj)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold text-[#59BFD6] hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Pliegos & Diseño</span>
                </button>
                <span className="text-[11px] text-white/60 font-mono">
                  {idx + 1} / {REAL_EDITORIAL_PROJECTS.length}
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
            ¿Planeando una publicación o memoria corporativa?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/70 font-light">
            Cuidamos cada detalle desde la conceptualización tipográfica hasta la entrega de los ejemplares impresos.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/servicios#editorial"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-xs font-condensed uppercase tracking-wider text-white font-bold transition-all"
            >
              Ver en One-Page de Servicios
            </Link>
            <Link
              href="/contacto?servicio=Dise%C3%B1o%20Editorial"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-widest text-xs font-bold rounded-full hover:bg-white transition-all shadow-lg hover:scale-105"
            >
              <span>Cotizar Diseño Editorial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MODAL LIGHTBOX ── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-4">
            <div>
              <span className="text-puelche-cyan font-condensed uppercase tracking-widest text-xs font-bold block">
                Puelche Lab • Diseño Editorial
              </span>
              <h2 className="text-lg sm:text-2xl font-condensed font-bold tracking-wide uppercase">
                {activeModalProject.client}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans font-light">
                {activeModalProject.service}
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

            <div
              key={`${activeModalProject.id}-${currentImageIndex}`}
              className={`relative w-full h-full max-w-6xl max-h-[75vh] z-10 flex items-center justify-center ${
                navDirection === 'next' ? 'animate-pliego-next' : 'animate-pliego-prev'
              }`}
            >
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Pliego ${currentImageIndex + 1}`}
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

            {/* Barrita Lateral Tickeable de Proyectos Editoriales */}
            <aside
              aria-label="Proyectos editoriales"
              className="hidden lg:flex absolute right-4 bottom-4 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl"
            >
              {REAL_EDITORIAL_PROJECTS.map((proj, idx) => {
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
              Pliego <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
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
