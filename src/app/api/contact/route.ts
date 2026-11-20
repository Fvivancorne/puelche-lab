import { NextRequest, NextResponse } from 'next/server';
import { ContactBriefSchema, buildWhatsAppLink, ContactBrief } from '@/contracts';
import { sendInternalBriefAlert, sendQuoteConfirmationToClient } from '@/lib/email/dispatcher';

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
 * Notificación por correo vía Capa Híbrida de Estudio (SMTP cPanel Wirenet + Resend Fallback)
 * Despacha alerta a Paula & Alejandro y confirmación de cortesía al cliente si proporcionó email.
 */
async function dispatchEmailNotification(data: ContactBrief): Promise<boolean> {
  try {
    // 1. Alerta interna para la dirección de Puelche Lab
    const alertResult = await sendInternalBriefAlert({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      services: data.services,
      budget: data.budget,
      region: data.region,
      projectScale: data.projectScale,
      message: data.message,
    });

    // 2. Si el cliente ingresó correo, enviar confirmación de cortesía de autor
    if (data.email) {
      sendQuoteConfirmationToClient({
        clientName: data.name,
        companyName: data.company,
        clientEmail: data.email,
        services: data.services,
        budget: data.budget,
        region: data.region,
        message: data.message,
      }).catch((e) => console.warn('[Email Layer] Error en acuse al cliente:', e));
    }

    return alertResult.success;
  } catch (err) {
    console.warn('[Email Layer] Error despachando notificaciones:', err);
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
