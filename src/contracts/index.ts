import { z } from 'zod';

/**
 * ============================================================================
 * CONTRATOS DETERMINISTAS (CAPA JEV / TYPESAFE) — PUELCHE LAB
 * ============================================================================
 * Validación estricta en servidor (<5ms) para asegurar que todos los inputs
 * externos cumplan el estándar antes de generar links o procesar leads.
 * ============================================================================
 */

export const ContactBriefSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  company: z.string().max(100).optional().default(''),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().min(8, 'Teléfono debe tener al menos 8 caracteres').max(25),
  services: z.array(z.string()).default([]),
  budget: z.string().default('$1.5M — $3.0M CLP'),
  region: z.string().default('Puerto Varas & Cuenca Llanquihue'),
  projectScale: z.string().optional().default('Propuesta a la medida según alcance'),
  message: z.string().max(2000).optional().default(''),
  clientTimestamp: z.string().optional(),
});

export type ContactBrief = z.infer<typeof ContactBriefSchema>;

export const ContactResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  whatsAppLink: z.string().url(),
  sanitized: ContactBriefSchema.optional(),
  executionTimeMs: z.number().nonnegative(),
});

export type ContactResponse = z.infer<typeof ContactResponseSchema>;

/** Generador determinista de enlace a WhatsApp con parámetros codificados */
export function buildWhatsAppLink(data: ContactBrief): string {
  const srvText = data.services.length > 0 ? data.services.join(', ') : 'Servicios generales';
  const compText = data.company ? ` de la empresa ${data.company}` : '';
  const msg = [
    `Hola Puelche Lab,`,
    ``,
    `Mi nombre es ${data.name}${compText}.`,
    `Ubicación: ${data.region}`,
    `Servicios de interés: ${srvText}`,
    `Presupuesto estimado: ${data.budget}`,
    `Modalidad: ${data.projectScale || 'Propuesta a la medida'}`,
    ``,
    `Detalles del proyecto:`,
    `${data.message || 'Me gustaría coordinar una reunión para evaluar nuestra iniciativa.'}`,
    ``,
    `Contacto: ${data.phone}${data.email ? ` | ${data.email}` : ''}`,
  ].join('\n');

  return `https://wa.me/56966177500?text=${encodeURIComponent(msg)}`;
}
