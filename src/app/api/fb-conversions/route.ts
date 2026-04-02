import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, firstName, lastName, institution, role, segment, students } = body;

    const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return NextResponse.json({ error: 'Missing Meta credentials' }, { status: 500 });
    }

    // Hash sensitive data with SHA256 (Meta's requirement)
    const hashData = (data: string) => 
      data ? crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex') : undefined;

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: req.headers.get('referer') || '',
          user_data: {
            em: [hashData(email)],
            ph: [hashData(phone)],
            fn: [hashData(firstName)],
            ln: [hashData(lastName)],
            ct: [hashData('recife')],
            st: [hashData('pe')],
            zp: [hashData('50000000')],
          },
          test_event_code: TEST_EVENT_CODE, // Only for testing in Events Manager
        },
      ],
    };

    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    // 2. n8n Webhook Integration (Server-side)
    const N8N_WEBHOOK_URL = 'https://n8n.amais.io/webhook/1bc59109-831d-4154-932e-a3431a4b5015';
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          source: 'Landing Page - Estratégia Matadora',
          submittedAt: new Date().toISOString()
        }),
      });
    } catch (n8nError) {
      console.error('N8N Server-side Error:', n8nError);
    }

    const result = await fbResponse.json();
    return NextResponse.json({
      meta: result,
      n8n: 'success'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
