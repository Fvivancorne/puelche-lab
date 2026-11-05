'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ArrowRight, X, ChevronRight, ChevronLeft, Eye, Sparkles, Layers } from 'lucide-react';

interface BrandProject {
  id: string;
  client: string;
  subtitle: string;
  category: string;
  image: string;
  gallery: string[];
  tag?: string;
  quote?: string;
}

const FEATURED_BRAND_SHOWCASE: BrandProject[] = [
  {
    id: 'hotel-arrebol',
    client: 'Hotel Boutique Arrebol Chiloé',
    subtitle: 'Diseño de marca e identidad visual para hotelería boutique en Castro (ex Hotel Veliche)',
    category: 'Hotelería Boutique & Arquitectura',
    image: '/images/real/facebook/fb-arrebol-1.jpg',
    gallery: [
      '/images/real/facebook/fb-arrebol-1.jpg',
      '/images/real/facebook/fb-arrebol-2.jpg',
      '/images/real/facebook/fb-arrebol-3.jpg',
      '/images/real/facebook/fb-arrebol-4.jpg',
    ],
    tag: 'Nueva Identidad Austral',
    quote: 'La nueva marca e identidad visual de marca del ex hotel Veliche de Chiloé, nuevo Hotel Arrebol, diseñada en nuestro Lab con trazos arquitectónicos inspirados en los canales chilotes y señalética en cueros y maderas nativas.',
  },
  {
    id: 'summit-transforma',
    client: 'Summit TRANSFORMA 2026',
    subtitle: 'Cumbre de innovación y tecnología en Puerto Varas, Región de Los Lagos',
    category: 'Innovación & Tecnología',
    image: '/images/real/facebook/fb-transforma-1.jpg',
    gallery: [
      '/images/real/facebook/fb-transforma-1.jpg',
      '/images/real/facebook/fb-transforma-2.jpg',
      '/images/real/facebook/fb-transforma-3.jpg',
    ],
    tag: 'Cumbre Tecnológica',
    quote: 'Marca potente, moderna y con visión de futuro para la cumbre tecnológica de Los Lagos. Monograma de volcanes con circuitos topográficos verde flúor sobre fondos azul océano profundo.',
  },
  {
    id: 'el-reparabrisas',
    client: 'El Reparabrisas Puerto Natales',
    subtitle: 'Personaje de marca estilo cómic vintage, tipografía a medida y aplicaciones móviles',
    category: 'Servicios Automotrices & Ruta Austral',
    image: '/images/real/facebook/fb-reparabrisas-1.jpg',
    gallery: [
      '/images/real/facebook/fb-reparabrisas-1.jpg',
      '/images/real/facebook/fb-reparabrisas-2.jpg',
      '/images/real/facebook/fb-reparabrisas-3.jpg',
    ],
    tag: 'Diseño de Personaje',
    quote: 'Para los queridos amigos de @el_reparabrisas en Puerto Natales. Creamos un superhéroe musculoso dorado que resuelve emergencias contra el viento patagónico, con tipografía contundente a medida.',
  },
  {
    id: 'bomberos-santiago',
    client: 'Vigésima Compañía de Bomberos de Santiago',
    subtitle: 'Compañía especializada en incendios en altura',
    category: 'Caso Insigne Pro-Bono',
    image: '/images/real/bg-portafolios-marca-bomberos-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-bomberos-min.jpg',
      '/images/real/bg-edit-fotografica-7-min.jpg',
    ],
    tag: 'Hito Pro-Bono de Honor',
    quote: 'Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Proyecto OBVIAMENTE gratis. Ellos no reciben ni uno haciendo su pega, es más, deben pagar para ser bomberos. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.',
  },
];

