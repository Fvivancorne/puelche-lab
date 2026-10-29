'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Camera, Sparkles, Wind, Layers } from 'lucide-react';

interface Capability {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  spec: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CAPABILITIES: Capability[] = [
  {
    id: 'estudio',
    num: '01',
    tag: 'ESPACIO & SET',
    title: 'Estudio Propio',
    subtitle: 'En Puerto Varas',
    description:
      'Set de fotografía y grabación profesional en el centro de Puerto Varas. Espacio de trabajo controlado para producciones comerciales, dirección de arte, retratos corporativos y bodegones de producto.',
    image: '/images/real/bg-portafolios-fotografia-d-min.jpg',
    alt: 'Estudio de fotografía y set de grabación Puelche Lab en Puerto Varas',
    spec: 'SET CONTROLADO • HIGH-SPEED TETHERING • CICLORAMA',
    meta: 'PUERTO VARAS LAB • 41° 19′ S',
    icon: Camera,
  },
  {
    id: 'aereo',
    num: '02',
    tag: 'CINEMATOGRAFÍA AÉREA',
    title: 'Tierra y Aire',
    subtitle: 'Dron 4K & Cine',
    description:
      'Cobertura visual integral tanto a ras de suelo como desde el aire con dron cinematográfico 4K. Registramos la magnitud de la Patagonia, arquitectura territorial, proyectos agropecuarios y hotelería boutique.',
    image: '/images/real/bg-fotografia-9-min.jpg',
    alt: 'Dron 4K y filmación aérea sobre territorio patagónico — Puelche Lab',
    spec: 'DRON 4K 60FPS • LOG 10-BIT • ND CINEMA FILTERS',
    meta: 'LOS LAGOS & PATAGONIA • DRONE CREW',
    icon: Wind,
  },
  {
    id: 'iluminacion',
    num: '03',
    tag: 'DIRECCIÓN DE LUZ',
    title: 'Iluminación',
    subtitle: 'Set Profesional',
    description:
      'Modelamos la atmósfera con iluminación profesional de alta gama, modificadores ópticos y esquemas de estudio diseñados para resaltar texturas nobles, materiales y la presencia de tu marca.',
    image: '/images/real/bg-portafolios-fotografia-a-min.jpg',
    alt: 'Set de iluminación profesional y modelado óptico Puelche Lab',
    spec: 'LUZ CONTINUA CRI 98+ • FLASH ALTA VELOCIDAD • 5600K',
    meta: 'COLOR ACCURACY • PROFOTO GEAR',
    icon: Sparkles,
  },
  {
    id: 'crossmedia',
    num: '04',
    tag: 'ECOSISTEMA OMNICANAL',
    title: 'Cross-Media',
    subtitle: 'Digital, Impreso, Video',
    description:
      'Concebimos sistemas visuales integrados que trascienden soportes: plataformas web interactivas Next.js, memorias editoriales impresas, packaging, piezas audiovisuales y contenido para redes.',
    image: '/images/real/bg-portafolios-fotografia-b-min.jpg',
    alt: 'Diseño Cross Media 360: digital, impreso y audiovisual Puelche Lab',
    spec: 'EDITORIAL FINE ART • NEXT.JS WEB • MOTION GRAPHICS',
    meta: 'OMNICHANNEL SUITE • BRAND ARCHIVE',
    icon: Layers,
  },
];

export function BrutalistCrossMedia() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="cross-media"
      aria-label="El Manifiesto del Puelche y Capacidades Cross Media"
      className="relative w-full min-h-screen flex flex-col justify-between py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden bg-puelche-dark text-white select-none"
    >
      {/* 
        ======================================================================
        SISTEMA DE FONDOS CON MORPHING CINEMÁTICO (CROSS-FADE EN TIEMPO REAL)
        ======================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Fondo Base / Reposo */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            activeIdx === null ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transform transition-transform duration-1000`}
        >
          <Image
            src="/images/real/bg-home-2.jpg"
            alt="Patagonia Austral — Pastizal y Lago Puelche Lab"
            fill
            priority={false}
            className="object-cover"
          />
        </div>

        {/* Fondos Reactivos según la Capacidad Seleccionada */}
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              activeIdx === i ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            } transform transition-transform duration-1000`}
          >
            <Image
              src={cap.image}
              alt={cap.alt}
              fill
              priority={false}
              className="object-cover"
            />
          </div>
        ))}

        {/* Velo Cinematográfico Darkroom: Alto Contraste y Grano */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D2024]/85 via-[#1D2024]/80 to-[#1D2024]/95 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(29,32,36,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Contenido Superior / Encabezado de Sección */}
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-10">
        {/* Meta Bar Superior: Estilo Archivo Suizo */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-puelche-cyan animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span className="text-white font-bold tracking-[0.25em]">ARCHIVO 41°S &bull; MANIFIESTO</span>
          </div>
          <div className="flex items-center gap-4 text-puelche-cyan">
            <span>PUERTO VARAS &bull; REGION DE LOS LAGOS</span>
            <span className="hidden sm:inline text-white/30">• 41° 19′ S 72° 59′ W</span>
          </div>
        </div>

        {/* Titular Kinetic Monumental */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-puelche-cyan font-mono text-[11px] sm:text-xs uppercase tracking-widest">
            <span>ESTUDIO CROSS MEDIA &bull; PUERTO VARAS</span>
          </div>

          <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white leading-[0.88] drop-shadow-2xl">
            ¿QUÉ ES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-puelche-cyan">
              CROSS MEDIA?
            </span>
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-puelche-cyan font-normal max-w-3xl leading-snug">
            El arte de concebir piezas gráficas y cinematográficas para todos los soportes.
          </p>
        </div>

        {/* Manifiesto Editorial de 2 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pt-4 border-t border-white/10 font-sans text-base sm:text-lg text-white/80 leading-relaxed font-light">
          <div className="space-y-4">
            <p className="text-white font-medium text-lg sm:text-xl">
              Somos un Estudio de Diseño Cross Media y Fotografía en Puerto Varas.
            </p>
            <p>
              Pero, <span className="italic font-serif text-white">¿Qué es Cross Media?</span> Nos referimos a que creamos piezas visuales para todos los medios, ya sean digitales, impresos y/o audiovisuales.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Contamos con un estudio de fotografía y grabación muy bien equipado, iluminación profesional y equipos de alta gama, tanto en tierra firme como desde el aire con dron 4K, haciendo resaltar tu producto o servicio para que pase al frente en la vitrina del mercado.
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-puelche-cyan tracking-wider pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-puelche-cyan" />
              <span>EQUIPOS DE CINE &bull; SET PROPIO &bull; DRON 4K</span>
            </div>
          </div>
        </div>

        {/* 
          ======================================================================
          GRILLA BRUTALISTA DE 4 CAPACIDADES (SPLIT DESKTOP + MOBILE SNAP SWIPE)
          ======================================================================
        */}
        <div className="pt-6">
          <div className="flex items-center justify-between pb-3 text-xs font-mono uppercase tracking-widest text-white/40">
            <span>[ 04 CAPACIDADES DE PRODUCCIÓN ]</span>
            <span className="hidden sm:inline">[ POSA EL CURSOR PARA VISUALIZAR BACKSTAGE ]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              const isSelected = activeIdx === i;

              return (
                <div
                  key={cap.id}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => setActiveIdx(isSelected ? null : i)}
                  className={`group relative p-6 sm:p-7 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-[#1D2024]/90 border-puelche-cyan shadow-[0_0_25px_rgba(89,191,214,0.25)] -translate-y-1.5'
                      : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                  }`}
                  data-cursor="FOCO"
                >
                  {/* Luz de Esquina Activa */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-puelche-cyan/20 blur-xl rounded-full transition-opacity duration-300 ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Cabecera de la Tarjeta */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tighter text-puelche-cyan">
                        {cap.num}
                      </span>
                      <div
                        className={`p-2 rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-puelche-cyan text-puelche-dark border-puelche-cyan'
                            : 'bg-white/5 text-white/70 border-white/10 group-hover:text-puelche-cyan'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest block">
                        {cap.tag}
                      </span>
                      <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white mt-1 group-hover:text-puelche-cyan transition-colors">
                        {cap.title}
                      </h3>
                      <p className="font-sans text-xs text-puelche-cyan font-medium tracking-wide">
                        {cap.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                      {cap.description}
                    </p>
                  </div>

                  {/* Micro-Metadata de Estilo Suizo al pie */}
                  <div className="pt-6 mt-4 border-t border-white/10 font-mono text-[10px] text-white/40 space-y-1">
                    <div className="text-white/60 font-medium truncate">{cap.spec}</div>
                    <div className="text-puelche-cyan/70">{cap.meta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fila de Acciones y Conversión */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-puelche-cyan text-[#1D2024] font-condensed uppercase tracking-wider text-sm font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(89,191,214,0.3)] hover:scale-105"
              data-cursor="VER"
            >
              <span>Explorar Obras</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#footer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3B3D42] bg-puelche-slate border border-white/30 text-white font-condensed uppercase tracking-wider text-sm font-medium hover:bg-white/20 transition-all"
              data-cursor="CONTACTO"
            >
              <span>Contáctanos</span>
              <ArrowDown className="w-4 h-4 text-puelche-cyan" />
            </a>
          </div>

          <div className="font-mono text-xs text-white/40 uppercase tracking-widest hidden md:flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ESTUDIO ACTIVO &bull; ATENDIENDO PROYECTOS EN PATAGONIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
