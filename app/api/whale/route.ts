import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || "pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A";

  const seedNum = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const generateData = (asset: string, baseSize: number) => {
    const randomFactor = (seedNum % (baseSize / 10)) + (baseSize / 2);
    const alpha = (seedNum % 40) + 60;
    
    return {
      // FIX: Added 'asset' so the first column stops being blank
      asset: asset, 
      target_asset: asset, 
      
      size: `${randomFactor.toLocaleString()} ${asset}`,
      amount: randomFactor,
      alpha_score: alpha.toString(),
      market_exit_risk: alpha > 80 ? "Low" : "Medium",
      strategic_intent: "ACCUMULATING"
    };
  };

  const dynamicData = [
    generateData('SOL', 10000),
    generateData('JUP', 500000),
    generateData('PYTH', 200000),
    generateData('WIF', 1000000),
  ];

  return NextResponse.json(dynamicData);
}