const REAL_BRAND_PROJECTS: BrandProject[] = [
  {
    id: 'hotel-arrebol-grid',
    client: 'Hotel Boutique Arrebol Chiloé',
    subtitle: 'Diseño de marca e identidad visual para hotelería boutique en Castro (ex Hotel Veliche)',
    category: 'Hotelería Boutique & Arquitectura',
    image: '/images/real/facebook/fb-arrebol-1.jpg',
    gallery: [
      '/images/real/facebook/fb-arrebol-1.jpg',
      '/images/real/facebook/fb-arrebol-2.jpg',
      '/images/real/facebook/fb-arrebol-3.jpg',
      '/images/real/facebook/fb-arrebol-4.jpg',
    ],
  },
  {
    id: 'summit-transforma-grid',
    client: 'Summit TRANSFORMA 2026',
    subtitle: 'Cumbre de innovación y tecnología en Puerto Varas, Región de Los Lagos',
    category: 'Innovación & Tecnología',
    image: '/images/real/facebook/fb-transforma-1.jpg',
    gallery: [
      '/images/real/facebook/fb-transforma-1.jpg',
      '/images/real/facebook/fb-transforma-2.jpg',
      '/images/real/facebook/fb-transforma-3.jpg',
    ],
  },
  {
    id: 'el-reparabrisas-grid',
    client: 'El Reparabrisas Puerto Natales',
    subtitle: 'Personaje de marca estilo cómic, tipografía a medida y aplicaciones móviles',
    category: 'Servicios Automotrices & Ruta Austral',
    image: '/images/real/facebook/fb-reparabrisas-1.jpg',
    gallery: [
      '/images/real/facebook/fb-reparabrisas-1.jpg',
      '/images/real/facebook/fb-reparabrisas-2.jpg',
      '/images/real/facebook/fb-reparabrisas-3.jpg',
    ],
  },
  {
    id: 'estancia-rilan',
    client: 'Estancia Rilán',
    subtitle: 'Hotel y Cava',
    category: 'Hospitalidad & Cava Austral',
    image: '/images/real/bg-portafolios-marca-rilan-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-rilan-min.jpg',
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
      '/images/real/bg-portafolios-web-rilan-min.jpg',
    ],
  },
  {
    id: 'blue-seal',
    client: 'Blue Seal',
    subtitle: 'Trabajos submarinos, equipo técnico humano y robótica',
    category: 'Ingeniería Submarina',
    image: '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
      '/images/real/bg-redes-1-min.jpg',
    ],
  },
  {
    id: 'cirumed',
    client: 'Cirumed',
    subtitle: 'Proveedores de insumos médicos para el área de estética',
    category: 'Salud & Instrumental Quirúrgico',
    image: '/images/real/bg-portafolios-marca-cirumed-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-cirumed-min.jpg',
    ],
  },
  {
    id: 'tti-chile',
    client: 'TRI Chile',
    subtitle: 'Servicios de robótica submarina',
    category: 'Robótica & Operaciones Portuarias',
    image: '/images/real/bg-portafolios-marca-tti-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-tti-min.jpg',
    ],
  },
  {
    id: 'rmh-emergencias',
    client: 'RMH',
    subtitle: 'Servicio y venta de equipamiento de emergencias',
    category: 'Equipamiento & Flota de Emergencia',
    image: '/images/real/bg-portafolios-marca-rmh-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-rmh-min.jpg',
      '/images/real/bg-portafolios-marca-rmh2-min.jpg',
    ],
  },
  {
    id: 'centro-maqui',
    client: 'Centro Maqui',
    subtitle: 'Centro de atención integral infantil',
    category: 'Atención Infantil & Desarrollo',
    image: '/images/real/bg-portafolios-marca-maqui-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-maqui-min.jpg',
      '/images/real/bg-portafolios-web-maqui-min.jpg',
    ],
  },
  {
    id: 'san-ambrosio',
    client: 'San Ambrosio',
    subtitle: 'Servicios Navieros y Rescate',
    category: 'Operaciones Marítimas & Rescate',
    image: '/images/real/bg-portafolios-marca-san-ambrosio-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-san-ambrosio-min.jpg',
    ],
  },
  {
    id: 'sur-terra',
    client: 'Sur Terra',
    subtitle: 'Servicio de venta de propiedades',
    category: 'Conservación & Bienes Raíces',
    image: '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
      '/images/real/bg-portafolios-web-tierrasur-min.jpg',
    ],
  },
  {
    id: 'andesmaq',
    client: 'Andesmaq',
    subtitle: 'Constructora y maquinaria pesada',
    category: 'Construcción & Obras Viales',
    image: '/images/real/bg-portafolios-marca-andesmaq-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-andesmaq-min.jpg',
    ],
  },
  {
    id: 'gallo-negro',
    client: 'Gallo Negro',
    subtitle: 'Café y restorán de autor',
    category: 'Gastronomía Austral',
    image: '/images/real/bg-portafolios-marca-gallo-negro-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-gallo-negro-min.jpg',
    ],
  },
  {
    id: 'bomberos-santiago',
    client: 'Vigésima Compañía de Bomberos de Santiago',
    subtitle: 'Compañía especializada en incendios en altura',
    category: 'Caso Insigne Pro-Bono',
    image: '/images/real/bg-portafolios-marca-bomberos-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-marca-bomberos-min.jpg',
      '/images/real/bg-edit-fotografica-7-min.jpg',
    ],
    quote: 'Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Proyecto OBVIAMENTE gratis. Ellos no reciben ni uno haciendo su pega, es más, deben pagar para ser bomberos. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.',
  },
];

