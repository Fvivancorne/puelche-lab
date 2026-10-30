'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, MessageCircle, BarChart3, ArrowRight, X, ChevronRight, ChevronLeft, Eye } from 'lucide-react';

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
      '/images/real/bg-redes-2-min.jpg',
      '/images/real/bg-portafolios-marca-blue-seal-min.jpg',
    ],
  },
  {
    id: 'estrategia-social-puelche',
    client: 'Estrategia & Difusión Cross-Media',
    location: 'Puerto Varas, Región de Los Lagos',
    specialty: 'Gestión y segmentación publicitaria para marcas del territorio austral',
    image: '/images/real/bg-redes-2-min.jpg',
    gallery: [
      '/images/real/bg-redes-2-min.jpg',
      '/images/real/bg-redes-1-min.jpg',
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

  return (
    <div className="w-full flex flex-col bg-white">
      {/* ── 1. AUTHENTIC HERO BANNER (MacBook Pro BlueSeal shot) ── */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[88vh] overflow-hidden border-b border-puelche-slate-dark">
        <Image
          src="/images/real/bg-redes-1-min.jpg"
          alt="Puelche Lab - Redes Sociales"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle ambient gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        {/* Signature Puelche Cyan Card on Bottom Left */}
        <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-lg bg-puelche-cyan text-white p-6 sm:p-8 shadow-2xl rounded-sm">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-white/80 block mb-1">
            ESTUDIO PUELCHE LAB
          </span>
          <h1 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider font-bold leading-tight">
            REDES SOCIALES
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/95 mt-2 font-light leading-relaxed">
            Estrategia de contenidos, fotografía real y dirección de arte para canales de Instagram, Facebook y plataformas digitales.
          </p>
          <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
            <button
              onClick={() => openModal(REAL_SOCIAL_PROJECTS[0])}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-condensed uppercase tracking-widest font-bold hover:text-white/80 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Caso BlueSeal.SPA</span>
            </button>
            <span className="text-[11px] text-white/70 font-mono">1920 × 1010 HD</span>
          </div>
        </div>
      </section>

      {/* ── 2. STRATEGY SECTION (bg-redes-2-min.jpg) ── */}
      <section className="relative w-full py-20 px-6 sm:px-8 lg:px-12 text-white overflow-hidden border-b border-gray-900/10">
        <Image
          src="/images/real/bg-redes-2-min.jpg"
          alt="Estrategia en Redes Sociales"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-puelche-slate/90 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="space-y-4 text-center sm:text-left">
            <span className="font-condensed uppercase tracking-widest text-xs sm:text-sm font-bold text-puelche-cyan">
              METODOLOGÍA CROSS-MEDIA
            </span>
            <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider font-bold leading-tight text-white">
              &ldquo;Aplicamos las estrategias que tu marca necesita para atraer, convertir y fidelizar clientes en tus redes sociales.&rdquo;
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-3xl">
              Creamos y administramos comunidades digitales en Facebook, Instagram, YouTube, LinkedIn y otras redes sociales. 
              Configuramos, administramos y monitoreamos cuentas con fotografía real tomada en terreno, diseñando campañas publicitarias que se adecúan al objetivo concreto de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-puelche-cyan/20 flex items-center justify-center text-puelche-cyan">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-white">
                Contenido Real & Propio
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Generamos contenido fotográfico y audiovisual genuino con nuestro propio equipo en Puerto Varas, sin recurrir a bancos de imágenes genéricos.
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-puelche-cyan/20 flex items-center justify-center text-puelche-cyan">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-white">
                Coherencia de Marca
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Mantenemos una línea gráfica impecable en feeds, historias y reels, asegurando que cada publicación refuerce la personalidad de tu empresa.
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-puelche-cyan/20 flex items-center justify-center text-puelche-cyan">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-condensed text-xl uppercase tracking-wide font-bold text-white">
                Estrategia Cross-Media
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Sincronizamos tus campañas en redes sociales con tu sitio web, lanzamientos de producto y material publicitario impreso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM CTA ── */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Listo para llevar tus redes a un nivel profesional?
          </h3>
          <p className="font-sans text-sm text-puelche-gray font-light">
            Conversemos sobre tu marca y diseñemos una pauta de contenidos auténtica.
          </p>
          <div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
            >
              <span>Cotizar Redes Sociales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MODAL LIGHTBOX FOR HIGH-RES ASSETS ── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header */}
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

          {/* Modal Image Display */}
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

          {/* Modal Footer */}
          <div className="flex items-center justify-between text-white/80 border-t border-white/20 pt-4 text-xs sm:text-sm font-sans">
            <div>
              Imagen <span className="text-puelche-cyan font-bold">{currentImageIndex + 1}</span> de{' '}
              <span className="font-bold">{activeModalProject.gallery.length}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/contacto"
                className="text-puelche-cyan font-condensed uppercase tracking-wider font-bold hover:underline"
              >
                Cotizar Proyecto Similar &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
