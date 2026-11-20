/**
 * Puelche Lab — Capa de Abstracción de Correo (Email Service Layer)
 * Tipos estrictos y contratos para despacho híbrido (SMTP cPanel Wirenet + Resend Fallback)
 */

export interface EmailRecipient {
  email: string;
  name?: string;
}

export type EmailProvider = 'smtp_wirenet' | 'resend_fallback' | 'simulated_dev';

export interface SendEmailOptions {
  to: string | string[] | EmailRecipient[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  unsubscribeUrl?: string;
  tags?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface SendEmailResult {
  success: boolean;
  provider: EmailProvider;
  messageId?: string;
  durationMs: number;
  error?: string;
}

export interface CampaignSubscriber {
  email: string;
  name: string;
  company?: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: string;
  unsubscribedAt?: string;
}
