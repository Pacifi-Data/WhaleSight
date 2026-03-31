import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || "";

  // Helper to create "random" numbers based on the address string
  const seedNum = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const generateData = (asset: string, baseSize: number) => {
    const randomFactor = (seedNum % (baseSize / 10)) + (baseSize / 2);
    return {
      id: `${asset}-${seedNum}`,
      asset: asset,
      size: `${randomFactor.toLocaleString()} ${asset}`,
      rawSize: randomFactor, // We need this for the graph!
      markPrice: 100, 
      socialAlpha: (seedNum % 40) + 60,
      whaleAlert: seedNum % 2 === 0
    };
  };

  const dynamicData = [
    generateData('SOL', 10000),
    generateData('JUP', 500000),
    generateData('WIF', 200000),
    generateData('BONK', 10000000),
  ];

  return NextResponse.json(dynamicData);
}