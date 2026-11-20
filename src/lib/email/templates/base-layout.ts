/**
 * Layout base HTML para correos corporativos y campañas de Puelche Lab
 * Estética Austral Darkroom: #0C0D10 fondo, #59BFD6 Cian Viento, tipografía nítida y pie legal anti-spam
 */

interface BaseEmailLayoutProps {
  preheader?: string;
  title: string;
  contentHtml: string;
  unsubscribeUrl?: string;
  recipientEmail?: string;
}

export function renderBaseEmailLayout({
  preheader,
  title,
  contentHtml,
  unsubscribeUrl,
  recipientEmail,
}: BaseEmailLayoutProps): string {
  const currentYear = new Date().getFullYear();
  const defaultUnsub = unsubscribeUrl || `https://puelchelab.cl/api/unsubscribe?email=${encodeURIComponent(recipientEmail || '')}`;

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #08090B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; }
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 100% !important; padding: 16px !important; }
      .hero-title { font-size: 24px !important; line-height: 30px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #08090B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #08090B; mso-hide: all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ''}
  
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #08090B;">
    <tr>
      <td align="center" style="padding: 32px 12px 48px 12px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width: 600px; width: 100%; background-color: #111215; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- CABECERA EDITORIAL DE ESTUDIO -->
          <tr>
            <td style="padding: 32px 36px 24px 36px; border-bottom: 1px solid rgba(255,255,255,0.06); background: linear-gradient(180deg, rgba(89,191,214,0.05) 0%, rgba(17,18,21,0) 100%);">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #59BFD6; margin-bottom: 4px;">
                      PUELCHE LAB &bull; PUERTO VARAS
                    </div>
                    <div style="font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic;">
                      Luz de estudio &bull; Territorio austral
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #59BFD6; box-shadow: 0 0 10px #59BFD6;"></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CUERPO PRINCIPAL DEL CORREO -->
          <tr>
            <td style="padding: 36px 36px 32px 36px;">
              ${contentHtml}
            </td>
          </tr>

          <!-- FIRMA DE AUTORES -->
          <tr>
            <td style="padding: 24px 36px 28px 36px; background-color: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.06);">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                    <strong style="color: #FFFFFF;">Alejandro Lattes & Paula Valdivieso</strong><br/>
                    Dirección Creativa, Fotografía de Autor & Producción Cross Media<br/>
                    <a href="https://puelchelab.cl" style="color: #59BFD6; text-decoration: none; font-size: 12px; letter-spacing: 0.05em;">puelchelab.cl</a> &bull; 
                    <a href="https://wa.me/56966177500" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 12px;">+56 9 6617 7500</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PIE LEGAL ANTI-SPAM & ENLACE DE DESUSCRIPCIÓN -->
          <tr>
            <td style="padding: 24px 36px 32px 36px; background-color: #0C0D0F; text-align: center; border-top: 1px solid rgba(255,255,255,0.04);">
              <p style="margin: 0 0 8px 0; font-size: 11px; line-height: 1.6; color: rgba(255,255,255,0.35);">
                Estás recibiendo este correo porque solicitaste información o mantienes un vínculo profesional con Estudio Puelche Lab (Puerto Varas, Región de Los Lagos, Chile).
              </p>
              <p style="margin: 0; font-size: 11px; line-height: 1.6; color: rgba(255,255,255,0.35);">
                Si no deseas recibir más actualizaciones o comunicaciones de proyectos, puedes 
                <a href="${defaultUnsub}" style="color: #59BFD6; text-decoration: underline;">desuscribirte en un clic aquí</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
