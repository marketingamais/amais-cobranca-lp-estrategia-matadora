import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phone, firstName, lastName, city, zip } = body;

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
            ct: [hashData(city || 'recife')],
            st: [hashData('pe')],
            zp: [hashData(zip)],
          },
          test_event_code: TEST_EVENT_CODE, // Only for testing in Events Manager
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
