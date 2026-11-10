'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Sliders, Sparkles, Eye, ArrowLeftRight, CheckCircle2, Flame, Sun, RotateCw } from 'lucide-react';

export interface BeforeAfterProject {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  category: string;
  rawImage: string;
  masterImage: string;
  rawLabel: string;
  masterLabel: string;
  rawNotes: string[];
  masterNotes: string[];
}

export const BEFORE_AFTER_CASES: BeforeAfterProject[] = [
  {
    id: 'doosan',
    title: 'Doosan Maquinaria Austral',
    subtitle: 'Retoque de Carrocería & Clima Extremo',
    client: 'Doosan Construction Chile',
    category: 'Ingeniería & Maquinaria Pesada',
    rawImage: '/images/real/before-after/doosan-raw.jpg',
    masterImage: '/images/real/before-after/doosan-master.jpg',
    rawLabel: 'Captura RAW Directa',
    masterLabel: 'Master Puelche Fine Art',
    rawNotes: [
      'Perfil neutro sin gradación de contraste',
      'Reflejos de lluvia y barro sin compensación óptica',
      'Atmósfera deslavada por bruma patagónica',
    ],
    masterNotes: [
      'Modelado de luz en acero y texturas mecánicas',
      'Aislamiento de microtexturas en terreno hostil',
      'Gradación cromática de alta fidelidad para catálogo corporativo',
    ],
  },
  {
    id: 'arrebol',
    title: 'Hotel Boutique Arrebol Chiloé',
    subtitle: 'Arquitectura en Madera & Hora Dorada',
    client: 'Hotel Boutique Arrebol (Castro)',
    category: 'Arquitectura & Hotelería Boutique',
    rawImage: '/images/real/before-after/arrebol-raw.jpg',
    masterImage: '/images/real/before-after/arrebol-master.jpg',
    rawLabel: 'Exposición Sensor Base',
    masterLabel: 'Revelado Arquitectónico de Autor',
    rawNotes: [
      'Pérdida de calidez en tejuelas de alerce nativo',
      'Diferencial de contraste excesivo entre interior y exterior',
      'Cielo sobreexpuesto por contraluz costero',
    ],
    masterNotes: [
      'Recuperación de rango dinámico en altas luces y sombras',
      'Acento térmico en maderas vivas y penumbra austral',
      'Integración armónica del paisaje en ventanales',
    ],
  },
  {
    id: 'bomberos',
    title: '20ª Compañía de Bomberos de Santiago',
    subtitle: 'Separación Tonal Editorial & Rescate',
    client: 'Cuerpo de Bomberos de Santiago',
    category: 'Fotografía Editorial & Institucional',
    rawImage: '/images/real/before-after/bomberos-raw.jpg',
    masterImage: '/images/real/before-after/bomberos-master.jpg',
    rawLabel: 'Toma Directa sin Procesar',
    masterLabel: 'Gradación Cinemática Puelche',
    rawNotes: [
      'Luz solar dura del mediodía con sombras densas',
      'Dominancia fría en uniformes y equipos de rescate',
      'Fondo urbano distractor sin jerarquía focal',
    ],
    masterNotes: [
      'Aislamiento y riqueza del tono rojo emblemático',
      'Escultura luminosa en rostros y cascos tácticos',
      'Atmósfera heroica con grano cinematográfico suave',
    ],
  },
  {
    id: 'carnaval',
    title: 'Carnaval del Sur Teatral',
    subtitle: 'Color Grading Escénico & Vestuario',
    client: 'Fundación Carnaval del Sur',
    category: 'Artes Escénicas & Patrimonio Austral',
    rawImage: '/images/real/edicion/bg-edit-fotografica-4-min.jpg',
    masterImage: '/images/real/edicion/bg-edit-fotografica-9-min.jpg',
    rawLabel: 'Toma de Ensayo en Bosque',
    masterLabel: 'Master Revelado Mágico',
    rawNotes: [
      'Sombras densas en follaje del bosque templado',
      'Tono de piel descalibrado por luz difusa de nubes',
      'Pérdida de tridimensionalidad en máscaras teatrales',
    ],
    masterNotes: [
      'Color grading escénico con atmósfera fantástica',
      'Micro-contraste en bordados y plumas de autor',
      'Luminosidad volumétrica en claro-oscuro austral',
    ],
  },
  {
    id: 'ensayos-lago',
    title: 'Ensayos Tonales Lago Llanquihue',
    subtitle: 'Atmósfera de Neblina & Reflexión',
    client: 'Puelche Lab Studio Archive',
    category: 'Fotografía de Autor & Paisaje Austral',
    rawImage: '/images/real/edicion/bg-edit-fotografica-6-min.jpg',
    masterImage: '/images/real/edicion/bg-edit-fotografica-5-min.jpg',
    rawLabel: 'Captura Plana de Neblina',
    masterLabel: 'Gradación Fine-Art de Galería',
    rawNotes: [
      'Gama tonal comprimida en tonos medios grises',
      'Ausencia de punto blanco definido en el horizonte',
      'Gradiente de agua con banding visible en sensor',
    ],
    masterNotes: [
      'Separación de planos espaciales de neblina matutina',
      'Curva S suave con negros profundos sin empastar',
      'Acento cromático cian/oro patagónico',
    ],
  },
];

