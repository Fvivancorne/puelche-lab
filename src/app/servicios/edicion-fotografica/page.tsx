'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sliders, X, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

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

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Top Banner */}
      <section className="bg-puelche-slate py-12 px-6 text-center border-b border-puelche-slate-dark">
        <div className="max-w-4xl mx-auto space-y-2">
          <span className="font-condensed uppercase tracking-widest text-xs font-bold text-puelche-cyan">
            SALA DE MAGIA DIGITAL
          </span>
          <h1 className="font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-wider text-white font-bold">
            EDICIÓN FOTOGRÁFICA
          </h1>
          <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Retoque digital de precisión, revelado digital de archivos RAW y color grading para fotografía publicitaria, industrial y de arquitectura.
          </p>
        </div>
      </section>

      {/* Panoramic Project Stripes */}
      <section className="w-full flex flex-col" aria-label="Proyectos de Edición Fotográfica">
        {REAL_EDICION_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] overflow-hidden group border-b border-gray-900/10"
          >
            {/* Panoramic Background Image */}
            <Image
              src={proj.image}
              alt={proj.client}
              fill
              priority={idx < 2}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Ambient Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Signature Puelche Cyan Overlay Card on Bottom Left */}
            <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-md bg-puelche-cyan text-white p-6 sm:p-7 shadow-2xl rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
              <h2 className="font-condensed uppercase tracking-wider text-lg sm:text-xl font-bold leading-snug">
                Cliente: {proj.client}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-1 font-light">
                {proj.location}
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/95 mt-0.5 font-light">
                {proj.specialty}
              </p>

              <div className="mt-4 pt-3 border-t border-white/30">
                <button
                  type="button"
                  onClick={() => openModal(proj)}
                  className="inline-flex items-center gap-2 font-condensed uppercase tracking-widest text-xs sm:text-sm font-bold text-white hover:text-puelche-slate-dark transition-colors"
                >
                  <span>VER FOTOGRAFÍAS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-[#F8FAFB] py-16 px-6 text-center border-t border-gray-200">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="font-condensed text-2xl sm:text-3xl uppercase tracking-wider font-bold text-puelche-dark">
            ¿Tienes material que requiere postproducción de autor?
          </h3>
          <p className="font-sans text-sm text-puelche-gray font-light">
            Escríbenos para evaluar tus archivos RAW, balance de color o composición editorial.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-colors shadow-md"
            >
              <span>Cotizar Edición Fotográfica</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-6 right-6 text-white hover:text-puelche-cyan p-2 z-10"
            aria-label="Cerrar visor"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center">
            <Image
              src={activeModalProject.gallery[currentImageIndex]}
              alt={activeModalProject.client}
              fill
              className="object-contain"
            />

            {activeModalProject.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 p-3 bg-black/50 text-white hover:text-puelche-cyan rounded-full"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 p-3 bg-black/50 text-white hover:text-puelche-cyan rounded-full"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white font-condensed uppercase tracking-wider">
            <p className="text-lg font-bold">{activeModalProject.client}</p>
            <p className="text-xs text-puelche-cyan">{activeModalProject.specialty}</p>
          </div>
        </div>
      )}
    </div>
  );
}
