'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

const SERVICES = [
  'Fotografía Arquitectura & Hotelería',
  'Fotografía Industrial & Dron 4K',
  'Diseño de Marca & Identidad',
  'Desarrollo Web Next.js',
  'Diseño Editorial & Memorias',
  'Proyecto Integral Cross-Media',
];

const BUDGETS = [
  '$1.5M — $3.0M CLP',
  '$3.0M — $6.0M CLP',
  '$6.0M — $12.0M CLP',
  '+$12.0M CLP (Corporativo)',
];

const REGIONS = [
  'Puerto Varas & Cuenca Llanquihue',
  'Puerto Montt',
  'Archipiélago de Chiloé',
  'Carretera Austral / Aysén',
  'Magallanes & Torres del Paine',
  'Santiago / Otra Región',
];

function ContactForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('servicio') || '';
  const initialProject = searchParams.get('proyecto') || '';

  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : []
  );
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Puerto Varas & Cuenca Llanquihue');
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [details, setDetails] = useState<string>(
    initialProject ? `Consulta referente al proyecto: ${initialProject}` : ''
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleService = (srv: string) => {
    setSelectedServices(prev =>
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  // Generate pre-filled WhatsApp message
  const generateWhatsAppLink = () => {
    const srvText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Servicios generales';
    const budText = selectedBudget || 'Por definir';
    const msg = `Hola Puelche Lab,\n\nMi nombre es ${name || 'un prospecto'} de la empresa ${company || 'Independiente'}.\nUbicación: ${selectedRegion}\nServicios de interés: ${srvText}\nPresupuesto estimado: ${budText}\n\nDetalles del proyecto:\n${details || 'Me gustaría coordinar una reunión para evaluar nuestra iniciativa.'}\n\nContacto: ${phone || email || 'vía WhatsApp'}`;
    return `https://wa.me/56966177500?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Direct Studio Information */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-puelche-ink/10 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-puelche-forest font-semibold">
              Sede Central
            </span>
            <h3 className="font-serif text-2xl font-bold text-puelche-ink mt-2">
              Puelche Lab — Estudio & Taller
            </h3>
            <p className="text-sm text-puelche-charcoal mt-2 leading-relaxed">
              Ubicados en Puerto Varas, operando con equipamiento propio y vehículos todo terreno para despliegues a lo largo de la Patagonia.
            </p>
          </div>

          <div className="space-y-5 text-sm font-sans border-t border-puelche-ink/5 pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-puelche-sand/60 flex items-center justify-center text-puelche-ink shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-puelche-copper" />
              </div>
              <div>
                <div className="font-mono text-xs text-puelche-forest font-bold uppercase">Dirección Física</div>
                <div className="text-puelche-ink font-medium mt-0.5">San José 530, Puerto Varas</div>
                <div className="text-xs text-puelche-charcoal/70">Región de Los Lagos, Chile</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-puelche-sand/60 flex items-center justify-center text-puelche-ink shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-puelche-copper" />
              </div>
              <div>
                <div className="font-mono text-xs text-puelche-forest font-bold uppercase">Teléfono & WhatsApp</div>
                <div className="text-puelche-ink font-medium mt-0.5">+56 9 6617 7500</div>
                <div className="text-xs text-puelche-charcoal/70">Línea directa para coordinación de terreno</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-puelche-sand/60 flex items-center justify-center text-puelche-ink shrink-0 mt-0.5">
                <Mail className="w-5 h-5 text-puelche-copper" />
              </div>
              <div>
                <div className="font-mono text-xs text-puelche-forest font-bold uppercase">Correo Electrónico</div>
                <div className="text-puelche-ink font-medium mt-0.5">hola@puelchelab.cl</div>
                <div className="text-xs text-puelche-charcoal/70">Respuesta formal en menos de 24 hrs hábiles</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-puelche-sand/60 flex items-center justify-center text-puelche-ink shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-puelche-copper" />
              </div>
              <div>
                <div className="font-mono text-xs text-puelche-forest font-bold uppercase">Horario de Operación</div>
                <div className="text-puelche-ink font-medium mt-0.5">Lunes a Viernes — 09:00 a 18:30 hrs</div>
                <div className="text-xs text-puelche-charcoal/70">Expediciones fotográficas fines de semana según pronóstico</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-puelche-sand/40 border border-puelche-ink/5 flex items-center justify-between">
            <span className="text-xs font-mono text-puelche-charcoal">¿Necesitas respuesta inmediata?</span>
            <Link
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-mono font-bold hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Abrir WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Briefing Form */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-puelche-ink/10 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-puelche-sand text-puelche-forest mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-puelche-copper" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-puelche-ink">
                Brief Recibido con Éxito
              </h3>
              <p className="text-puelche-charcoal text-base max-w-md mx-auto leading-relaxed">
                Gracias {name || 'por tu interés'}. Hemos registrado los requerimientos de {company || 'tu proyecto'}. Uno de nuestros directores se pondrá en contacto contigo en las próximas 24 horas.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agilizar por WhatsApp</span>
                </Link>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-puelche-sand text-puelche-ink text-xs font-mono uppercase tracking-wider hover:bg-puelche-ink hover:text-white transition-colors"
                >
                  Enviar otro requerimiento
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">
                  Fase 01 — Disciplinas de Interés
                </span>
                <h3 className="font-serif text-2xl font-bold text-puelche-ink mt-1 mb-4">
                  ¿Qué componentes requiere tu proyecto?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`text-left p-3 rounded-xl border text-xs font-mono transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'bg-puelche-ink text-puelche-canvas border-puelche-ink font-bold'
                            : 'bg-puelche-canvas/60 text-puelche-charcoal border-puelche-ink/10 hover:border-puelche-ink/30'
                        }`}
                      >
                        <span>{srv}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-puelche-copper shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper">
                  Fase 02 — Rango de Inversión Estimado
                </span>
                <h3 className="font-serif text-xl font-bold text-puelche-ink mt-1 mb-3">
                  Presupuesto objetivo para la iniciativa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setSelectedBudget(b)}
                      className={`text-left p-3 rounded-xl border text-xs font-mono transition-all duration-200 ${
                        selectedBudget === b
                          ? 'bg-puelche-copper text-puelche-ink font-bold border-puelche-copper'
                          : 'bg-puelche-canvas/60 text-puelche-charcoal border-puelche-ink/10 hover:border-puelche-ink/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Geographic Territory */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-puelche-copper mb-2">
                  Fase 03 — Ubicación / Territorio de la Obra
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-puelche-ink/15 bg-puelche-canvas/60 text-sm font-sans text-puelche-ink focus:outline-none focus:ring-2 focus:ring-puelche-copper/40"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-puelche-ink/10">
                <span className="text-xs font-mono uppercase tracking-widest text-puelche-copper block">
                  Fase 04 — Datos de Contacto
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-puelche-charcoal mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Francisca Bennett"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-puelche-ink/15 bg-puelche-canvas/60 text-sm focus:outline-none focus:ring-2 focus:ring-puelche-copper/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-puelche-charcoal mb-1">Empresa / Proyecto</label>
                    <input
                      type="text"
                      placeholder="Ej. Hotel o Inmobiliaria"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-3 rounded-xl border border-puelche-ink/15 bg-puelche-canvas/60 text-sm focus:outline-none focus:ring-2 focus:ring-puelche-copper/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-puelche-charcoal mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@empresa.cl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-puelche-ink/15 bg-puelche-canvas/60 text-sm focus:outline-none focus:ring-2 focus:ring-puelche-copper/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-puelche-charcoal mb-1">Teléfono Móvil / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+56 9 1234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-puelche-ink/15 bg-puelche-canvas/60 text-sm focus:outline-none focus:ring-2 focus:ring-puelche-copper/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-puelche-charcoal mb-1">
                    Breve descripción del desafío o fecha tentativa de entrega
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre el alcance, plazos o si requieres una visita técnica en terreno..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-3 rounded-xl border border-puelche-ink/15 bg-puelche-canvas/60 text-sm focus:outline-none focus:ring-2 focus:ring-puelche-copper/40"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-puelche-ink text-puelche-canvas font-mono text-xs uppercase tracking-widest font-bold hover:bg-puelche-copper hover:text-puelche-ink transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Brief por Plataforma</span>
                </button>
                <Link
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-puelche-sand/80 hover:bg-[#25D366] hover:text-white text-puelche-ink font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 border border-puelche-ink/10"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                  <span>Enviar Directo por WhatsApp</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div className="w-full flex-1 pt-8 md:pt-12 pb-24 px-6 md:px-12 bg-puelche-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-puelche-ink/10 pb-12 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-puelche-forest mb-4">
            <span className="w-2 h-2 rounded-full bg-puelche-copper"></span>
            <span>Mesa de Trabajo & Cotización</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-puelche-ink mb-6">
            Iniciemos una conversación.
          </h1>
          <p className="text-lg md:text-xl text-puelche-charcoal max-w-3xl leading-relaxed font-sans">
            Completa el brief estructurado a continuación o contáctanos de forma directa vía WhatsApp para evaluar disponibilidad de fechas en terreno.
          </p>
        </div>

        <Suspense fallback={<div className="p-12 text-center font-mono text-xs">Cargando formulario...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
