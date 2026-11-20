import { renderBaseEmailLayout } from './base-layout';

export interface QuoteConfirmationData {
  clientName: string;
  companyName?: string;
  clientEmail: string;
  services: string[];
  budget: string;
  region: string;
  estimatedUF?: number;
  estimatedCLP?: number;
  message?: string;
}

export function buildQuoteConfirmationEmail(data: QuoteConfirmationData): { subject: string; html: string; text: string } {
  const subject = `Propuesta en marcha: Puelche Lab & ${data.companyName || data.clientName}`;

  const contentHtml = `
    <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 26px; line-height: 32px; color: #FFFFFF; font-weight: 700; letter-spacing: -0.02em;">
      Tu proyecto ha entrado a mesa de autor.
    </h1>
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.75);">
      Hola <strong>${data.clientName}</strong>, confirmamos la recepción de tu solicitud. En Puelche Lab no trabajamos con plantillas genéricas ni subcontrataciones opacas: cada encargo es evaluado directamente por Alejandro Lattes y Paula Valdivieso en Puerto Varas.
    </p>

    <!-- RESUMEN TÉCNICO DE LA SOLICITUD -->
    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #59BFD6; margin-bottom: 12px;">
        Ficha de Encargo & Territorio
      </div>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; line-height: 1.8;">
        <tr>
          <td style="color: rgba(255,255,255,0.45); width: 130px;">Cliente / Marca:</td>
          <td style="color: #FFFFFF; font-weight: 600;">${data.clientName} ${data.companyName ? `(${data.companyName})` : ''}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Servicios:</td>
          <td style="color: #59BFD6;">${data.services.join(' &bull; ') || 'Fotografía de Autor / Cross Media'}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Territorio / Región:</td>
          <td style="color: #FFFFFF;">${data.region}</td>
        </tr>
        <tr>
          <td style="color: rgba(255,255,255,0.45);">Inversión estimada:</td>
          <td style="color: #FFFFFF; font-weight: 600;">
            ${data.estimatedUF ? `${data.estimatedUF} UF (~$${data.estimatedCLP?.toLocaleString('es-CL')} CLP)` : data.budget}
          </td>
        </tr>
        ${data.message ? `
        <tr>
          <td style="color: rgba(255,255,255,0.45); vertical-align: top; padding-top: 6px;">Alcance / Notas:</td>
          <td style="color: rgba(255,255,255,0.85); padding-top: 6px; font-style: italic;">"${data.message}"</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- BOTÓN DE ACCIÓN / DIÁLOGO DIRECTO -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding-bottom: 12px;">
          <a href="https://wa.me/56966177500?text=${encodeURIComponent(`Hola Paula y Alejandro, envié la cotización para ${data.companyName || data.clientName} desde la web.`)}" 
             style="display: inline-block; padding: 14px 28px; background-color: #59BFD6; color: #08090B; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; border-radius: 9999px; box-shadow: 0 4px 15px rgba(89,191,214,0.3);">
            Conversar por WhatsApp Directo &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = renderBaseEmailLayout({
    preheader: `Puelche Lab ha recibido tu encargo para ${data.companyName || data.clientName}`,
    title: subject,
    contentHtml,
    recipientEmail: data.clientEmail,
  });

  const text = `
Puelche Lab — Estudio de Diseño Cross Media y Fotografía de Autor
================================================================

Hola ${data.clientName},

Confirmamos la recepción de tu solicitud. Tu proyecto está siendo revisado por Alejandro Lattes y Paula Valdivieso en Puerto Varas.

Resumen del encargo:
- Cliente: ${data.clientName} ${data.companyName ? `(${data.companyName})` : ''}
- Servicios: ${data.services.join(', ')}
- Territorio: ${data.region}
- Presupuesto: ${data.budget}

Diálogo directo por WhatsApp: https://wa.me/56966177500
Web oficial: https://puelchelab.cl

Para desuscribirte de comunicaciones: https://puelchelab.cl/api/unsubscribe?email=${encodeURIComponent(data.clientEmail)}
  `.trim();

  return { subject, html, text };
}
