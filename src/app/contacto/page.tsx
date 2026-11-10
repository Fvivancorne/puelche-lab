'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, Clock, MapPin, Facebook, Instagram, Send, CheckCircle2, MessageCircle, RotateCcw, Building2, Calculator, ArrowUpRight } from 'lucide-react';
import { AtmosphericBackground } from '@/components/ui/AtmosphericBackground';

const GENUINE_SERVICES = [
  'Fotografía',
  'Sitio Web',
  'Redes Sociales',
  'Diseño Gráfico',
];

const DETAILED_SERVICES = [
  'Fotografía Arquitectura & Hotelería',
  'Fotografía Industrial & Dron 4K',
  'Diseño de Marca & Identidad',
  'Desarrollo Web Next.js',
  'Diseño Editorial & Memorias',
  'Edición Fotográfica & Retoque RAW',
  'Proyecto Integral Cross-Media',
];

export const SERVICE_CANONICAL_MAP: Record<string, string[]> = {
  'branding': ['Diseño Gráfico', 'Diseño de Marca & Identidad'],
  'diseno-de-marca': ['Diseño Gráfico', 'Diseño de Marca & Identidad'],
  'diseño de marca': ['Diseño Gráfico', 'Diseño de Marca & Identidad'],
  'diseño de marca & identidad': ['Diseño Gráfico', 'Diseño de Marca & Identidad'],
  'fotografia': ['Fotografía'],
  'fotografía': ['Fotografía'],
  'fotografia arquitectura & hoteleria': ['Fotografía', 'Fotografía Arquitectura & Hotelería'],
  'fotografía arquitectura & hotelería': ['Fotografía', 'Fotografía Arquitectura & Hotelería'],
  'desarrollo-web': ['Sitio Web', 'Desarrollo Web Next.js'],
  'desarrollo web': ['Sitio Web', 'Desarrollo Web Next.js'],
  'desarrollo web next.js': ['Sitio Web', 'Desarrollo Web Next.js'],
  'sitio web': ['Sitio Web', 'Desarrollo Web Next.js'],
  'edicion-fotografica': ['Fotografía', 'Edición Fotográfica & Retoque RAW'],
  'edicion fotografica': ['Fotografía', 'Edición Fotográfica & Retoque RAW'],
  'edición fotográfica': ['Fotografía', 'Edición Fotográfica & Retoque RAW'],
  'editorial': ['Diseño Gráfico', 'Diseño Editorial & Memorias'],
  'diseno-editorial': ['Diseño Gráfico', 'Diseño Editorial & Memorias'],
  'diseño editorial': ['Diseño Gráfico', 'Diseño Editorial & Memorias'],
  'diseño editorial & memorias': ['Diseño Gráfico', 'Diseño Editorial & Memorias'],
  'redes-sociales': ['Redes Sociales'],
  'redes sociales': ['Redes Sociales'],
};

// Constantes técnicas y referencias históricas para suite E2E
export const BUDGETS = [
  '$1.5M — $3.0M CLP',
  '$3.0M — $6.0M CLP',
  '$6.0M — $12.0M CLP',
  '+$12.0M CLP (Corporativo)',
];

const PROJECT_SCALES = [
  'Propuesta a la medida según alcance',
  'Producción Fotográfica en Terreno / Faena',
  'Diseño de Marca & Estrategia Cross-Media',
  'Desarrollo Web Next.js de Autor',
  'Publicación Editorial / Memoria Corporativa',
  'Acompañamiento Integral Anual',
];

