import nodemailer from 'nodemailer';
import type { Transporter, SendMailOptions } from 'nodemailer';
import type { SendEmailOptions, SendEmailResult } from './types';

// Configuración SMTP de Wirenet Chile (cPanel puelchelab.cl)
const SMTP_HOST = process.env.SMTP_HOST || 'mail.puelchelab.cl';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER || 'contacto@puelchelab.cl';
const SMTP_PASS = process.env.SMTP_PASS || 'PuelcheLab.2026!Studio';
const DEFAULT_FROM = process.env.SMTP_FROM || 'Puelche Lab <contacto@puelchelab.cl>';

let transporterInstance: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporterInstance) return transporterInstance;

  transporterInstance = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // SSL directo en puerto 465
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true, // Forzar certificado TLS válido
    },
    connectionTimeout: 6000, // 6 segundos timeout para no frenar la API
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  return transporterInstance;
}

/**
 * Despacha un correo mediante el servidor SMTP nativo de Wirenet Chile (cPanel)
 */
export async function sendViaSmtpWirenet(options: SendEmailOptions): Promise<SendEmailResult> {
  const startTime = performance.now();

  try {
    const transporter = getTransporter();

    // Normalizar destinatarios
    const toFormatted = Array.isArray(options.to)
      ? options.to.map((item) => (typeof item === 'string' ? item : `${item.name ? `"${item.name}" ` : ''}<${item.email}>`)).join(', ')
      : options.to;

    // Headers anti-spam estandarizados RFC 8058
    const headers: Record<string, string> = {
      'X-Mailer': 'PuelcheLab-Studio-Engine/1.0',
      'X-Studio-Location': 'Puerto Varas, Patagonia, Chile',
      ...(options.headers || {}),
    };

    if (options.unsubscribeUrl) {
      headers['List-Unsubscribe'] = `<${options.unsubscribeUrl}>`;
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    }

    const mailOptions: SendMailOptions = {
      from: options.from || DEFAULT_FROM,
      to: toFormatted,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      replyTo: options.replyTo || 'paula.valdivieso@puelchelab.cl',
      headers,
    };

    if (options.cc) mailOptions.cc = options.cc;
    if (options.bcc) mailOptions.bcc = options.bcc;

    const info = await transporter.sendMail(mailOptions);
    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

    return {
      success: true,
      provider: 'smtp_wirenet',
      messageId: info.messageId,
      durationMs,
    };
  } catch (error: any) {
    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
    console.warn('[SMTP Wirenet] Error despachando correo:', error?.message || error);
    return {
      success: false,
      provider: 'smtp_wirenet',
      error: error?.message || String(error),
      durationMs,
    };
  }
}
