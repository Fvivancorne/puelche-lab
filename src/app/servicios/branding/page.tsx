'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ArrowRight, X, ChevronRight, ChevronLeft, Eye, Sparkles } from 'lucide-react';

interface BrandProject {
  id: string;
  client: string;
  subtitle: string;
  category: string;
  image: string;
  gallery: string[];
  quote?: string;
}

const REAL_BRAND_PROJECTS: BrandProject[] = [
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

  const openModal = (proj: BrandProject) => {
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

  return (
    <div className="w-full flex flex-col bg-white">
      {/* ── 1. AUTHENTIC HERO BANNER (bg-portafolios-marca-min-1.jpg) ── */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] overflow-hidden border-b border-puelche-slate-dark">
        <Image
          src="/images/real/bg-portafolios-marca-min-1.jpg"
          alt="Puelche Lab - Diseño de Marca"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-xl bg-puelche-cyan text-white p-6 sm:p-8 shadow-2xl rounded-sm">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-white/80 block mb-1">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider font-bold leading-tight">
            DISEÑO DE MARCA
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/95 mt-2 font-light leading-relaxed">
            &ldquo;La Identidad Corporativa es mucho más que el logotipo: es el reflejo de la filosofía de la empresa, su manera de trabajar. Nuestro trabajo consiste en plasmar visualmente todos esos conceptos y hacer que sean perceptibles por las personas.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-mono text-white/70">
            <span>11 Marcas & Proyectos Australes</span>
            <span>1920 × 1010 HD</span>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURE STORY: VIGÉSIMA COMPAÑÍA DE BOMBEROS DE SANTIAGO ── */}
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
              onClick={() => openModal(REAL_BRAND_PROJECTS[10])}
              className="text-xs font-condensed uppercase tracking-wider font-bold text-puelche-cyan hover:underline inline-flex items-center gap-1"
            >
              <span>Ver Insignia & Fotografía</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. PANORAMIC BRAND PROJECT STRIPES ── */}
      <section className="w-full flex flex-col" aria-label="Proyectos de Diseño de Marca">
        {REAL_BRAND_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] overflow-hidden group border-b border-gray-900/10"
          >
            <Image
              src={proj.image}
              alt={proj.client}
              fill
              priority={idx < 2}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
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

      {/* ── 4. BOTTOM CTA ── */}
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
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
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

          <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Pieza ${currentImageIndex + 1}`}
                fill
                priority
                className="object-contain"
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
              Pieza <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
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
