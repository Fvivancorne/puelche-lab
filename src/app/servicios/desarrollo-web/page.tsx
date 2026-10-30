'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Monitor, Smartphone, Globe, ArrowRight, X, ChevronRight, ChevronLeft, Eye, Zap, ShieldCheck } from 'lucide-react';

interface WebProject {
  id: string;
  client: string;
  service: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
}

const REAL_WEB_PROJECTS: WebProject[] = [
  {
    id: 'web-estancia-rilan',
    client: 'Estancia Rilán — Hotel & Cava',
    service: 'Sitio web oficial para Hotel & Cava Chiloé',
    category: 'Hospitalidad & Reservas Boutique',
    description: 'Arquitectura web inmersiva para reservas boutique, integración de motor de contacto directo y recorridos fotográficos a pantalla completa de la península de Rilán.',
    image: '/images/real/bg-portafolios-web-rilan-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-web-rilan-min.jpg',
      '/images/real/bg-portafolios-marca-rilan-min.jpg',
      '/images/real/bg-portafolios-fotografia-a-min.jpg',
    ],
  },
  {
    id: 'web-tierrasur',
    client: 'Sur Terra / Tierra Sur',
    service: 'Portal inmobiliario y visor de lotes en el sur de Chile',
    category: 'Conservación & Visor Territorial',
    description: 'Portal minimalista con mapas interactivos satelitales, visor de cotas topográficas y descarga de fichas técnicas en tiempo real para parcelaciones en el Lago Llanquihue.',
    image: '/images/real/bg-portafolios-web-tierrasur-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-web-tierrasur-min.jpg',
      '/images/real/bg-portafolios-marca-sur-terra-min.jpg',
    ],
  },
  {
    id: 'web-centro-maqui',
    client: 'Centro Maqui',
    service: 'Plataforma web de atención integral infantil',
    category: 'Salud Infantil & Servicios',
    description: 'Plataforma web para equipo interdisciplinario de salud y estimulación temprana, con agenda de consultas y catálogo de especialidades.',
    image: '/images/real/bg-portafolios-web-maqui-min.jpg',
    gallery: [
      '/images/real/bg-portafolios-web-maqui-min.jpg',
      '/images/real/bg-portafolios-marca-maqui-min.jpg',
    ],
  },
  {
    id: 'web-maqueta-showcase',
    client: 'Puelche Lab Studio (Showcase)',
    service: 'Maqueta Web Showcase 2021',
    category: 'Investigación UI/UX de Autor',
    description: 'Exploración de interfaces cross-media, tipografía fluida y retícula editorial adaptativa desarrollada para marcas del sur de Chile.',
    image: '/images/real/maquetaweb2021-41-min.jpg',
    gallery: [
      '/images/real/maquetaweb2021-41-min.jpg',
      '/images/real/bg-portafolios-web-min.jpg',
    ],
  },
];

export default function DesarrolloWebPage() {
  const [activeModalProject, setActiveModalProject] = useState<WebProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (proj: WebProject) => {
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
      {/* ── 1. AUTHENTIC HERO BANNER (bg-portafolios-web-min.jpg) ── */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] overflow-hidden border-b border-puelche-slate-dark">
        <Image
          src="/images/real/bg-portafolios-web-min.jpg"
          alt="Puelche Lab - Desarrollo Web"
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
            DESARROLLO WEB
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/95 mt-2 font-light leading-relaxed">
            &ldquo;Diseñamos, construimos y mantenemos sitios web; diseño impecable, funcionamiento rápido y desempeño optimizado para permitir la mejor experiencia de usuario.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-mono text-white/70">
            <span>Next.js • React • Alta Fidelidad</span>
            <span>1920 × 1010 HD</span>
          </div>
        </div>
      </section>

      {/* ── 2. WEB PILLARS ── */}
      <section className="bg-[#F8FAFB] py-14 px-6 sm:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-gray-200/80 rounded-sm space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-puelche-dark">
              Diseño a Medida
            </h3>
            <p className="font-sans text-xs sm:text-sm text-puelche-gray leading-relaxed font-light">
              Diseñamos interfaces web personalizadas que respetan y potencian la identidad corporativa de tu empresa, sin plantillas genéricas.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200/80 rounded-sm space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-puelche-dark">
              100% Responsive
            </h3>
            <p className="font-sans text-xs sm:text-sm text-puelche-gray leading-relaxed font-light">
              Navegación fluida y óptima en smartphones, tablets y pantallas de escritorio de gran resolución con velocidad de carga inmediata.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200/80 rounded-sm space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-puelche-cyan/15 flex items-center justify-center text-puelche-cyan">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-puelche-dark">
              Integración Cross-Media
            </h3>
            <p className="font-sans text-xs sm:text-sm text-puelche-gray leading-relaxed font-light">
              Sincronizamos tu plataforma web con WhatsApp, redes sociales y campañas de pauta para maximizar la captación de clientes.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PANORAMIC WEB PROJECT STRIPES ── */}
      <section className="w-full flex flex-col" aria-label="Proyectos de Desarrollo Web">
        {REAL_WEB_PROJECTS.map((proj, idx) => (
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
                {proj.service}
              </p>

              <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
                <button
                  onClick={() => openModal(proj)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed uppercase tracking-wider font-bold text-white hover:text-white/80 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Plataforma Web</span>
                </button>
                <span className="text-[11px] text-white/70 font-mono">
                  {idx + 1} / {REAL_WEB_PROJECTS.length}
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
            ¿Necesitas una plataforma web de alto estándar?
          </h3>
          <p className="font-sans text-sm text-puelche-gray font-light">
            Creamos sitios web de alta velocidad, fotografía genuina y arquitectura Next.js preparados para posicionar en Google.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
            >
              <span>Cotizar Sitio Web</span>
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
                Puelche Lab • Desarrollo Web
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
            <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
              <Image
                src={activeModalProject.gallery[currentImageIndex]}
                alt={`${activeModalProject.client} - Pantalla ${currentImageIndex + 1}`}
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
                  aria-label="Pantalla anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-puelche-cyan text-white transition-all shadow-lg"
                  aria-label="Siguiente pantalla"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div>
              Pantalla <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
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