/**
 * Dial Rotatorio Analógico de Cuarto Oscuro (DarkroomRotaryDial)
 * Emula los controles de temporizador de exposición analógica y reóstato de ampliadora.
 */
function DarkroomRotaryDial({
  value,
  onChange,
}: {
  value: number; // 0 a 100
  onChange: (val: number) => void;
}) {
  const dialRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(false);

  // Mapear valor (0 - 100) a rotación angular (-135deg a +135deg)
  const angle = (value / 100) * 270 - 135;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsRotating(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isRotating || !dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    let deg = (rad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    // Mapear 45deg a 315deg (rango de 270deg) hacia 0 - 100%
    const clamped = Math.max(0, Math.min(100, ((deg - 45) / 270) * 100));
    onChange(Math.round(clamped));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsRotating(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex items-center gap-3 bg-[#111215]/80 px-4 py-2 rounded-2xl border border-white/10 select-none backdrop-blur-md">
      <div
        ref={dialRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#2B2D31] to-[#121316] border-2 border-[#C29B63]/60 shadow-[0_0_15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1)] cursor-grab active:cursor-grabbing flex items-center justify-center shrink-0 touch-none"
        title="Gira el dial analógico para calibrar la exposición"
      >
        {/* Marcas de graduación perimetral */}
        <div className="absolute inset-1 rounded-full border border-dashed border-white/20 pointer-events-none" />
        
        {/* Núcleo estriado giratorio con aguja indicadora */}
        <div
          className="w-10 h-10 rounded-full bg-[#18191B] border border-white/20 shadow-inner flex items-center justify-center relative transition-transform duration-75 pointer-events-none"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="absolute top-1 w-1 h-2.5 bg-[#59BFD6] rounded-full shadow-[0_0_6px_#59BFD6]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#2B2D31] border border-white/10" />
        </div>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#C29B63]">
          <RotateCw className="w-2.5 h-2.5 animate-spin-slow" />
          <span>Dial Analógico</span>
        </div>
        <span className="font-mono text-xs font-semibold text-white/90">
          Wipe {Math.round(value)}%
        </span>
        <span className="font-mono text-[9px] text-white/50">
          Arraste / Gire
        </span>
      </div>
    </div>
  );
}

interface BeforeAfterSliderProps {
  initialCaseId?: string;
  className?: string;
}

export function BeforeAfterSlider({ initialCaseId = 'doosan', className = '' }: BeforeAfterSliderProps) {
  const [activeCaseId, setActiveCaseId] = useState<string>(initialCaseId);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [safelightActive, setSafelightActive] = useState<boolean>(false); // Modo Luz Inactínica 590nm
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingClientXRef = useRef<number | null>(null);
  const positionFrameRef = useRef<number | null>(null);

  const activeCase = BEFORE_AFTER_CASES.find((c) => c.id === activeCaseId) || BEFORE_AFTER_CASES[0];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      pendingClientXRef.current = e.clientX;
      if (positionFrameRef.current === null) {
        positionFrameRef.current = window.requestAnimationFrame(() => {
          positionFrameRef.current = null;
          if (pendingClientXRef.current !== null) {
            updatePosition(pendingClientXRef.current);
          }
        });
      }
    }
  }, [isDragging, updatePosition]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (positionFrameRef.current !== null) {
      window.cancelAnimationFrame(positionFrameRef.current);
      positionFrameRef.current = null;
    }
    if (pendingClientXRef.current !== null) {
      updatePosition(pendingClientXRef.current);
      pendingClientXRef.current = null;
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  }, [updatePosition]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`} data-testid="before-after-slider">
      {/* Header Selector: Case Tabs & Darkroom Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#59BFD6] mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Mesa de Revelado & Retoque Fine Art</span>
          </div>
          <h2 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#F9F9F6]">
            Antes & Después de Autor
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mt-2 font-light">
            Esculpido tonal, balance térmico y microtexturas que diferencian una captura directa sin procesar de una gradación cinemática terminada.
          </p>
        </div>

        {/* Right Controls: Rotary Dial + Safelight Mode + Case Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <DarkroomRotaryDial
            value={sliderPosition}
            onChange={(val) => setSliderPosition(val)}
          />

          {/* Safelight Toggle Mode (Luz Inactínica 590nm) */}
          <button
            type="button"
            onClick={() => setSafelightActive(!safelightActive)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
              safelightActive
                ? 'bg-[#B91C1C]/30 text-[#FCA5A5] border-[#B91C1C] shadow-[0_0_15px_rgba(185,28,28,0.5)]'
                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
            }`}
            title="Alternar entre luz blanca y luz inactínica de cuarto oscuro (590nm)"
          >
            {safelightActive ? (
              <>
                <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Luz Inactínica</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>Luz Blanca</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Case Switcher Pills Bar */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Casos de Retoque">
        {BEFORE_AFTER_CASES.map((item) => {
          const isActive = item.id === activeCaseId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveCaseId(item.id);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#C29B63] text-[#18191B] border-[#C29B63] font-semibold shadow-lg shadow-[#C29B63]/20 scale-105'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{item.title.split(' ')[0]}</span>
              <span className="text-[10px] opacity-70">
                ({item.id === 'doosan' ? 'Maquinaria' : item.id === 'arrebol' ? 'Hotel' : item.id === 'bomberos' ? 'Editorial' : item.id === 'carnaval' ? 'Escénico' : 'Ensayos'})
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage — Puesta en Escena de Cuarto Oscuro con Marcaciones de Caballete y Rebate */}
      <div
        className={`relative rounded-[28px] sm:rounded-[36px] overflow-hidden border transition-colors duration-700 ${
          safelightActive
            ? 'border-red-900/60 bg-[#160b0c] shadow-[0_30px_70px_rgba(185,28,28,0.25)]'
            : 'border-white/10 bg-[#121316] shadow-[0_30px_70px_rgba(0,0,0,0.7)]'
        }`}
      >
        {/* Marcaciones Milimétricas del Caballete de Ampliadora (Enlarger Easel Ruler) */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-black/40 z-20 pointer-events-none flex items-center justify-between px-6 font-mono text-[8px] text-white/30 border-b border-white/5 select-none">
          <span>0mm</span>
          <span>100mm</span>
          <span>200mm</span>
          <span>300mm</span>
          <span>400mm</span>
          <span>500mm</span>
        </div>

        <div
          ref={containerRef}
          role="slider"
          aria-label={`Comparador Antes y Después: ${activeCase.title}`}
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          data-cursor="ARRASTRAR"
          className="relative w-full aspect-[16/9] sm:aspect-[21/10] md:aspect-[16/8] select-none cursor-ew-resize overflow-hidden outline-none focus:ring-2 focus:ring-[#C29B63] touch-none pt-4"
        >
          {/* Layer 1: Master Retouched Image (Full background) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <Image
              src={activeCase.masterImage}
              alt={`${activeCase.title} — Retoque Final Puelche`}
              fill
              priority
              draggable={false}
              className={`object-cover pointer-events-none select-none transition-filter duration-500 ${
                safelightActive ? 'sepia-[0.35] hue-rotate-[320deg]' : ''
              }`}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Tag Master (Right side) */}
            <div className="absolute top-6 sm:top-8 right-4 sm:right-6 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18191B]/80 backdrop-blur-md border border-[#C29B63]/40 text-[#C29B63] font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold shadow-lg">
                <Sparkles className="w-3 h-3 text-[#C29B63]" />
                <span>{activeCase.masterLabel}</span>
              </span>
            </div>
          </div>

          {/* Layer 2: RAW Original Image (Clipped from left by sliderPosition) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path] pointer-events-none select-none"
            style={{
              clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
            }}
          >
            <Image
              src={activeCase.rawImage}
              alt={`${activeCase.title} — Captura RAW Original`}
              fill
              priority
              draggable={false}
              className={`object-cover pointer-events-none select-none transition-filter duration-500 ${
                safelightActive ? 'sepia-[0.35] hue-rotate-[320deg]' : ''
              }`}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Tag RAW (Left side) */}
            <div className="absolute top-6 sm:top-8 left-4 sm:left-6 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18191B]/80 backdrop-blur-md border border-white/20 text-white/90 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold shadow-lg">
                <Eye className="w-3 h-3 text-white/70" />
                <span>{activeCase.rawLabel}</span>
              </span>
            </div>
          </div>

          {/* Divider Line & Tactile Handle (GPU Composited) */}
          <div
            className="absolute top-0 bottom-0 left-0 z-30 pointer-events-none flex items-center justify-center will-change-transform"
            style={{ transform: `translate3d(${sliderPosition}%, 0, 0) translateX(-50%)` }}
          >
            {/* Vertical Line in warm gold/cyan */}
            <div className="w-[2px] h-full bg-gradient-to-b from-[#C29B63] via-white to-[#59BFD6] shadow-[0_0_12px_rgba(194,155,99,0.8)]" />

            {/* Brass Center Handle */}
            <div className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#18191B] border-2 border-[#C29B63] flex items-center justify-center text-[#C29B63] shadow-2xl transition-transform duration-150 group-hover:scale-110">
              <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#C29B63] animate-pulse" />
            </div>
          </div>

          {/* Film Rebate Frame Bar (Margen inferior con tipografía de película analógica) */}
          <div className="absolute bottom-2 left-6 right-6 z-20 pointer-events-none flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 drop-shadow-md">
            <span>PUELCHE LAB • FILM SPEED ISO 400 • PATAGONIA</span>
            <span>EMULSION #{activeCase.id.toUpperCase()}</span>
          </div>

          {/* Center Micro-hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
            <span>Revelado ({Math.round(sliderPosition)}%)</span>
          </div>
        </div>

        {/* Technical Craftsmanship Breakdown Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#18191B] p-6 sm:p-8">
          {/* Left: RAW Flaws corrected */}
          <div className="space-y-3 md:pr-6 pb-4 md:pb-0">
            <div className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span>Condiciones de Captura (Sensor Plano)</span>
            </div>
            <ul className="space-y-2">
              {activeCase.rawNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
                  <span className="text-white/40 font-mono select-none">0{idx + 1}.</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Master Puelche Interventions */}
          <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
            <div className="flex items-center gap-2 text-[#C29B63] font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B63]" />
              <span>Intervención de Autor (Sello Puelche)</span>
            </div>
            <ul className="space-y-2">
              {activeCase.masterNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#F9F9F6]">
                  <CheckCircle2 className="w-4 h-4 text-[#C29B63] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