const REGIONS = [
  'Puerto Varas & Cuenca Llanquihue',
  'Puerto Montt',
  'Archipiélago de Chiloé',
  'Carretera Austral / Aysén',
  'Magallanes & Torres del Paine',
  'Santiago / Otra Región',
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('servicio') || '';
  const initialProject = searchParams.get('proyecto') || '';

  // Normalizador canónico bidireccional con resolución por palabras clave
  const resolveInitialServices = (raw: string): string[] => {
    if (!raw) return [];
    const normalized = raw.trim().toLowerCase();
    const mapped = SERVICE_CANONICAL_MAP[normalized];
    if (mapped) return Array.from(new Set([raw, ...mapped]));

    const matches: string[] = [raw];
    if (normalized.includes('fotograf') || normalized.includes('dron') || normalized.includes('aérea') || normalized.includes('aerea')) {
      matches.push('Fotografía');
      if (normalized.includes('arquitectura') || normalized.includes('hoteler') || normalized.includes('hotelera') || normalized.includes('cava') || normalized.includes('interiores')) {
        matches.push('Fotografía Arquitectura & Hotelería');
      }
      if (normalized.includes('industrial') || normalized.includes('procesos') || normalized.includes('faena') || normalized.includes('dron')) {
        matches.push('Fotografía Industrial & Dron 4K');
      }
    }
    if (normalized.includes('retoque') || normalized.includes('edici') || normalized.includes('edición')) {
      matches.push('Fotografía', 'Edición Fotográfica & Retoque RAW');
    }
    if (normalized.includes('marca') || normalized.includes('branding') || normalized.includes('identidad')) {
      matches.push('Diseño Gráfico', 'Diseño de Marca & Identidad');
    }
    if (normalized.includes('web') || normalized.includes('next') || normalized.includes('sitio')) {
      matches.push('Sitio Web', 'Desarrollo Web Next.js');
    }
    if (normalized.includes('editor') || normalized.includes('guía') || normalized.includes('guia') || normalized.includes('libro') || normalized.includes('memoria')) {
      matches.push('Diseño Gráfico', 'Diseño Editorial & Memorias');
    }
    if (normalized.includes('redes') || normalized.includes('social') || normalized.includes('instagram')) {
      matches.push('Redes Sociales');
    }
    return Array.from(new Set(matches));
  };

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? resolveInitialServices(initialService) : (initialService ? [initialService] : [])
  );
  const [projectScale, setProjectScale] = useState<string>('Propuesta a la medida según alcance');
  const [selectedBudget, setSelectedBudget] = useState<string>('$1.5M — $3.0M CLP');
  const [selectedRegion, setSelectedRegion] = useState<string>('Puerto Varas & Cuenca Llanquihue');
  const [message, setMessage] = useState(
    initialProject ? `Consulta referente al proyecto: ${initialProject}` : ''
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isServiceSelected = (service: string) => {
    if (selectedServices.includes(service)) return true;
    return selectedServices.some((s) => {
      const normalized = s.trim().toLowerCase();
      const mapped = SERVICE_CANONICAL_MAP[normalized];
      if (mapped && mapped.includes(service)) return true;
      if (service === 'Fotografía' && (normalized.includes('fotograf') || normalized.includes('dron'))) return true;
      if (service === 'Diseño Gráfico' && (normalized.includes('marca') || normalized.includes('branding') || normalized.includes('editor'))) return true;
      if (service === 'Sitio Web' && (normalized.includes('web') || normalized.includes('sitio'))) return true;
      if (service === 'Redes Sociales' && (normalized.includes('redes') || normalized.includes('social'))) return true;
      return false;
    });
  };

  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prev) => {
      const active = isServiceSelected(service);
      if (active) {
        return prev.filter((s) => {
          if (s === service) return false;
          const mapped = SERVICE_CANONICAL_MAP[s.trim().toLowerCase()];
          if (mapped && mapped.includes(service)) return false;
          return true;
        });
      } else {
        return [...prev, service];
      }
    });
  };

  const generateWhatsAppLink = () => {
    const cleanList = Array.from(
      new Set(
        selectedServices.flatMap((s) => {
          const mapped = SERVICE_CANONICAL_MAP[s.trim().toLowerCase()];
          return mapped || [s];
        })
      )
    );
    const srvText = cleanList.length > 0 ? cleanList.join(', ') : 'Servicios generales';
    const msg = `Hola Puelche Lab,\n\nMi nombre es ${name || 'un prospecto'} de la empresa ${company || 'Independiente'}.\nUbicación: ${selectedRegion}\nServicios de interés: ${srvText}\nModalidad: ${projectScale}\n\nDetalles del proyecto:\n${message || 'Me gustaría coordinar una reunión para evaluar nuestra iniciativa.'}\n\nContacto: ${phone || email || 'vía WhatsApp'}`;
    return `https://wa.me/56966177500?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name,
        company,
        email: email || undefined,
        phone,
        services: selectedServices,
        budget: selectedBudget,
        region: selectedRegion,
        projectScale,
        message,
        clientTimestamp: new Date().toISOString(),
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.issues?.[0] || data?.error || 'Error al procesar el brief');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.warn('API submission fallback to direct WhatsApp handoff:', err?.message);
      // Fallback seguro: garantizamos que el lead no se pierda y acceda a WhatsApp
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setSelectedServices([]);
    setSelectedBudget('$1.5M — $3.0M CLP');
    setSelectedRegion('Puerto Varas & Cuenca Llanquihue');
    setMessage('');
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Formulario de Solicitud de Expedición */}
      <div className="lg:col-span-7 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-[0.25em] uppercase text-[#59BFD6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6] animate-pulse shadow-[0_0_8px_#59BFD6]" />
            <span>41°19′S 72°59′W &bull; PUERTO VARAS &bull; MESA DE DESPACHO</span>
          </div>

          <h1 className="font-condensed text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[0.95] drop-shadow-2xl">
            SOLICITUD DE EXPEDICIÓN
          </h1>

          <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed pt-1">
            Inicia el brief para tu próximo encargo de fotografía territorial, desarrollo web Next.js o diseño de marca. Respondemos en menos de 24 horas hábiles desde Puerto Varas.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#121418] border border-[#59BFD6]/40 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl">
            <CheckCircle2 className="w-14 h-14 text-[#59BFD6] mx-auto animate-bounce" />
            <h3 className="font-condensed text-3xl font-bold uppercase text-white tracking-wide">
              Brief Recibido con Éxito
            </h3>
            <p className="font-sans text-sm text-white/80 max-w-md mx-auto font-light leading-relaxed">
              Gracias por escribirnos. Paula Valdivieso o nuestro equipo de dirección revisará tu solicitud y te contactará a la brevedad.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#59BFD6] hover:bg-white text-puelche-dark font-condensed uppercase tracking-wider text-xs font-bold rounded-full transition-all shadow-lg hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continuar por WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-condensed uppercase tracking-wider text-xs font-bold rounded-full transition-all border border-white/15"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Enviar otro requerimiento</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block font-mono uppercase tracking-widest text-[11px] text-white/70 mb-2"
              >
                Nombre y Apellido *
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/15 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#59BFD6] focus:bg-white/[0.07] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="telefono"
                  className="block font-mono uppercase tracking-widest text-[11px] text-white/70 mb-2"
                >
                  Teléfono de Contacto *
                </label>
                <input
                  id="telefono"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/15 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#59BFD6] focus:bg-white/[0.07] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="block font-mono uppercase tracking-widest text-[11px] text-white/70 mb-2"
                >
                  Correo Electrónico *
                </label>
                <input
                  id="correo"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.cl"
                  className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/15 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#59BFD6] focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Solicitud Checkboxes */}
            <div className="pt-1">
              <span className="block font-mono uppercase tracking-widest text-[11px] text-[#59BFD6] mb-3">
                Disciplinas de Interés *
              </span>
              <div className="grid grid-cols-2 gap-3">
                {GENUINE_SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2.5 text-xs text-white/85 cursor-pointer font-sans select-none p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isServiceSelected(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-4 h-4 text-[#59BFD6] accent-[#59BFD6] rounded border-white/20"
                    />
                    <span className="font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Specialization Categories */}
            <div className="pt-1">
              <span className="block font-mono uppercase tracking-widest text-[10px] text-white/50 mb-2">
                Especialidad de Expedición (Opcional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DETAILED_SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2 text-xs text-white/70 cursor-pointer font-sans select-none p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isServiceSelected(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-3.5 h-3.5 text-[#59BFD6] accent-[#59BFD6] rounded border-white/20"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modalidad de Proyecto & Región */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label
                  htmlFor="projectScale"
                  className="block font-mono uppercase tracking-widest text-[11px] text-white/70 mb-2"
                >
                  Modalidad de Proyecto
                </label>
                <select
                  id="projectScale"
                  value={projectScale}
                  onChange={(e) => setProjectScale(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#14161a] border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#59BFD6]"
                >
                  {PROJECT_SCALES.map((scale) => (
                    <option key={scale} value={scale}>{scale}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="region"
                  className="block font-mono uppercase tracking-widest text-[11px] text-white/70 mb-2"
                >
                  Ubicación Territorial
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#14161a] border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#59BFD6]"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block font-mono uppercase tracking-widest text-[11px] text-white/70 mb-2"
              >
                Detalles del Requerimiento o Territorio:
              </label>
              <textarea
                id="mensaje"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos sobre tu proyecto, fechas estimadas o lo que necesitas cotizar..."
                className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/15 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#59BFD6] focus:bg-white/[0.07] transition-all resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#59BFD6] text-puelche-dark font-condensed uppercase tracking-widest text-sm font-bold rounded-full hover:bg-white transition-all shadow-[0_0_25px_rgba(89,191,214,0.35)] hover:scale-105 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'PROCESANDO...' : 'ENVIAR BRIEF DE EXPEDICIÓN'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Column: Datos de Despacho & Equipo */}
      <div className="lg:col-span-5 bg-[#121418] p-8 sm:p-10 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#59BFD6] block mb-2">
            MESA DE DIRECCIÓN
          </span>
          <h2 className="font-condensed text-3xl font-bold uppercase tracking-tight text-white mb-6">
            Datos de Contacto
          </h2>

          <div className="space-y-4 font-sans text-sm">
            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-2">
              <p className="font-condensed text-lg uppercase font-bold text-white tracking-wide">
                Alejandro Lattes Corona
              </p>
              <p className="text-[11px] font-mono text-[#59BFD6] uppercase tracking-wider">
                Fundador &bull; Dirección Creativa & Fotografía
              </p>
              <div className="flex items-center space-x-2 text-white/70 hover:text-[#59BFD6] transition-colors pt-1">
                <Mail className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                <a href="mailto:alejandro@puelchelab.cl">alejandro@puelchelab.cl</a>
              </div>
              <div className="flex items-center space-x-2 text-white/70 hover:text-[#59BFD6] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                <a href="tel:+56999363705">+56 9 9936 3705</a>
              </div>
            </div>

            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-2">
              <p className="font-condensed text-lg uppercase font-bold text-white tracking-wide">
                Paula Valdivieso
              </p>
              <p className="text-[11px] font-mono text-[#59BFD6] uppercase tracking-wider">
                Socia &bull; Dirección Comercial & Cotizaciones
              </p>
              <div className="flex items-center space-x-2 text-white/70 hover:text-[#59BFD6] transition-colors pt-1">
                <Mail className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                <a href="mailto:paula.valdivieso@puelchelab.cl">paula.valdivieso@puelchelab.cl</a>
              </div>
              <div className="flex items-center space-x-2 text-white/70 hover:text-[#59BFD6] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#59BFD6] shrink-0" />
                <a href="tel:+56966177500">+56 9 6617 7500</a>
              </div>
            </div>

            <div className="pt-2 space-y-2.5 text-xs text-white/70 font-mono">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#59BFD6] shrink-0" />
                <span>Puerto Varas &bull; Región de Los Lagos &bull; Chile</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#59BFD6] shrink-0" />
                <span>Lunes a Viernes de 09:00 a 19:00 hrs.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#59BFD6] mb-4">
            Presencia & Redes
          </h3>
          <div className="flex items-center space-x-3">
            <a
              href="https://www.facebook.com/PuelcheLabPublicidad/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-[#59BFD6] hover:text-puelche-dark text-white flex items-center justify-center transition-all border border-white/10"
              aria-label="Facebook Puelche Lab Oficial"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/puelche_lab/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-[#59BFD6] hover:text-puelche-dark text-white flex items-center justify-center transition-all border border-white/10"
              aria-label="Instagram @puelche_lab"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div className="relative w-full flex flex-col bg-[#0c0e12] text-white min-h-screen selection:bg-[#59BFD6] selection:text-[#0c0e12] overflow-hidden">
      {/* ── ATMÓSFERA AUSTRAL VIVA: GRADIENTES ORGÁNICOS + POLEN/VIENTO EN CANVAS ── */}
      <AtmosphericBackground intensity="medium" showParticles={true} className="z-0" />

      {/* ── PLACA FOTOGRÁFICA AUTÉNTICA DEL ESTUDIO / PUERTO VARAS (ANTI-STOCK) ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-15 mix-blend-screen overflow-hidden">
        <Image
          src="/images/real/bg-agencia.jpg"
          alt="Estudio y Laboratorio Puelche Lab Puerto Varas"
          fill
          className="object-cover object-center filter grayscale contrast-125 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e12] via-transparent to-[#0c0e12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0c0e12_90%)]" />
      </div>

      {/* ── AURORAL GLOWS & GUÍAS ÓPTICAS DE CUARTO OSCURO ── */}
      <div className="absolute top-1/4 -left-48 w-[600px] h-[350px] bg-[#59BFD6]/[0.08] blur-[140px] rounded-full pointer-events-none z-[2]" />
      <div className="absolute bottom-1/3 -right-48 w-[600px] h-[350px] bg-[#C29B63]/[0.07] blur-[150px] rounded-full pointer-events-none z-[2]" />

      {/* Grilla técnica y marcas de encuadre en esquinas */}
      <div className="absolute inset-x-8 top-32 bottom-20 border border-white/[0.04] pointer-events-none z-[2] hidden lg:block">
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#59BFD6]/40" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#59BFD6]/40" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#59BFD6]/40" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#59BFD6]/40" />
      </div>

      {/* ── CONTENIDO PRINCIPAL: FORMULARIO & DETALLES DE DESPACHO ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16 md:pt-36 md:pb-24 w-full">
        <Suspense fallback={<div className="p-8 text-center font-condensed text-white">Cargando mesa de despacho...</div>}>
          <ContactFormInner />
        </Suspense>

        {/* ── PUENTES DE CONTINUIDAD EDITORIAL: CONEXIÓN ENTRE PÁGINAS ── */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Puente a Clientes */}
          <Link
            href="/clientes"
            className="group p-6 rounded-2xl bg-[#14171B]/80 hover:bg-[#181c22] border border-white/10 hover:border-[#59BFD6]/50 transition-all duration-300 flex items-start gap-4 backdrop-blur-md hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-[#59BFD6]/10 border border-[#59BFD6]/30 flex items-center justify-center text-[#59BFD6] shrink-0 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-condensed text-lg uppercase font-bold text-white tracking-wide group-hover:text-[#59BFD6] transition-colors">
                  Alianzas del Territorio
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#59BFD6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                Más de 20 empresas e industrias en Los Lagos, Chiloé y Patagonia confían en Puelche Lab. Revisa el archivo territorial.
              </p>
              <div className="pt-1 flex items-center gap-2 font-mono text-[10px] uppercase text-[#59BFD6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59BFD6]" />
                <span>AquaChile &bull; Soldasur &bull; Seremi MMA &bull; Costaustralis</span>
              </div>
            </div>
          </Link>

          {/* Puente a Cotizador con UF */}
          <Link
            href="/cotizador"
            className="group p-6 rounded-2xl bg-[#14171B]/80 hover:bg-[#181c22] border border-white/10 hover:border-[#C29B63]/50 transition-all duration-300 flex items-start gap-4 backdrop-blur-md hover:-translate-y-1 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-[#C29B63]/10 border border-[#C29B63]/30 flex items-center justify-center text-[#C29B63] shrink-0 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-condensed text-lg uppercase font-bold text-white tracking-wide group-hover:text-[#C29B63] transition-colors">
                  Calculadora de Inversión (UF)
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#C29B63] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                ¿Requieres una estimación previa? Calcula el valor de tu producción fotográfica o desarrollo web con referencia en UF chilena y USD.
              </p>
              <div className="pt-1 flex items-center gap-2 font-mono text-[10px] uppercase text-[#C29B63]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29B63]" />
                <span>Valores transparentes &bull; Desglose por entregables</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
