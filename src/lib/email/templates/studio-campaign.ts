import { renderBaseEmailLayout } from './base-layout';

export interface StudioCampaignData {
  recipientName: string;
  recipientEmail: string;
  campaignTitle: string;
  headline: string;
  bodyParagraphs: string[];
  featuredProjectTitle?: string;
  featuredProjectCategory?: string;
  featuredProjectUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  unsubscribeToken?: string;
}

export function buildStudioCampaignEmail(data: StudioCampaignData): { subject: string; html: string; text: string } {
  const subject = data.campaignTitle;
  const unsubscribeUrl = `https://puelchelab.cl/api/unsubscribe?email=${encodeURIComponent(data.recipientEmail)}&token=${data.unsubscribeToken || 'std'}`;

  const paragraphsHtml = data.bodyParagraphs
    .map((p) => `<p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.85);">${p}</p>`)
    .join('');

  const contentHtml = `
    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #59BFD6; margin-bottom: 10px;">
      Crónicas de Estudio & Territorio
    </div>
    <h1 class="hero-title" style="margin: 0 0 22px 0; font-size: 28px; line-height: 36px; color: #FFFFFF; font-weight: 700; letter-spacing: -0.02em;">
      ${data.headline}
    </h1>

    <div style="margin-bottom: 32px;">
      ${paragraphsHtml}
    </div>

    ${data.featuredProjectTitle ? `
    <!-- CASO DE ESTUDIO DESTACADO -->
    <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(89,191,214,0.25); border-radius: 12px; padding: 22px; margin-bottom: 28px; background: linear-gradient(135deg, rgba(89,191,214,0.06) 0%, rgba(17,18,21,0) 100%);">
      <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #59BFD6; margin-bottom: 6px;">
        ${data.featuredProjectCategory || 'Caso de Estudio Destacado'}
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #FFFFFF; font-weight: 600;">
        ${data.featuredProjectTitle}
      </h3>
      <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.65);">
        Fotografía de autor en gran formato, rodaje aéreo 4K y diseño cross media desarrollado en la Patagonia.
      </p>
      ${data.featuredProjectUrl ? `
      <a href="${data.featuredProjectUrl}" style="display: inline-block; font-size: 12px; font-weight: 700; color: #59BFD6; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
        Ver Obra Completa en Alta Resolución &rarr;
      </a>
      ` : ''}
    </div>
    ` : ''}

    <!-- BOTÓN DE ACCIÓN PRINCIPAL -->
    ${data.ctaText && data.ctaUrl ? `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding-top: 8px; padding-bottom: 12px;">
          <a href="${data.ctaUrl}" 
             style="display: inline-block; padding: 14px 32px; background-color: #59BFD6; color: #08090B; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; border-radius: 9999px; box-shadow: 0 4px 20px rgba(89,191,214,0.25);">
            ${data.ctaText} &rarr;
          </a>
        </td>
      </tr>
    </table>
    ` : ''}
  `;

  const html = renderBaseEmailLayout({
    preheader: data.headline,
    title: subject,
    contentHtml,
    unsubscribeUrl,
    recipientEmail: data.recipientEmail,
  });

  const text = `
${data.campaignTitle}
=====================================================

${data.headline}

${data.bodyParagraphs.join('\n\n')}

${data.featuredProjectTitle ? `Caso destacado: ${data.featuredProjectTitle} (${data.featuredProjectUrl || 'https://puelchelab.cl/portafolio'})` : ''}

${data.ctaText ? `${data.ctaText}: ${data.ctaUrl}` : 'Visita https://puelchelab.cl'}

Para desuscribirte de futuras comunicaciones: ${unsubscribeUrl}
  `.trim();

  return { subject, html, text };
}
