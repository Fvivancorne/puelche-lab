'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, Clock, MapPin, Facebook, Instagram, Send, CheckCircle2, MessageCircle, RotateCcw } from 'lucide-react';

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
  'Proyecto Integral Cross-Media',
];

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

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : []
  );
  const [projectScale, setProjectScale] = useState<string>('Propuesta a la medida según alcance');
  const [selectedBudget, setSelectedBudget] = useState<string>('$1.5M — $3.0M CLP');
  const [selectedRegion, setSelectedRegion] = useState<string>('Puerto Varas & Cuenca Llanquihue');
  const [message, setMessage] = useState(
    initialProject ? `Consulta referente al proyecto: ${initialProject}` : ''
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const generateWhatsAppLink = () => {
    const srvText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Servicios generales';
    const msg = `Hola Puelche Lab,\n\nMi nombre es ${name || 'un prospecto'} de la empresa ${company || 'Independiente'}.\nUbicación: ${selectedRegion}\nServicios de interés: ${srvText}\nModalidad: ${projectScale}\n\nDetalles del proyecto:\n${message || 'Me gustaría coordinar una reunión para evaluar nuestra iniciativa.'}\n\nContacto: ${phone || email || 'vía WhatsApp'}`;
    return `https://wa.me/56966177500?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Formulario */}
      <div className="lg:col-span-7 space-y-6">
        <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-wider text-puelche-cyan">
          Contacto
        </h1>
        <p className="font-sans text-sm sm:text-base text-puelche-gray font-light">
          Para solicitar cotizaciones o información sobre nuestros servicios, por favor completa el formulario:
        </p>

        {submitted ? (
          <div className="bg-puelche-cyan/10 border border-puelche-cyan/30 rounded-lg p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-puelche-cyan mx-auto" />
            <h3 className="font-condensed text-2xl font-bold uppercase text-puelche-dark">
              Brief Recibido con Éxito
            </h3>
            <p className="font-sans text-sm text-puelche-gray">
              Gracias por escribirnos. Paula Valdivieso o nuestro equipo se pondrá en contacto contigo a la brevedad.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-puelche-cyan text-white hover:bg-puelche-cyan-dark font-condensed uppercase tracking-wider text-xs font-bold rounded-sm transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continuar por WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-puelche-slate text-white hover:bg-puelche-cyan font-condensed uppercase tracking-wider text-xs font-bold rounded-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Enviar otro requerimiento</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-1"
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
                className="w-full px-4 py-3 bg-[#F4F8FA] border border-gray-200 rounded-sm text-sm text-puelche-dark focus:outline-none focus:border-puelche-cyan focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="telefono"
                  className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-1"
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
                  className="w-full px-4 py-3 bg-[#F4F8FA] border border-gray-200 rounded-sm text-sm text-puelche-dark focus:outline-none focus:border-puelche-cyan focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-1"
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
                  className="w-full px-4 py-3 bg-[#F4F8FA] border border-gray-200 rounded-sm text-sm text-puelche-dark focus:outline-none focus:border-puelche-cyan focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Solicitud Checkboxes (Genuine Puelche Lab Fields) */}
            <div>
              <span className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-2">
                Solicitud
              </span>
              <div className="grid grid-cols-2 gap-3">
                {GENUINE_SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2 text-sm text-puelche-dark cursor-pointer font-sans select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-4 h-4 text-puelche-cyan focus:ring-puelche-cyan rounded border-gray-300"
                    />
                    <span className="text-xs font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Specialization Categories */}
            <div className="pt-2">
              <span className="block font-condensed uppercase tracking-wider text-xs text-puelche-slate/80 mb-2">
                Especialidad Adicional (Opcional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DETAILED_SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2 text-xs text-puelche-gray cursor-pointer font-sans select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleCheckboxChange(service)}
                      className="w-3.5 h-3.5 text-puelche-cyan focus:ring-puelche-cyan rounded border-gray-300"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modalidad de Proyecto & Región */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label
                  htmlFor="projectScale"
                  className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-1"
                >
                  Modalidad de Proyecto
                </label>
                <select
                  id="projectScale"
                  value={projectScale}
                  onChange={(e) => setProjectScale(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4F8FA] border border-gray-200 rounded-sm text-sm text-puelche-dark focus:outline-none focus:border-puelche-cyan"
                >
                  {PROJECT_SCALES.map((scale) => (
                    <option key={scale} value={scale}>{scale}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="region"
                  className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-1"
                >
                  Ubicación Territorial
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4F8FA] border border-gray-200 rounded-sm text-sm text-puelche-dark focus:outline-none focus:border-puelche-cyan"
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
                className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-1"
              >
                Si tienes más detalles de tu solicitud, escríbelas aquí:
              </label>
              <textarea
                id="mensaje"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos sobre tu proyecto o lo que necesitas cotizar..."
                className="w-full px-4 py-3 bg-[#F4F8FA] border border-gray-200 rounded-sm text-sm text-puelche-dark focus:outline-none focus:border-puelche-cyan focus:bg-white transition-colors resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-puelche-cyan text-white font-condensed uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-puelche-cyan-dark transition-all duration-200 shadow-md hover:scale-[1.02]"
              >
                <Send className="w-4 h-4 mr-2" />
                <span>ENVIAR</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Column: Datos de Contacto */}
      <div className="lg:col-span-5 bg-[#F8FAFB] p-8 sm:p-10 rounded-sm border border-gray-100 space-y-8">
        <div>
          <h2 className="font-condensed text-3xl font-bold uppercase tracking-wider text-puelche-cyan mb-4">
            Datos de Contacto
          </h2>
          <div className="space-y-3 font-sans text-sm text-puelche-dark">
            <p className="font-semibold text-base text-puelche-slate">Paula Valdivieso</p>
            <div className="flex items-center space-x-3 text-puelche-gray hover:text-puelche-cyan transition-colors">
              <Mail className="w-4 h-4 text-puelche-cyan shrink-0" />
              <a href="mailto:paula.valdivieso@puelchelab.cl">paula.valdivieso@puelchelab.cl</a>
            </div>
            <div className="flex items-center space-x-3 text-puelche-gray hover:text-puelche-cyan transition-colors">
              <Phone className="w-4 h-4 text-puelche-cyan shrink-0" />
              <a href="tel:+56966177500">+56 9 6617 7500</a>
            </div>
            <div className="flex items-center space-x-3 text-puelche-gray">
              <MapPin className="w-4 h-4 text-puelche-cyan shrink-0" />
              <span>Puerto Varas, Región de Los Lagos, Chile</span>
            </div>
            <div className="flex items-center space-x-3 text-puelche-gray">
              <Clock className="w-4 h-4 text-puelche-cyan shrink-0" />
              <span>Lunes a Viernes de 09:00 a 19:00 hrs.</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-puelche-cyan mb-4">
            Redes Sociales
          </h3>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com/puelchelab"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-puelche-slate text-white flex items-center justify-center hover:bg-puelche-cyan transition-colors"
              aria-label="Facebook Puelche Lab"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/puelche_lab/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-puelche-slate text-white flex items-center justify-center hover:bg-puelche-cyan transition-colors"
              aria-label="Instagram @puelche_lab"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16 md:pt-32 md:pb-24 w-full">
        <Suspense fallback={<div className="p-8 text-center font-condensed">Cargando formulario...</div>}>
          <ContactFormInner />
        </Suspense>
      </section>
    </div>
  );
}
