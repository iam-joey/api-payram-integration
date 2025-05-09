import { NextRequest, NextResponse } from 'next/server';

// Use fetch since Bun supports it natively and it's available in Next.js API routes
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received request:', body);
    const { customerEmail, customerId, amountInUSD } = body;
    console.log('Received request:', { customerEmail, customerId, amountInUSD });
    // Validate required fields
    if (!customerEmail || !customerId || amountInUSD === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, customerId, amountInUSD' },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) {
      return NextResponse.json(
        { error: 'amountInUSD must be a number' },
        { status: 400 }
      );
    }
    if (amountInUSD < 0.5) {
      return NextResponse.json(
        { error: 'amountInUSD must be at least 0.5' },
        { status: 400 }
      );
    }

    const PAYRAM_API_URL = process.env.PAYRAM_API_URL;
    const API_KEY = process.env.API_KEY;

    console.log('PAYRAM_API_URL:', PAYRAM_API_URL);
    console.log('API_KEY:', API_KEY);

    if (!PAYRAM_API_URL || !API_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing PAYRAM_API_URL or API_KEY' },
        { status: 500 }
      );
    }
    console.log('Calling external API...');
    // Call external API
    const payramRes = await fetch(PAYRAM_API_URL, {
      method: 'POST',
      headers: {
        'API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail,
        customerId,
        amountInUSD,
      }),
    });
    console.log('Payment initiation response:', payramRes);
    if (!payramRes.ok) {
      const errorText = await payramRes.text();
      return NextResponse.json(
        { error: 'Failed to initiate payment', details: errorText },
        { status: 502 }
      );
    }
    console.log('Payment initiation response:', payramRes);
    const { reference_id, url } = await payramRes.json();

    // Optionally: Store reference_id in database for tracking
    console.log('Payment Reference ID:', reference_id);

    return NextResponse.json({ reference_id, url });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: err?.message },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
