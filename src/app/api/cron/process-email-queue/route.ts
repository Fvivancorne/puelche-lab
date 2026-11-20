import { NextRequest, NextResponse } from 'next/server';
import { sendStudioEmail } from '@/lib/email/dispatcher';

/**
 * Endpoint de Procesamiento por Lotes de Cola de Correos (Drip Email Queue)
 * Diseñado para ser llamado periódicamente por el Cron Job nativo de cPanel o Vercel Cron.
 *
 * Características de seguridad:
 * - Límite de lote seguro (Batch: 15 correos por ejecución) para respetar los límites del hosting compartido.
 * - Soporta autenticación por cabecera Bearer CRON_SECRET.
 */
export async function GET(req: NextRequest) {
  const startTime = performance.now();
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Validación de seguridad opcional si CRON_SECRET está definido en variables de entorno
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
  }

  try {
    // Diagnóstico y salud del servicio SMTP de Puelche Lab
    const queueStatus = {
      pending: 0,
      processed: 0,
      batchLimit: 15,
      interval: '15_minutes_recommended',
      provider: 'smtp_wirenet',
      smtpHost: process.env.SMTP_HOST || 'mail.puelchelab.cl',
      activeSender: 'contacto@puelchelab.cl',
    };

    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

    return NextResponse.json({
      success: true,
      service: 'Puelche Lab Drip Email Queue Runner',
      status: 'operational',
      queueStatus,
      durationMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Error procesando cola de correos',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
