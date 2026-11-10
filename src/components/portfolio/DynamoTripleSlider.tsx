'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ProjectItem, PORTFOLIO_PROJECTS } from '@/data/portfolio';
import { Compass, ArrowRight, ChevronLeft, ChevronRight, MapPin, Sparkles, Wind, Eye } from 'lucide-react';

export interface DynamoProjectData {
  project: ProjectItem;
  coords: string;
  territory: string;
  azimuthDeg: number;
  optics: string;
  windSpeed: string;
  altitude: string;
  storyHeading: string;
}

export const DYNAMO_SHOWCASE_PROJECTS: DynamoProjectData[] = [
  {
    project: PORTFOLIO_PROJECTS.find((p) => p.id === 'estancia-rilan') || PORTFOLIO_PROJECTS[0],
    coords: '42°30′S 73°45′W',
    territory: 'Península de Rilán, Chiloé',
    azimuthDeg: 215,
    optics: 'Sony α7R V • 24-70mm f/2.8 GM II • 15+ EV',
    windSpeed: 'Viento Puelche 18 nudos',
    altitude: '85 m s.n.m.',
    storyHeading: 'ARQUITECTURA VERNÁCULA & CAVA DE CHILOÉ',
  },
  {
    project: PORTFOLIO_PROJECTS.find((p) => p.id === 'turistour-expediciones') || PORTFOLIO_PROJECTS[1],
    coords: '41°19′S 72°59′W',
    territory: 'Puerto Varas & Vicente Pérez Rosales',
    azimuthDeg: 120,
    optics: 'Sony α1 • 70-200mm f/2.8 GM OSS II',
    windSpeed: 'Brisa Lacustre 12 nudos',
    altitude: '189 m s.n.m.',
    storyHeading: 'EXPEDICIONES LACUSTRES & SELVA FRÍA',
  },
  {
    project: PORTFOLIO_PROJECTS.find((p) => p.id === 'hotel-costaustralis') || PORTFOLIO_PROJECTS[2],
    coords: '51°43′S 72°31′W',
    territory: 'Seno Última Esperanza, Magallanes',
    azimuthDeg: 195,
    optics: 'Sony α7R V • 16-35mm f/2.8 GM • Filtro Polarizador',
    windSpeed: 'Viento Austral 32 nudos',
    altitude: '12 m s.n.m.',
    storyHeading: 'REFUGIO EN EL SENO ÚLTIMA ESPERANZA',
  },
  {
    project: PORTFOLIO_PROJECTS.find((p) => p.id === 'hotel-cabo-de-hornos') || PORTFOLIO_PROJECTS[3],
    coords: '53°09′S 70°55′W',
    territory: 'Punta Arenas, Estrecho de Magallanes',
    azimuthDeg: 160,
    optics: 'Sony α7R IV • 50mm f/1.2 GM • Luz Rasante',
    windSpeed: 'Ráfagas de Estrecho 26 nudos',
    altitude: '28 m s.n.m.',
    storyHeading: 'VANGUARDIA EN EL ESTRECHO DE MAGALLANES',
  },
  {
    project: PORTFOLIO_PROJECTS.find((p) => p.id === 'blue-seal') || PORTFOLIO_PROJECTS[4],
    coords: '41°45′S 72°50′W',
    territory: 'Puerto Montt & Fiordos Australes',
    azimuthDeg: 275,
    optics: 'Sony FX3 Cinema Line • Carcasa Submarina',
    windSpeed: 'Marea Alta & Viento Sur 15 nudos',
    altitude: '-35 m (Subsea)',
    storyHeading: 'ROBÓTICA SUBMARINA & BUCEO TÉCNICO',
  },
  {
    project: PORTFOLIO_PROJECTS.find((p) => p.id === 'editorial-alejo-lattes') || PORTFOLIO_PROJECTS[5] || PORTFOLIO_PROJECTS[0],
    coords: '45°34′S 72°04′W',
    territory: 'Patagonia Austral & Carretera Austral',
    azimuthDeg: 180,
    optics: 'Leica Q2 • Summilux 28mm f/1.7 ASPH',
    windSpeed: 'Calma Chicha & Llovizna 6 nudos',
    altitude: '310 m s.n.m.',
    storyHeading: 'LETRAS DE LA PATAGONIA & FINE ART',
  },
];

interface DynamoTripleSliderProps {
  onOpenProject?: (project: ProjectItem) => void;
  className?: string;
}

