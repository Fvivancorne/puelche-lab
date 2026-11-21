import { NextResponse } from 'next/server';
import { sendStudioEmail } from '@/lib/email/dispatcher';
import { buildStudioCampaignEmail } from '@/lib/email/templates/studio-campaign';
import { buildQuoteConfirmationEmail } from '@/lib/email/templates/quote-confirmation';
import { buildInternalLeadEmail } from '@/lib/email/templates/lead-notification';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      pin,
      recipientEmail,
      templateType = 'studio-campaign',
      customSubject,
      customHeadline,
      customBody,
      customCtaText,
      customCtaUrl,
    } = body;

    // 1. Verificación de Seguridad del PIN de Administrador
    if (!pin || pin !== 'puelche2026') {
      return NextResponse.json(
        { success: false, error: 'Acceso no autorizado: PIN de administración incorrecto' },
        { status: 401 }
      );
    }

    // 2. Validación de Destinatario
    if (!recipientEmail || typeof recipientEmail !== 'string' || !recipientEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Dirección de correo de prueba inválida o vacía' },
        { status: 400 }
      );
    }

    let subject = customSubject || 'Prueba de Sistema — Capa de Email Puelche Lab';
    let html = '';
    let text = '';

    if (templateType === 'quote-confirmation') {
      const built = buildQuoteConfirmationEmail({
        clientName: 'Cliente de Prueba',
        clientEmail: recipientEmail,
        companyName: 'Studio Partner SpA',
        services: ['Fotografía de Autor', 'Diseño Cross Media'],
        budget: '50 UF - 100 UF',
        region: 'Región de Los Lagos',
        estimatedCLP: 2450000,
        estimatedUF: 59.2,
        message: 'Expedición fotográfica y plataforma web editorial austral.',
      });
      subject = customSubject || built.subject;
      html = built.html;
      text = built.text;
    } else if (templateType === 'lead-notification') {
      const built = buildInternalLeadEmail({
        name: 'Explorador Austral',
        email: recipientEmail,
        phone: '+56 9 6617 7500',
        company: 'Reserva Huilo Huilo',
        services: ['Fotografía de Arquitectura', 'Video Cinemático'],
        budget: '40 UF - 80 UF',
        region: 'Región de Los Ríos / Los Lagos',
        message: 'Requerimos cobertura fotográfica documental de autor para temporada 2026.',
      });
      subject = customSubject || built.subject;
      html = built.html;
      text = built.text;
    } else {
      // Default: studio-campaign
      const built = buildStudioCampaignEmail({
        recipientName: 'Mesa Directiva',
        recipientEmail,
        campaignTitle: customHeadline || 'Expediciones Australes 2026: Nueva Colección',
        headline: customHeadline || 'La Luz Austral como Lenguaje Visual',
        bodyParagraphs: customBody
          ? [customBody]
          : [
              'Te escribimos directamente desde nuestro taller en Puerto Varas. Durante los últimos meses hemos documentado el territorio entre el Lago Llanquihue y los fiordos patagónicos con lentes Sony G Master.',
              'Este correo es una prueba de verificación del servicio de email propio de Puelche Lab sobre Wirenet Chile (mail.puelchelab.cl:465 SSL), operando a costo $0 y con certificación RFC 8058.',
            ],
        ctaText: customCtaText || 'Explorar Archivo Óptico',
        ctaUrl: customCtaUrl || 'https://puelchelab.cl/portafolio',
      });
      subject = customSubject || built.subject;
      html = built.html;
      text = built.text;
    }

    // 3. Ejecutar Despacho mediante Despachador Híbrido (SMTP cPanel -> Fallback Resend)
    const result = await sendStudioEmail({
      to: recipientEmail,
      subject: `[TEST] ${subject}`,
      html,
      text,
      replyTo: 'paula.valdivieso@puelchelab.cl',
      unsubscribeUrl: `https://puelchelab.cl/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}`,
    });

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      messageId: result.messageId,
      error: result.error,
      durationMs: result.durationMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Error interno del servidor de correo' },
      { status: 500 }
    );
  }
}
