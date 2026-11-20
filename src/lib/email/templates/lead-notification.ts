import { renderBaseEmailLayout } from './base-layout';

export interface InternalLeadData {
  name: string;
  company?: string;
  email?: string;
  phone: string;
  services: string[];
  budget: string;
  region: string;
  projectScale?: string;
  message?: string;
}

export function buildInternalLeadEmail(data: InternalLeadData): { subject: string; html: string; text: string } {
  const subject = `Nuevo Brief Web: ${data.name} — ${data.company || 'Independiente'}`;

  const cleanPhone = data.phone.replace(/[^0-9]/g, '');

  const contentHtml = `
    <div style="display: inline-block; padding: 4px 10px; background-color: rgba(89,191,214,0.15); border: 1px solid rgba(89,191,214,0.3); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #59BFD6; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px;">
      Alerta de Cotización Entrante
    </div>
    <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 24px; line-height: 30px; color: #FFFFFF; font-weight: 700;">
      ${data.name} ha enviado un encargo desde la web
    </h1>

    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.8;">
        <tr>
          <td style="color: rgba(255,255,255,0.45); width: 130px;">Contacto:</td>
          <td style="color: #FFFFFF; font-weight: 600;">${data.name}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Empresa / Marca:</td>
          <td style="color: #FFFFFF;">${data.company || 'No especificada'}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Teléfono / Móvil:</td>
          <td><a href="tel:${data.phone}" style="color: #59BFD6; font-weight: 600; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Correo Electrónico:</td>
          <td><a href="mailto:${data.email || ''}" style="color: #59BFD6; text-decoration: none;">${data.email || 'No proporcionado'}</a></td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Territorio / Región:</td>
          <td style="color: #FFFFFF;">${data.region}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Rango Inversión:</td>
          <td style="color: #FFFFFF; font-weight: 600;">${data.budget}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Servicios:</td>
          <td style="color: #59BFD6;">${data.services.join(', ') || 'Generales'}</td>
        </tr>
        ${data.message ? `
        <tr>
          <td style="color: rgba(255,255,255,0.45); vertical-align: top; padding-top: 8px;">Mensaje / Alcance:</td>
          <td style="color: rgba(255,255,255,0.85); padding-top: 8px; white-space: pre-wrap; font-style: italic;">"${data.message}"</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- BOTONES DE ACCIÓN INMEDIATA -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding-right: 8px; width: 50%;">
          <a href="https://wa.me/${cleanPhone}" 
             style="display: block; text-align: center; padding: 12px 16px; background-color: #25D366; color: #FFFFFF; font-weight: 700; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; border-radius: 8px;">
            Abrir WhatsApp &rarr;
          </a>
        </td>
        <td style="padding-left: 8px; width: 50%;">
          <a href="tel:${data.phone}" 
             style="display: block; text-align: center; padding: 12px 16px; background-color: rgba(255,255,255,0.1); color: #FFFFFF; font-weight: 700; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15);">
            Llamar al Cliente
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderBaseEmailLayout({
    preheader: `Nuevo Brief Entrante: ${data.name} (${data.company || 'Independiente'})`,
    title: subject,
    contentHtml,
    recipientEmail: 'paula.valdivieso@puelchelab.cl',
  });

  const text = `
Nuevo Brief Web — Puelche Lab
==============================
Cliente: ${data.name} (${data.company || 'Independiente'})
Teléfono: ${data.phone}
Email: ${data.email || 'No proporcionado'}
Región: ${data.region}
Presupuesto: ${data.budget}
Servicios: ${data.services.join(', ')}
Mensaje: ${data.message || 'Sin mensaje adicional'}

Responder por WhatsApp: https://wa.me/${cleanPhone}
  `.trim();

  return { subject, html, text };
}