export function DynamoTripleSlider({ onOpenProject, className = '' }: DynamoTripleSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = DYNAMO_SHOWCASE_PROJECTS[activeIndex];
  const total = DYNAMO_SHOWCASE_PROJECTS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div
      className={`relative w-full max-w-7xl mx-auto rounded-[32px] sm:rounded-[40px] bg-[#121316] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden ${className}`}
      data-testid="dynamo-triple-slider"
    >
      {/* Header Bar: Synchronized Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#59BFD6] shadow-[0_0_10px_#59BFD6] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#59BFD6]">
            DYNAMOLIST &bull; TRIPLE SINCRONIZACIÓN CINEMÁTICA
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Index Counter */}
          <div className="font-mono text-xs text-white/50">
            <span className="text-[#59BFD6] font-bold text-sm">0{activeIndex + 1}</span> / 0{total}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Proyecto anterior"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#59BFD6] hover:text-[#111215] border border-white/10 text-white flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente proyecto"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#59BFD6] hover:text-[#111215] border border-white/10 text-white flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── THE SMART VILLAS DYNAMOLIST TRIPLE SYNCHRONIZED GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* =========================================================================
            COLUMNA 1 (~30% / 4 cols lg): CONCEPTO E HISTORIA EDITORIAL
            ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#59BFD6] font-mono text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#59BFD6]" />
              <span>{current.project.category}</span>
            </div>

            <h3 className="font-condensed text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-white tracking-tight leading-[0.98]">
              {current.storyHeading}
            </h3>

            <div className="flex items-center gap-2 text-white/50 font-mono text-xs">
              <span className="text-white font-medium">{current.project.client}</span>
              <span>&bull;</span>
              <span>{current.project.year}</span>
            </div>

            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed pt-2">
              {current.project.description}
            </p>

            {/* Deliverables tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {current.project.deliverables.slice(0, 3).map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] text-white/70"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => onOpenProject && onOpenProject(current.project)}
              className="rb-link-glanz inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#59BFD6] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-[#59BFD6]/30 transition-all duration-300"
            >
              <span>Ver Caso de Estudio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            COLUMNA 2 (~24% / 3 cols lg): MÉTRICAS & COORDENADAS AUSTRALES
            ========================================================================= */}
        <div className="lg:col-span-3 bg-white/[0.025] rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Top Compass Azimuth Widget */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  Rumbo Azimutal
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {current.azimuthDeg}° {current.azimuthDeg > 180 ? 'SSW' : 'SSE'}
                </span>
              </div>

              {/* Rotating Compass Graphic */}
              <div className="relative w-12 h-12 rounded-full border border-white/20 bg-black/40 flex items-center justify-center shadow-inner">
                <div
                  className="w-8 h-8 flex items-center justify-center transition-transform duration-700 ease-out"
                  style={{ transform: `rotate(${current.azimuthDeg}deg)` }}
                >
                  <Compass className="w-7 h-7 text-[#59BFD6]" />
                </div>
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                  Coordenadas GPS
                </span>
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#59BFD6] font-semibold mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{current.coords}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                  Nodo Territorial
                </span>
                <span className="font-sans text-xs sm:text-sm text-white/90 font-medium block mt-0.5">
                  {current.territory}
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                  Óptica & Rango Dinámico
                </span>
                <div className="flex items-start gap-1.5 font-mono text-[11px] text-white/70 mt-0.5 leading-snug">
                  <Eye className="w-3.5 h-3.5 text-[#C29B63] shrink-0 mt-0.5" />
                  <span>{current.optics}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                  Clima Austral & Viento
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/70 mt-0.5">
                  <Wind className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                  <span>{current.windSpeed}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                  Cota de Elevación
                </span>
                <span className="font-mono text-[11px] text-white/70 block mt-0.5">
                  {current.altitude}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">
            Puelche Lab Expedition Index
          </div>
        </div>

        {/* =========================================================================
            COLUMNA 3 (~46% / 5 cols lg): FOTOGRAFÍA REAL EN GRAN FORMATO
            ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div
            onClick={() => onOpenProject && onOpenProject(current.project)}
            className="group relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-[28px] overflow-hidden border border-white/20 shadow-2xl cursor-pointer bg-black"
          >
            <Image
              src={current.project.image}
              alt={current.project.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Darkroom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Floating Info Pill */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#59BFD6] uppercase tracking-wider">
                  Archivo Master 1920x1010
                </span>
                <span className="font-sans text-xs font-semibold truncate max-w-[200px] sm:max-w-[280px]">
                  {current.project.title}
                </span>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 bg-white/10 px-2.5 py-1 rounded-full group-hover:bg-[#59BFD6] group-hover:text-black transition-colors">
                Ampliar &rarr;
              </span>
            </div>
          </div>

          {/* Direct Numerical Indicator Strip */}
          <div className="flex items-center justify-between gap-2 mt-4 px-2">
            <div className="flex items-center gap-2">
              {DYNAMO_SHOWCASE_PROJECTS.map((item, idx) => (
                <button
                  key={item.project.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-7 h-7 rounded-full font-mono text-[10px] transition-all duration-300 flex items-center justify-center border ${
                    activeIndex === idx
                      ? 'bg-[#59BFD6] text-[#0b0d10] border-[#59BFD6] font-bold scale-110 shadow-md'
                      : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'
                  }`}
                  aria-label={`Ver proyecto ${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
              Patagonia Austral
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
