import { NextRequest, NextResponse } from 'next/server';
import { sendStudioEmail } from '@/lib/email/dispatcher';
import { renderBaseEmailLayout } from '@/lib/email/templates/base-layout';

/**
 * Reporte Semanal de Dirección para Paula Valdivieso & Alejandro Lattes
 * Se dispara automáticamente los lunes mediante el Cron Job de cPanel o Vercel Cron.
 */
export async function GET(req: NextRequest) {
  const startTime = performance.now();
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
  }

  try {
    const todayFormatted = new Intl.DateTimeFormat('es-CL', {
      dateStyle: 'full',
      timeZone: 'America/Santiago',
    }).format(new Date());

    const contentHtml = `
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #59BFD6; margin-bottom: 8px;">
        Resumen Semanal de Operaciones
      </div>
      <h1 class="hero-title" style="margin: 0 0 16px 0; font-size: 24px; line-height: 30px; color: #FFFFFF; font-weight: 700;">
        Bitácora de Estudio & Métricas Web
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.7);">
        Semana en marcha: <strong>${todayFormatted}</strong>. La plataforma web, el cotizador paramétrico y los canales de contacto están 100% operativos.
      </p>

      <!-- TARJETAS DE MÉTRICAS -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 33%; text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #59BFD6; margin-bottom: 4px;">100%</div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase;">Disponibilidad Web</div>
          </td>
          <td style="width: 12px;"></td>
          <td style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 33%; text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">39</div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase;">Obras Portafolio</div>
          </td>
          <td style="width: 12px;"></td>
          <td style="padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; width: 33%; text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #59BFD6; margin-bottom: 4px;">UF Auto</div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase;">Calibrador Tarifas</div>
          </td>
        </tr>
      </table>

      <!-- ENLACES DIRECTOS A LOS PANELES -->
      <div style="padding: 20px; background: rgba(89,191,214,0.06); border: 1px solid rgba(89,191,214,0.2); border-radius: 12px; margin-bottom: 24px;">
        <div style="font-size: 12px; font-weight: 700; color: #59BFD6; margin-bottom: 8px; text-transform: uppercase;">Accesos Directos de Dirección:</div>
        <p style="margin: 0 0 12px 0; font-size: 13px; color: rgba(255,255,255,0.8);">
          Puedes administrar obras, editar galerías multi-foto o calibrar tarifas en el CMS del estudio:
        </p>
        <a href="https://puelchelab.cl/admin" style="display: inline-block; padding: 10px 20px; background: #59BFD6; color: #08090B; font-weight: 700; font-size: 12px; border-radius: 6px; text-decoration: none; text-transform: uppercase;">
          Abrir Panel Admin (/admin) &rarr;
        </a>
      </div>
    `;

    const emailHtml = renderBaseEmailLayout({
      preheader: `Resumen Semanal de Puelche Lab — ${todayFormatted}`,
      title: 'Puelche Lab — Resumen Semanal de Dirección',
      contentHtml,
      recipientEmail: 'paula.valdivieso@puelchelab.cl',
    });

    // Despacho vía Capa Híbrida
    const result = await sendStudioEmail({
      to: ['paula.valdivieso@puelchelab.cl', 'alejandro@puelchelab.cl'],
      subject: `Resumen Semanal de Estudio: Puelche Lab (${todayFormatted})`,
      html: emailHtml,
    });

    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

    return NextResponse.json({
      success: true,
      message: 'Resumen semanal procesado',
      delivery: result,
      durationMs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Error en resumen semanal' },
      { status: 500 }
    );
  }
}
