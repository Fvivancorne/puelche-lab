import { NextRequest, NextResponse } from 'next/server';
import { ContactBriefSchema, buildWhatsAppLink } from '@/contracts';

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

    return NextResponse.json({
      success: true,
      message: 'Brief validado con éxito',
      whatsAppLink,
      sanitized: data,
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
      service: 'Puelche Lab Contact API (Capa Jev)',
      status: 'operational',
      method: 'POST only',
      studio: 'Puerto Varas, Patagonia',
    },
    { status: 200 }
  );
}
