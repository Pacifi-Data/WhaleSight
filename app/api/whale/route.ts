import { NextResponse } from 'next/server';
import { getEnrichedPositions } from '@/lib/engine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    // This runs on the SERVER, where process.env.PACIFICA_API_KEY works!
    const data = await getEnrichedPositions(address);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}