import { buildQuoteConfirmationEmail } from '../src/lib/email/templates/quote-confirmation';
import { buildInternalLeadEmail } from '../src/lib/email/templates/lead-notification';
import { buildStudioCampaignEmail } from '../src/lib/email/templates/studio-campaign';
import { renderBaseEmailLayout } from '../src/lib/email/templates/base-layout';

async function runEmailCampaignStressSuite() {
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║     PUELCHE LAB — EMAIL CAMPAIGN & SERVICE LAYER STRESS SUITE        ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testId: string, description: string) {
    if (condition) {
      console.log(`  ✔ PASS [${testId}] ${description}`);
      passed++;
    } else {
      console.error(`  ✖ FAIL [${testId}] ${description}`);
      failed++;
    }
  }

  // ── TEST CATEGORY 1: BASE LAYOUT & RFC 8058 COMPLIANCE ──
  {
    const html = renderBaseEmailLayout({
      title: 'Puelche Lab — Prueba Austral',
      contentHtml: '<h1>Test Content</h1>',
      preheader: 'Preheader austral',
      unsubscribeUrl: 'https://puelchelab.cl/api/unsubscribe?email=test%40puelchelab.cl',
    });

    assert(html.includes('#08090B'), 'EMAIL-01', 'Base layout uses Austral Darkroom canvas (#08090B)');
    assert(html.includes('#111215'), 'EMAIL-02', 'Base layout uses elevated darkroom card surface (#111215)');
    assert(html.includes('#59BFD6'), 'EMAIL-03', 'Base layout uses surgical Puelche Cyan accent (#59BFD6)');
    assert(html.includes('https://puelchelab.cl/api/unsubscribe'), 'EMAIL-04', 'Base layout renders legal RFC 8058 unsubscribe link');
    assert(html.includes('41°19') && html.includes('72°59'), 'EMAIL-05', 'Base layout includes Puerto Varas geographic coordinates in header');
  }

  // ── TEST CATEGORY 2: QUOTE CONFIRMATION TEMPLATE ──
  {
    const quote = buildQuoteConfirmationEmail({
      clientName: 'Matías Silva',
      clientEmail: 'matias@frutillar.cl',
      companyName: 'Teatro del Lago',
      services: ['Fotografía de Autor', 'Diseño Cross Media'],
      budget: '60 UF - 120 UF',
      region: 'Región de Los Lagos',
      estimatedCLP: 3500000,
      estimatedUF: 84.6,
      message: 'Necesitamos cobertura de conciertos y archivo fotográfico para la temporada 2026.',
    });

    assert(quote.subject.includes('Teatro del Lago'), 'EMAIL-06', 'Quote confirmation subject includes company name');
    assert(quote.html.includes('Matías Silva'), 'EMAIL-07', 'Quote confirmation HTML personalizes with client name');
    assert(quote.html.includes('84.6 UF'), 'EMAIL-08', 'Quote confirmation HTML displays estimated UF correctly');
    assert(quote.html.includes('$3.500.000 CLP'), 'EMAIL-09', 'Quote confirmation HTML formats CLP with Chilean thousands separator');
    assert(quote.html.includes('wa.me/56966177500'), 'EMAIL-10', 'Quote confirmation HTML links directly to Paula Valdivieso WhatsApp');
  }

  // ── TEST CATEGORY 3: INTERNAL LEAD ALERT TEMPLATE ──
  {
    const lead = buildInternalLeadEmail({
      name: 'Camila Echeverría',
      email: 'camila@hotelpatagonia.cl',
      phone: '+56 9 9876 5432',
      company: 'Hotel Cabaña del Lago',
      services: ['Fotografía Inmobiliaria', 'Video Dron 4K'],
      budget: '40 UF - 80 UF',
      region: 'Puerto Varas & Ensenada',
      message: 'Requerimos renovación de catálogo visual de habitaciones y spa.',
    });

    assert(lead.subject.includes('Camila Echeverría'), 'EMAIL-11', 'Lead notification subject includes lead name');
    assert(lead.html.includes('tel:56998765432'), 'EMAIL-12', 'Lead notification HTML contains sanitized click-to-call link');
    assert(lead.html.includes('wa.me/56998765432'), 'EMAIL-13', 'Lead notification HTML generates click-to-WhatsApp link for prospect');
    assert(lead.html.includes('Hotel Cabaña del Lago'), 'EMAIL-14', 'Lead notification HTML highlights company name');
    assert(lead.html.includes('Puerto Varas &amp; Ensenada') || lead.html.includes('Puerto Varas & Ensenada'), 'EMAIL-15', 'Lead notification HTML preserves territorial region');
  }

  // ── TEST CATEGORY 4: STUDIO CAMPAIGN / BROADCAST TEMPLATE ──
  {
    const campaign = buildStudioCampaignEmail({
      recipientName: 'Alejandro Lattes',
      recipientEmail: 'alejandro@puelchelab.cl',
      campaignTitle: 'Expedición Fiordo Comau & Volcán Michinmahuida',
      headline: 'Bitácora de Luz en la Península de Huequi',
      bodyParagraphs: [
        'Durante cuatro días navegamos los fiordos australes capturando la interacción de la marea con la selva valdiviana.',
        'Compartimos con ustedes las primeras placas fotográficas procesadas en nuestro taller.',
      ],
      ctaText: 'Ver Placas en Alta Resolución',
      ctaUrl: 'https://puelchelab.cl/portafolio',
    });

    assert(campaign.subject === 'Expedición Fiordo Comau & Volcán Michinmahuida', 'EMAIL-16', 'Campaign subject matches campaignTitle exactly');
    assert(campaign.html.includes('Bitácora de Luz en la Península de Huequi'), 'EMAIL-17', 'Campaign HTML contains editorial headline');
    assert(campaign.html.includes('selva valdiviana'), 'EMAIL-18', 'Campaign HTML renders body paragraphs correctly');
    assert(campaign.html.includes('Ver Placas en Alta Resolución'), 'EMAIL-19', 'Campaign HTML contains custom CTA label');
    assert(campaign.html.includes('https://puelchelab.cl/portafolio'), 'EMAIL-20', 'Campaign HTML contains CTA destination link');
  }

  console.log('\n======================================================================');
  console.log('              EMAIL CAMPAIGN SUITE EXECUTION SUMMARY                  ');
  console.log('======================================================================');
  console.log(`  Total Tests Executed : ${passed + failed}`);
  console.log(`  Passed               : ${passed}`);
  console.log(`  Failed               : ${failed}`);
  console.log(`  Success Rate         : ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  console.log('======================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runEmailCampaignStressSuite().catch((err) => {
  console.error('Unhandled error in test suite:', err);
  process.exit(1);
});
