import { NextRequest, NextResponse } from 'next/server';
import { ContactBriefSchema, buildWhatsAppLink, ContactBrief } from '@/contracts';

/**
 * Persistencia en Supabase PostgreSQL (REST API nativa, zero-bundle overhead)
 */
async function persistLeadToSupabase(data: ContactBrief): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.info('[Supabase] Credenciales no configuradas en entorno; omitiendo inserción en DB.');
    return false;
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/leads_puelche`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        nombre: data.name,
        empresa: data.company || null,
        email: data.email || null,
        telefono: data.phone,
        servicios: data.services,
        presupuesto: data.budget,
        region: data.region,
        modalidad: data.projectScale || null,
        mensaje: data.message || null,
        origen: 'web_puelche_contacto',
        created_at: new Date().toISOString(),
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('[Supabase] Error en guardado de lead:', err);
    return false;
  }
}

/**
 * Notificación por correo vía Resend API (Directora Creativa Paula Valdivieso)
 */
async function dispatchEmailNotification(data: ContactBrief): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.info('[Resend] Llave no configurada en entorno; omitiendo notificación por correo.');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Puelche Lab Leads <contacto@puelchelab.cl>',
        to: ['paula.valdivieso@puelchelab.cl'],
        subject: `Nuevo Brief Web: ${data.name} (${data.company || 'Independiente'})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #111215; color: #FFFFFF; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #59BFD6; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Nuevo Brief Recibido</h2>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px;">Puelche Lab — Estudio de Diseño Cross Media y Fotografía</p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
            <table style="width: 100%; font-size: 14px; line-height: 1.8;">
              <tr><td style="color: rgba(255,255,255,0.5); width: 140px;">Nombre:</td><td><strong>${data.name}</strong></td></tr>
              <tr><td style="color: rgba(255,255,255,0.5);">Empresa:</td><td>${data.company || 'No especificada'}</td></tr>
              <tr><td style="color: rgba(255,255,255,0.5);">Teléfono:</td><td><a href="tel:${data.phone}" style="color: #59BFD6;">${data.phone}</a></td></tr>
              <tr><td style="color: rgba(255,255,255,0.5);">Email:</td><td><a href="mailto:${data.email}" style="color: #59BFD6;">${data.email || 'No proporcionado'}</a></td></tr>
              <tr><td style="color: rgba(255,255,255,0.5);">Región / Territorio:</td><td>${data.region}</td></tr>
              <tr><td style="color: rgba(255,255,255,0.5);">Presupuesto:</td><td>${data.budget}</td></tr>
              <tr><td style="color: rgba(255,255,255,0.5);">Servicios:</td><td>${data.services.join(', ') || 'Servicios generales'}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
              <div style="color: #59BFD6; font-size: 12px; text-transform: uppercase; margin-bottom: 6px;">Mensaje / Alcance:</div>
              <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px; white-space: pre-wrap;">${data.message || 'Sin mensaje adicional'}</p>
            </div>
          </div>
        `,
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('[Resend] Error enviando correo:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const startTime = performance.now();

  try {
    const body = await req.json();
    const parseResult = ContactBriefSchema.safeParse(body);

    if (!parseResult.success) {
      const issues = parseResult.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues,
          executionTimeMs: Math.round((performance.now() - startTime) * 100) / 100,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const whatsAppLink = buildWhatsAppLink(data);

    // Persistencia asíncrona no bloqueante
    const [savedToDb, emailSent] = await Promise.all([
      persistLeadToSupabase(data),
      dispatchEmailNotification(data),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Brief validado y procesado con éxito',
      whatsAppLink,
      sanitized: data,
      savedToDb,
      emailSent,
      executionTimeMs: Math.round((performance.now() - startTime) * 100) / 100,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON request body',
        executionTimeMs: Math.round((performance.now() - startTime) * 100) / 100,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      service: 'Puelche Lab Contact API (Capa Jev + Supabase + Resend)',
      status: 'operational',
      method: 'POST only',
      studio: 'Puerto Varas, Patagonia',
    },
    { status: 200 }
  );
}
