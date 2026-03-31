import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) return NextResponse.json({ error: "No address" }, { status: 400 });

  try {
    // USING BIRDEYE API (You can get a free API key at birdeye.so)
    const response = await fetch(
      `https://public-api.birdeye.so/v1/wallet/token_list?wallet=${address}`,
      {
        headers: {
          'X-API-KEY': process.env.BIRDEYE_API_KEY || '', // Put your key in .env
          'x-chain': 'solana'
        }
      }
    );

    const json = await response.json();
    
    // Map Birdeye data to YOUR WhalePosition interface
    const formattedData = json.data.items.map((item: any) => ({
      id: item.address,
      asset: item.symbol,
      size: `${item.uiAmount.toLocaleString()} ${item.symbol}`,
      markPrice: item.price || 0,
      socialAlpha: Math.floor(Math.random() * 100), // Random for now
      whaleAlert: item.value > 10000, // Alert if position > $10k
    }));

    return NextResponse.json(formattedData);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch chain data" }, { status: 500 });
  }
}