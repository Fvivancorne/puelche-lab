import type { SendEmailOptions, SendEmailResult } from './types';
import { sendViaSmtpWirenet } from './smtp-transport';
import { buildQuoteConfirmationEmail, type QuoteConfirmationData } from './templates/quote-confirmation';
import { buildInternalLeadEmail, type InternalLeadData } from './templates/lead-notification';
import { buildStudioCampaignEmail, type StudioCampaignData } from './templates/studio-campaign';

/**
 * Despacho secundario de respaldo vía Resend API (si está configurado)
 */
async function sendViaResendFallback(options: SendEmailOptions): Promise<SendEmailResult> {
  const startTime = performance.now();
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return {
      success: false,
      provider: 'resend_fallback',
      error: 'RESEND_API_KEY no configurada',
      durationMs: 0,
    };
  }

  try {
    const toList = Array.isArray(options.to)
      ? options.to.map((item) => (typeof item === 'string' ? item : item.email))
      : [options.to];

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: options.from || 'Puelche Lab <contacto@puelchelab.cl>',
        to: toList,
        subject: options.subject,
        html: options.html,
        text: options.text,
        reply_to: options.replyTo || 'paula.valdivieso@puelchelab.cl',
      }),
    });

    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        provider: 'resend_fallback',
        error: `Resend HTTP ${res.status}: ${errorText}`,
        durationMs,
      };
    }

    const json = await res.json();
    return {
      success: true,
      provider: 'resend_fallback',
      messageId: json.id,
      durationMs,
    };
  } catch (err: any) {
    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      success: false,
      provider: 'resend_fallback',
      error: err?.message || String(err),
      durationMs,
    };
  }
}

/**
 * Despachador Universal de Correo de Puelche Lab (Capa Híbrida)
 * Intenta 1° SMTP Wirenet cPanel -> Fallback 2° Resend
 */
export async function sendStudioEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  // 1. Intento Primario: Servidor SMTP nativo de Wirenet cPanel ($0 costo, sin límites)
  const smtpResult = await sendViaSmtpWirenet(options);
  if (smtpResult.success) {
    console.info(`[Email Service Layer] Correo enviado exitosamente vía ${smtpResult.provider} (${smtpResult.durationMs}ms)`);
    return smtpResult;
  }

  console.warn(`[Email Service Layer] Fallo en SMTP Primario: ${smtpResult.error}. Iniciando fallback secundario...`);

  // 2. Intento Secundario: Fallback a Resend API
  const resendResult = await sendViaResendFallback(options);
  if (resendResult.success) {
    console.info(`[Email Service Layer] Correo enviado exitosamente vía ${resendResult.provider} (${resendResult.durationMs}ms)`);
    return resendResult;
  }

  // 3. Fallo controlado: registrar sin romper el flujo de la aplicación
  console.error('[Email Service Layer] Ambos proveedores fallaron:', {
    smtpError: smtpResult.error,
    resendError: resendResult.error,
  });

  return {
    success: false,
    provider: 'smtp_wirenet',
    error: `Fallo dual: SMTP (${smtpResult.error}) | Resend (${resendResult.error})`,
    durationMs: smtpResult.durationMs + resendResult.durationMs,
  };
}

/**
 * Métodos semánticos de alto nivel para la web
 */

export async function sendQuoteConfirmationToClient(data: QuoteConfirmationData): Promise<SendEmailResult> {
  const { subject, html, text } = buildQuoteConfirmationEmail(data);
  return sendStudioEmail({
    to: data.clientEmail,
    subject,
    html,
    text,
    replyTo: 'paula.valdivieso@puelchelab.cl',
    unsubscribeUrl: `https://puelchelab.cl/api/unsubscribe?email=${encodeURIComponent(data.clientEmail)}`,
  });
}

export async function sendInternalBriefAlert(data: InternalLeadData): Promise<SendEmailResult> {
  const { subject, html, text } = buildInternalLeadEmail(data);
  return sendStudioEmail({
    to: ['paula.valdivieso@puelchelab.cl', 'alejandro@puelchelab.cl'],
    subject,
    html,
    text,
    replyTo: data.email || 'contacto@puelchelab.cl',
  });
}

export async function sendCampaignBroadcast(data: StudioCampaignData): Promise<SendEmailResult> {
  const { subject, html, text } = buildStudioCampaignEmail(data);
  return sendStudioEmail({
    to: data.recipientEmail,
    subject,
    html,
    text,
    replyTo: 'paula.valdivieso@puelchelab.cl',
    unsubscribeUrl: `https://puelchelab.cl/api/unsubscribe?email=${encodeURIComponent(data.recipientEmail)}&token=${data.unsubscribeToken || 'std'}`,
  });
}
