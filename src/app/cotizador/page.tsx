'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Calculator, 
  Layers, 
  Building2, 
  PlusCircle, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  PhoneCall, 
  Check, 
  Camera, 
  Plane, 
  Compass, 
  Sliders, 
  Cpu, 
  BookOpen, 
  ShieldCheck 
} from 'lucide-react';

interface AddonItem {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ElementType;
}

const ADDONS_CATALOG: AddonItem[] = [
  {
    id: 'foto-terreno',
    name: 'Producción Fotográfica en Terreno',
    price: 1200000,
    description: 'Jornada completa en faena/locación austral con equipo Sony Alpha + ópticas G Master.',
    icon: Camera,
  },
  {
    id: 'dron-4k',
    name: 'Filmación Aérea con Dron 4K',
    price: 750000,
    description: 'Tomas aéreas en resolución 4K 60fps con piloto certificado DGAC.',
    icon: Plane,
  },
  {
    id: 'branding',
    name: 'Identidad de Marca & Manual de Normas',
    price: 1850000,
    description: 'Rediseño de marca, isotipo, paleta cromática, tipografías y manual institucional.',
    icon: Compass,
  },
  {
    id: 'edicion-raw',
    name: 'Edición Fotográfica Fine-Art & Retoque RAW',
    price: 650000,
    description: 'Calibración de color pliego por pliego y revelado de archivo en alta resolución.',
    icon: Sliders,
  },
  {
    id: 'geo-seo',
    name: 'Arquitectura GEO & Schema.org Semántico',
    price: 550000,
    description: 'Inyección de entidades JSON-LD, optimización para ChatGPT, Perplexity y Google AI.',
    icon: Cpu,
  },
  {
    id: 'editorial',
    name: 'Diseño Editorial / Memoria Corporativa Digital',
    price: 1400000,
    description: 'Maquetación reticular estilo suizo, pliegos interactivos y exportable a imprenta.',
    icon: BookOpen,
  },
  {
    id: 'soporte-anual',
    name: 'Despliegue de Alta Disponibilidad & Soporte',
    price: 950000,
    description: 'Monitoreo 99.9% uptime en Vercel, optimización de caché, backups y soporte anual.',
    icon: ShieldCheck,
  },
];

const COMPANY_SIZES = [
  {
    id: 'startup',
    label: 'Startup / Profesional',
    desc: 'Independiente o negocio unipersonal',
    multiplier: 1.0,
  },
  {
    id: 'pyme',
    label: 'PyME Regional',
    desc: 'Negocio en crecimiento o comercio local',
    multiplier: 1.15,
  },
  {
    id: 'consolidada',
    label: 'Empresa Consolidada',
    desc: 'Operador regional con equipo y tracción',
    multiplier: 1.3,
  },
  {
    id: 'corporativo',
    label: 'Corporativo Nacional',
    desc: 'Multinacional, salmonera, retail o gran turismo',
    multiplier: 1.55,
  },
];

export function calculateBasePrice(pages: number): number {
  if (pages <= 1) return 1800000;
  if (pages <= 5) return 1800000 + (pages - 1) * 350000;
  if (pages <= 10) return 3200000 + (pages - 5) * 440000;
  if (pages <= 20) return 5400000 + (pages - 10) * 310000;
  return 8500000 + (pages - 20) * 275000;
}

export function calculateDeliveryWeeks(pages: number, selectedAddons: string[]): number {
  let baseWeeks = 4;
  if (pages <= 1) baseWeeks = 2;
  else if (pages <= 5) baseWeeks = 4;
  else if (pages <= 10) baseWeeks = 7;
  else if (pages <= 20) baseWeeks = 10;
  else baseWeeks = 14;

  const extraWeeks =
    (selectedAddons.includes('foto-terreno') || selectedAddons.includes('branding') ? 2 : 0) +
    (selectedAddons.length >= 4 ? 1 : 0);

  return baseWeeks + extraWeeks;
}

