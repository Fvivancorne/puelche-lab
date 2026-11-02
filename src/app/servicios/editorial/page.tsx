'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Layers, Printer, ArrowRight, X, ChevronRight, ChevronLeft, Eye } from 'lucide-react';

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
    id: 'falabella-estudios',
    client: 'Viajes Falabella (Estudios)',
    service: 'Diseño de brochure & guía territorial',
    category: 'Brochure de Gran Formato',
    description: 'Diagramación suiza contemporánea, espacios limpios, mapas topográficos vectoriales y tipografía de lectura reposada para destinos australes.',
    image: '/images/real/bg-portafolios-editorial-Viajes-estudios-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-Viajes-estudios-min.jpg',
      '/images/real/bg-portafolios-editorial-Viajes-estudios2-min.jpg',
    ],
  },
  {
    id: 'falabella-2x',
    client: 'Viajes Falabella 2X',
    service: 'Diseño de catálogo comercial 2014',
    category: 'Catálogo Comercial Retail',
    description: 'Catálogo promocional de gran formato con retícula editorial rigurosa para retail y agencias turísticas.',
    image: '/images/real/bg-portafolios-editorial-2x-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-2x-min.jpg',
      '/images/real/bg-portafolios-editorial-2x2-min.jpg',
    ],
  },
  {
    id: 'seremi-medio-ambiente',
    client: 'Seremi de Medio Ambiente',
    service: 'Diseño de tríptico e ilustraciones',
    category: 'Divulgación Científica & Ecológica',
    description: 'Folleto e infografía educativa sobre conservación ambiental y biodiversidad en la Región de Los Lagos.',
    image: '/images/real/bg-portafolios-editorial-folleto-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-folleto-min.jpg',
      '/images/real/bg-portafolios-editorial-folleto3-min.jpg',
    ],
  },
  {
    id: 'anasac-agricola',
    client: 'Anasac (Amino Max & Phyllum)',
    service: 'Diseño de brochure técnico y desarrollo de montaje fotográfico',
    category: 'Biotecnología & Agroindustria',
    description: 'Manuales técnicos y brochures agrícolas de alta fidelidad cromática para biotecnología vegetal y nutrición de cultivos.',
    image: '/images/real/bg-portafolios-editorial-amino-max-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-amino-max-min.jpg',
      '/images/real/bg-portafolios-editorial-phyllum-min.jpg',
    ],
  },
  {
    id: 'libro-patagonia',
    client: 'Proyecto de Autor: Libro de Fotografía de la Patagonia',
    service: 'Diseño de libro de fotografías de la Patagonia Chilena y Argentina',
    category: 'Libro Fine-Art de Colección',
    description: 'Edición en papeles de algodón, encuadernación artesanal de pasta dura, tipografías reposadas y pliegos panorámicos de la cordillera y los glaciares australes.',
    image: '/images/real/bg-portafolios-editorial-libro-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-editorial-libro-min.jpg',
      '/images/real/bg-portafolios-editorial-libro2-min.jpg',
      '/images/real/bg-portafolios-editorial-libro3-min.jpg',
    ],
  },
  {
    id: 'pillan-aguas-azules',
    client: 'Pillán de las Aguas Azules',
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

  const openModal = (proj: EditorialProject) => {
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
          src="/images/real/bg-portafolios-editorial-min.jpg"
          alt="Puelche Lab - Diseño Editorial & Publicaciones"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

        {/* Floating Cyan Pill: DISEÑO EDITORIAL */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 md:left-6 z-20">
          <div className="bg-puelche-cyan text-white pl-6 pr-8 sm:pl-8 sm:pr-12 py-3.5 sm:py-5 rounded-r-2xl sm:rounded-r-3xl shadow-[0_10px_35px_rgba(89,191,214,0.4)] flex items-center gap-3 backdrop-blur-sm transition-transform duration-300 hover:translate-x-1">
            <h1 className="font-condensed text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider font-extrabold leading-none">
              DISEÑO EDITORIAL
            </h1>
          </div>
        </div>

        {/* Bottom Caption & Manifesto */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-puelche-cyan block mb-1">
              ESTUDIO PUELCHE LAB • PUBLICACIONES DE COLECCIÓN
            </span>
            <p className="font-sans text-sm sm:text-base text-white/95 font-light leading-relaxed italic">
              &ldquo;Diseñamos y creamos publicaciones como revistas, periódicos, libros, catálogos y memorias corporativas con el más riguroso estándar tipográfico y de pre-prensa.&rdquo;
            </p>
          </div>

          <a
            href="#obras"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-puelche-cyan transition-colors"
          >
            <span>Explorar pliegos editoriales</span>
            <ChevronRight className="w-4 h-4 animate-bounce text-puelche-cyan" />
          </a>
        </div>
      </section>

      {/* ── 2. EDITORIAL PILLARS ── */}
      <section className="bg-[#F8FAFB] py-14 px-6 sm:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-gray-200/80 rounded-sm space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-puelche-dark">
              Memorias & Libros
            </h3>
            <p className="font-sans text-xs sm:text-sm text-puelche-gray leading-relaxed font-light">
              Diagramación rigurosa de publicaciones corporativas, memorias de sustentabilidad y libros de autor que documentan el patrimonio austral.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200/80 rounded-sm space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-puelche-dark">
              Catálogos & Folletos
            </h3>
            <p className="font-sans text-xs sm:text-sm text-puelche-gray leading-relaxed font-light">
              Brochures de alta gama para proyectos como Viajes Falabella, guías territoriales, cartas gastronómicas y catálogos comerciales.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200/80 rounded-sm space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-puelche-dark">
              Supervisión de Imprenta
            </h3>
            <p className="font-sans text-xs sm:text-sm text-puelche-gray leading-relaxed font-light">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 group-hover:from-black/80 transition-colors duration-500" />

            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 block">
                {proj.category}
              </span>
              <h2 className="font-condensed uppercase tracking-wider text-lg sm:text-2xl font-bold leading-snug mt-0.5">
                Cliente: {proj.client}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-1 font-light">
                {proj.service}
              </p>

              <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
                <button
                  onClick={() => openModal(proj)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold text-white hover:text-white/80 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Pliegos & Diseño</span>
                </button>
                <span className="text-[11px] text-white/70 font-mono">
                  {idx + 1} / {REAL_EDITORIAL_PROJECTS.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 4. BOTTOM CTA ── */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Planeando una publicación o memoria corporativa?
          </h3>
          <p className="font-sans text-sm text-puelche-gray font-light">
            Cuidamos cada detalle desde la conceptualización tipográfica hasta la entrega de los ejemplares impresos.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
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

            <div className="relative w-full h-full max-w-6xl max-h-[75vh] z-10 flex items-center justify-center">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Pliego ${currentImageIndex + 1}`}
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
                  aria-label="Pliego anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Siguiente pliego"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
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
