import { NextRequest, NextResponse } from 'next/server';

let webhookData: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    //keep a check on the header you will get the api key extract it and validate and process those requests only
    webhookData.push(data);
    console.log('Received webhook data:', data);
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  return NextResponse.json(webhookData, { status: 200 });
}