export default function BrandingPage() {
  const [activeModalProject, setActiveModalProject] = useState<BrandProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);

  const openModal = (proj: BrandProject) => {
    setActiveModalProject(proj);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setActiveModalProject(null);
  };

  const nextProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_BRAND_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (currIdx + 1) % REAL_BRAND_PROJECTS.length;
    setActiveModalProject(REAL_BRAND_PROJECTS[nextIdx]);
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!activeModalProject) return;
    const currIdx = REAL_BRAND_PROJECTS.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (currIdx - 1 + REAL_BRAND_PROJECTS.length) % REAL_BRAND_PROJECTS.length;
    setActiveModalProject(REAL_BRAND_PROJECTS[prevIdx]);
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

  const nextShowcase = () => {
    setActiveShowcaseIdx((prev) => (prev + 1) % FEATURED_BRAND_SHOWCASE.length);
  };

  const prevShowcase = () => {
    setActiveShowcaseIdx((prev) =>
      prev === 0 ? FEATURED_BRAND_SHOWCASE.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as any).lenisInstance : null;
    if (activeModalProject) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleNext();
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handlePrev();
        if (e.key === 'ArrowDown' || e.key === 'PageDown') nextProject();
        if (e.key === 'ArrowUp' || e.key === 'PageUp') prevProject();
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
  }, [activeModalProject, currentImageIndex]);

  const currentFeatured = FEATURED_BRAND_SHOWCASE[activeShowcaseIdx];

  return (
    <div className="w-full flex flex-col -mt-20 bg-[#0d0e12] text-white selection:bg-[#59BFD6] selection:text-[#0d0e12]">
      {/* ── 1. AUTHENTIC FULL-BLEED 100VH HERO ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black">
        <Image
          src="/images/real/bg-portafolios-marca-min-1.jpg"
          alt="Puelche Lab - Diseño de Marca & Identidad Corporativa"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-black/25 pointer-events-none" />

        {/* Editorial Title Block */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 md:left-16 z-20 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#59BFD6] font-mono text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#59BFD6]" />
            <span>DISCIPLINA DE AUTOR &bull; SISTEMAS VISUALES & IDENTIDAD</span>
          </div>
          <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight font-black text-white leading-none drop-shadow-2xl">
            Diseño de Marca
          </h1>
          <p className="font-condensed uppercase tracking-wider text-sm sm:text-base md:text-lg text-white/80 font-medium pt-1 drop-shadow-md">
            Identidades corporativas con arraigo territorial austral y proyección internacional.
          </p>
        </div>

        {/* Bottom Caption & Manifesto */}
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] block mb-1">
              ESTUDIO PUELCHE LAB • FILOSOFÍA VISUAL
            </span>
            <p className="font-sans text-sm sm:text-base text-white/95 font-light leading-relaxed italic">
              &ldquo;La Identidad Corporativa es mucho más que el logotipo: es el reflejo de la filosofía de la empresa, su manera de trabajar. Nuestro trabajo consiste en plasmar visualmente todos esos conceptos y hacer que sean perceptibles por las personas.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. CARRUSEL CINEMÁTICO AWWWARDS: CASOS INSIGNIA DE BRANDING ── */}
      <section id="carrusel-casos" className="bg-[#0e1014] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-12 border-b border-white/10 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-puelche-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-puelche-cyan/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
            <div>
              <div className="flex items-center gap-2 text-puelche-cyan font-mono text-xs uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Casos Destacados • Identidad Territorial & Corporativa</span>
              </div>
              <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white">
                Sistemas Visuales de Alto Impacto
              </h2>
            </div>
            
            {/* Paginator & Navigation Controls */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm tracking-widest text-white/60">
                <span className="text-puelche-cyan font-bold">{String(activeShowcaseIdx + 1).padStart(2, '0')}</span> / {String(FEATURED_BRAND_SHOWCASE.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevShowcase}
                  className="p-3 rounded-full bg-white/5 hover:bg-puelche-cyan hover:text-white text-white/80 transition-all border border-white/10 hover:border-puelche-cyan"
                  aria-label="Caso anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextShowcase}
                  className="p-3 rounded-full bg-white/5 hover:bg-puelche-cyan hover:text-white text-white/80 transition-all border border-white/10 hover:border-puelche-cyan"
                  aria-label="Siguiente caso"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Case Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {FEATURED_BRAND_SHOWCASE.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveShowcaseIdx(idx)}
                className={`text-left p-3 sm:p-4 rounded-sm transition-all duration-300 border ${
                  activeShowcaseIdx === idx
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

          {/* Cinematic Active Slide Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-white/[0.03] border border-white/10 rounded-sm p-4 sm:p-6 md:p-8">
            {/* Visual Preview Stage (7 cols) - Framed & Centered (Anti-Cropping) */}
            <div
              className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] md:min-h-[540px] rounded-sm overflow-hidden group cursor-pointer bg-[#08090c] border border-white/10 flex items-center justify-center p-4 sm:p-6 md:p-8"
              onClick={() => openModal(currentFeatured)}
            >
              {/* Layer 1: Ambient atmospheric blur glow based on artwork */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={currentFeatured.image}
                  alt=""
                  fill
                  className="object-cover blur-3xl opacity-20 scale-125"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
              </div>

              {/* Layer 2: Studio Framing Gridlines & Corner Brackets */}
              <div className="absolute inset-3 border border-white/10 rounded-sm pointer-events-none z-10" />
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-puelche-cyan pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-puelche-cyan pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-puelche-cyan pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-puelche-cyan pointer-events-none z-10" />

              {/* Layer 3: Main Artwork Centered in Frame - 100% visible, complete, never cropped */}
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center z-10">
                <Image
                  src={currentFeatured.image}
                  alt={currentFeatured.client}
                  fill
                  priority
                  className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-puelche-cyan text-white font-condensed text-xs uppercase font-bold tracking-wider rounded-sm shadow-md">
                  {currentFeatured.tag}
                </span>
                <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-white/90 font-mono text-[11px] uppercase tracking-wider rounded-sm border border-white/15">
                  {currentFeatured.gallery.length} piezas gráficas
                </span>
              </div>

              {/* Hover Trigger Action */}
              <div className="absolute bottom-5 right-5 z-20 bg-black/80 backdrop-blur-md group-hover:bg-puelche-cyan text-white px-4 py-2 rounded-sm text-xs font-condensed uppercase tracking-wider font-bold transition-all flex items-center gap-2 border border-white/20 group-hover:border-puelche-cyan shadow-xl">
                <Eye className="w-3.5 h-3.5" />
                <span>Ampliar Galería</span>
              </div>
            </div>

            {/* Narrative & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-puelche-cyan block">
                  {currentFeatured.category}
                </span>
                <h3 className="font-condensed text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-white leading-tight">
                  {currentFeatured.client}
                </h3>
                <p className="font-sans text-sm text-white/80 font-light leading-relaxed">
                  {currentFeatured.subtitle}
                </p>

                {currentFeatured.quote && (
                  <div className="p-4 bg-white/[0.04] border-l-2 border-puelche-cyan rounded-r-sm space-y-2 mt-4">
                    <p className="font-sans text-xs sm:text-sm text-white/90 font-light italic leading-relaxed">
                      &ldquo;{currentFeatured.quote}&rdquo;
                    </p>
                    <span className="text-[11px] font-condensed uppercase tracking-wider text-puelche-cyan block font-semibold">
                      — Puelche Lab Studio, Puerto Varas
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openModal(currentFeatured)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-puelche-cyan text-white font-condensed uppercase tracking-wider font-bold text-sm rounded-sm hover:bg-puelche-cyan-dark transition-all shadow-md hover:scale-[1.02]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Piezas en Alta Resolución</span>
                </button>
                <Link
                  href={`/contacto?proyecto=${encodeURIComponent(currentFeatured.client)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-white text-white font-condensed uppercase tracking-wider font-bold text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  <span>Cotizar Branding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURE STORY: VIGÉSIMA COMPAÑÍA DE BOMBEROS DE SANTIAGO ── */}
      <section className="bg-[#F8FAFB] py-14 px-6 sm:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-sm border-l-4 border-puelche-cyan shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-puelche-cyan font-condensed uppercase tracking-widest text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Hito de Honor • Puelche Lab Pro-Bono</span>
          </div>
          <blockquote className="font-sans text-base sm:text-lg text-puelche-dark font-light italic leading-relaxed">
            &ldquo;Nuestro orgullo más grande, haber tenido el honor de crear la marca para la Vigésima Compañía de Bomberos de Santiago. Proyecto OBVIAMENTE gratis. Ellos no reciben ni uno haciendo su pega, es más, ¡deben pagar para ser bomberos! Así es que nosotros no les cobramos ni uno. Ver nuestro trabajo bordado en cada butaca de la nueva máquina, no tiene precio.&rdquo;
          </blockquote>
          <div className="flex items-center justify-between pt-2">
            <span className="font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate">
              — Equipo Puelche Lab, Puerto Varas
            </span>
            <button
              onClick={() => openModal(FEATURED_BRAND_SHOWCASE[3])}
              className="text-xs font-condensed uppercase tracking-wider font-bold text-puelche-cyan hover:underline inline-flex items-center gap-1"
            >
              <span>Ver Insignia & Fotografía</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. PANORAMIC BRAND PROJECT STRIPES ── */}
      <section id="obras" className="w-full flex flex-col" aria-label="Proyectos de Diseño de Marca">
        {REAL_BRAND_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            data-cursor="explore"
            data-cursor-text="VER MARCA"
            className="relative w-full h-[480px] sm:h-[550px] md:h-[620px] overflow-hidden group border-b border-gray-900/15 cursor-pointer bg-[#08090c]"
            onClick={() => openModal(proj)}
          >
            {/* Atmospheric ambient blur backdrop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src={proj.image}
                alt=""
                fill
                className="object-cover blur-3xl opacity-25 scale-110"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65" />
            </div>

            {/* Centered Framed Artwork - 100% visible, never cut off */}
            <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center p-6 sm:p-12 z-10">
              <div className="relative w-full h-full max-h-[440px] sm:max-h-[500px] flex items-center justify-center">
                <Image
                  src={proj.image}
                  alt={proj.client}
                  fill
                  priority={idx < 2}
                  className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Client Overlay Card */}
            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 z-20 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 block">
                {proj.category}
              </span>
              <h2 className="font-condensed uppercase tracking-wider text-lg sm:text-2xl font-bold leading-snug mt-0.5">
                Cliente: {proj.client}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-1 font-light">
                {proj.subtitle}
              </p>

              <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
                <button
                  onClick={() => openModal(proj)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold text-white hover:text-white/80 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Pieza Gráfica</span>
                </button>
                <span className="text-[11px] text-white/70 font-mono">
                  {idx + 1} / {REAL_BRAND_PROJECTS.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 5. BOTTOM CTA ── */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Construyendo la identidad de tu empresa en el sur?
          </h3>
          <p className="font-sans text-sm text-puelche-gray font-light">
            Creamos manuales de identidad, señalética y aplicaciones con identidad territorial y proyección global.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
            >
              <span>Cotizar Diseño de Marca</span>
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
                Puelche Lab • Diseño de Marca
              </span>
              <h2 className="text-lg sm:text-2xl font-condensed font-bold tracking-wide uppercase">
                {activeModalProject.client}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans font-light">
                {activeModalProject.subtitle}
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
                alt={`${activeModalProject.client} - Pieza ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
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

            {/* Barrita Lateral Tickeable de Proyectos de Branding */}
            <aside
              aria-label="Proyectos de branding"
              className="hidden lg:flex absolute right-4 bottom-4 z-30 items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-xl"
            >
              {REAL_BRAND_PROJECTS.map((proj, idx) => {
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
              Pieza <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
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
