import { getWhaleSentiment } from './elfa';
import { getPacificaPositions } from './pacifica'; // Ensure this is exported in pacifica.ts

export const analyzeAssetIntent = async (ticker: string) => {
  const cleanTicker = ticker.split('-')[0];
  const sentiment = await getWhaleSentiment(cleanTicker);

  const isBearish = sentiment && sentiment.score < 30;
  const isHighVolume = sentiment && sentiment.mentions > 100;

  return {
    score: sentiment?.score || 50,
    mentions: sentiment?.mentions || 0,
    whaleAlert: !!isBearish, 
    narrative: isHighVolume ? "High Social Volatility" : "Stable"
  };
};

export const getEnrichedPositions = async (walletAddress: string) => {
  try {
    // 1. Get raw positions from Pacifica
    const positions = await getPacificaPositions(walletAddress);

    // FIX: Check if positions exists and is an array. 
    // If Pacifica returns void/null, we default to an empty array [].
    if (!positions || !Array.isArray(positions)) {
      console.warn("WhaleSight: No positions found for this wallet.");
      return [];
    }

    // 2. Map through them
    const enriched = await Promise.all(positions.map(async (pos: any) => {
      const intent = await analyzeAssetIntent(pos.symbol || pos.asset || 'SOL');
      return {
        ...pos,
        socialScore: intent.score,
        whaleAlert: intent.whaleAlert,
        narrative: intent.narrative
      };
    }));

    return enriched;
  } catch (error) {
    console.error("Engine failure:", error);
    return []; // Always return an array to keep the UI from crashing
  }
};