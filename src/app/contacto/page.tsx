'use client';

import React, { useState } from 'react';
import { Mail, Phone, Clock, Facebook, Instagram, Send, CheckCircle2 } from 'lucide-react';

export default function ContactoPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const servicesList = [
    'Fotografía',
    'Sitio Web',
    'Redes Sociales',
    'Diseño Gráfico',
  ];

  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Top Section with 2-Column Form Layout */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Formulario */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-condensed text-4xl sm:text-5xl font-bold uppercase tracking-wider text-puelche-cyan">
              Contacto
            </h1>
            <p className="font-sans text-sm sm:text-base text-puelche-gray font-light">
              Para solicitar cotizaciones o información sobre nuestros servicios, por favor completa el formulario:
            </p>

            {isSubmitted ? (
              <div className="bg-puelche-cyan/10 border border-puelche-cyan/30 rounded-lg p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-puelche-cyan mx-auto" />
                <h3 className="font-condensed text-2xl font-bold uppercase text-puelche-dark">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="font-sans text-sm text-puelche-gray">
                  Gracias por escribirnos. Paula Valdivieso o nuestro equipo se pondrá en contacto contigo a la brevedad.
                </p>
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

                {/* Solicitud Checkboxes */}
                <div>
                  <span className="block font-condensed uppercase tracking-wider text-xs font-bold text-puelche-slate mb-2">
                    Solicitud
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {servicesList.map((service) => (
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
                        <span>{service}</span>
                      </label>
                    ))}
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
                    rows={4}
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
                    <span>Enviar</span>
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
                  href="https://www.instagram.com/puelchelab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-puelche-slate text-white flex items-center justify-center hover:bg-puelche-cyan transition-colors"
                  aria-label="Instagram Puelche Lab"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