function CotizadorContent() {
  const searchParams = useSearchParams();
  const initialPages = parseInt(searchParams.get('paginas') || '5', 10);

  const [pageCount, setPageCount] = useState<number>(Math.max(1, Math.min(30, isNaN(initialPages) ? 5 : initialPages)));
  const [selectedSizeId, setSelectedSizeId] = useState<string>('pyme');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['geo-seo']);

  const activeSize = COMPANY_SIZES.find((s) => s.id === selectedSizeId) || COMPANY_SIZES[1];

  // Cálculo determinista
  const pricing = useMemo(() => {
    const rawBase = calculateBasePrice(pageCount);
    const subtotalBase = rawBase * activeSize.multiplier;

    const subtotalAddons = selectedAddons.reduce((sum, addonId) => {
      const match = ADDONS_CATALOG.find((a) => a.id === addonId);
      return sum + (match ? match.price : 0);
    }, 0);

    const totalClp = Math.round((subtotalBase + subtotalAddons) / 10000) * 10000;
    const totalUsd = Math.round(totalClp / 950);
    const weeks = calculateDeliveryWeeks(pageCount, selectedAddons);

    return {
      subtotalBase,
      subtotalAddons,
      totalClp,
      totalUsd,
      weeks,
    };
  }, [pageCount, activeSize.multiplier, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formattedClp = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(pricing.totalClp);

  const formattedUsd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(pricing.totalUsd);

  const whatsappMessage = encodeURIComponent(
    `Hola Paula Valdivieso, generé una estimación en el Cotizador Paramétrico de Puelche Lab:\n` +
    `• Alcance: ${pageCount} página(s)\n` +
    `• Escala: ${activeSize.label}\n` +
    `• Add-ons: ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Ninguno'}\n` +
    `• Inversión Estimada: ${formattedClp} (${formattedUsd})\n` +
    `• Plazo Estimado: ${pricing.weeks} semanas\n` +
    `Me gustaría coordinar una propuesta formal.`
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* ── HEADER ── */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#59BFD6] font-mono text-xs uppercase tracking-widest">
          <Calculator className="w-3.5 h-3.5 text-[#59BFD6]" />
          <span>PUELCHE LAB &bull; ESTIMADOR DETERMINISTA DE INVERSIÓN</span>
        </div>

        <h1 className="font-condensed text-4xl sm:text-6xl md:text-7xl uppercase font-bold text-white tracking-tight">
          Cotizador Paramétrico de Proyectos
        </h1>

        <p className="font-sans text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
          Cálculo transparente basado en complejidad arquitectónica, escala de empresa y servicios modulares especializados.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── COLUMNA IZQUIERDA: CONFIGURADOR PARAMÉTRICO (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Parámetro 1: Cantidad de Páginas / Arquitectura */}
          <div className="bg-[#121316] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#59BFD6]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                    1. Alcance de Arquitectura Web
                  </h3>
                  <span className="font-mono text-xs text-white/50">
                    Número de páginas, vistas o pliegos interactivos
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-condensed text-3xl sm:text-4xl font-bold text-[#59BFD6]">
                  {pageCount}
                </span>
                <span className="font-mono text-xs text-white/40 block">
                  {pageCount === 1 ? 'Página Única' : 'Páginas'}
                </span>
              </div>
            </div>

            {/* Slider Interactivo */}
            <div className="space-y-3 pt-2">
              <input
                type="range"
                min={1}
                max={30}
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#59BFD6]"
              />
              <div className="flex justify-between font-mono text-[10px] text-white/40">
                <span>01 (Landing)</span>
                <span>05 (Esencial)</span>
                <span>10 (Institucional)</span>
                <span>20 (Catálogo)</span>
                <span>30 (Enterprise)</span>
              </div>
            </div>
          </div>

          {/* Parámetro 2: Tamaño y Complejidad de la Empresa */}
          <div className="bg-[#121316] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C29B63]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                  2. Escala y Complejidad de la Empresa
                </h3>
                <span className="font-mono text-xs text-white/50">
                  Multiplicador de gobernanza, rondas de revisión y stakeholders
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANY_SIZES.map((size) => {
                const isSelected = size.id === selectedSizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#C29B63]/10 border-[#C29B63] shadow-[0_0_15px_rgba(194,155,99,0.2)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-white">
                        {size.label}
                      </span>
                      <span className="font-mono text-[10px] text-[#C29B63]">
                        {size.multiplier.toFixed(2)}x
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-white/60 font-light leading-snug">
                      {size.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parámetro 3: Catálogo de Add-ons Especializados */}
          <div className="bg-[#121316] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#59BFD6]">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-condensed text-xl sm:text-2xl uppercase font-bold text-white">
                    3. Módulos & Add-ons Especializados
                  </h3>
                  <span className="font-mono text-xs text-white/50">
                    Capacidades de terreno, diseño y aceleración
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#59BFD6]">
                {selectedAddons.length} seleccionados
              </span>
            </div>

            <div className="space-y-3">
              {ADDONS_CATALOG.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                const Icon = addon.icon;
                const formattedPrice = new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'CLP',
                  maximumFractionDigits: 0,
                }).format(addon.price);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                      isChecked
                        ? 'bg-white/[0.06] border-[#59BFD6] shadow-md'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#59BFD6] border-[#59BFD6] text-[#0b0d10]'
                          : 'border-white/20'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#59BFD6]" />
                          <span className="font-mono text-xs font-semibold text-white">
                            {addon.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#59BFD6] font-semibold shrink-0">
                          +{formattedPrice}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: RESUMEN FLOTANTE DETERMINISTA (5 COLS) ── */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-gradient-to-br from-[#181a20] to-[#121316] border-2 border-[#59BFD6]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                Inversión Total Estimada
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Validez 30 Días
              </span>
            </div>

            {/* Total Prominente en CLP y USD */}
            <div className="space-y-1">
              <div className="font-condensed text-4xl sm:text-5xl font-black text-white tracking-tight">
                {formattedClp}
              </div>
              <div className="font-mono text-base text-[#59BFD6] font-semibold">
                &asymp; {formattedUsd} USD
              </div>
            </div>

            {/* Desglose Aritmético Transparente */}
            <div className="space-y-2.5 pt-4 border-t border-white/10 font-mono text-xs text-white/70">
              <div className="flex justify-between">
                <span>Base Web ({pageCount} págs):</span>
                <span>
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(pricing.subtotalBase)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Factor Escala ({activeSize.label}):</span>
                <span className="text-[#C29B63]">{activeSize.multiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons ({selectedAddons.length}):</span>
                <span>
                  {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(pricing.subtotalAddons)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5 text-white font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#59BFD6]" />
                  <span>Plazo de Entrega:</span>
                </span>
                <span className="text-[#59BFD6]">{pricing.weeks} Semanas</span>
              </div>
            </div>

            {/* Modalidad de Pago Estándar */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 font-mono text-[11px] text-white/60 space-y-1">
              <span className="text-white font-semibold block">Modalidad de Pago:</span>
              <span>50% anticipo al iniciar expedición &bull; 50% contra entrega final y despliegue a producción.</span>
            </div>

            {/* Call To Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/contacto?presupuesto=${encodeURIComponent(formattedClp)}&paginas=${pageCount}&empresa=${encodeURIComponent(activeSize.label)}&addons=${encodeURIComponent(selectedAddons.join(','))}`}
                className="rb-link-glanz w-full py-4 rounded-2xl bg-[#59BFD6] hover:bg-[#4eaac0] text-[#0b0d10] font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar Propuesta Formal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/56966177500?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Cotizar por WhatsApp Directo</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CotizadorPage() {
  return (
    <div className="w-full flex flex-col bg-[#0b0d10] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#0b0d10]">
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24 md:pt-40 md:pb-32 w-full">
        <Suspense fallback={<div className="p-12 text-center font-mono text-white/60">Cargando cotizador paramétrico...</div>}>
          <CotizadorContent />
        </Suspense>
      </section>
    </div>
  );
}
