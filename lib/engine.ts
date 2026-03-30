import { getWhaleSentiment } from './elfa';
import { getPacificaPositions } from './pacifica';

// 1. Define the intent logic HERE
export const analyzeAssetIntent = async (ticker: string) => {
  const cleanTicker = ticker.split('-')[0];
  const sentiment = await getWhaleSentiment(cleanTicker);

  const isBearish = sentiment && sentiment.score < 30;
  
  return {
    score: sentiment?.score || 50,
    whaleAlert: !!isBearish,
    narrative: isBearish ? "High Bearish" : "Stable"
  };
};

// 2. Use it in the enrichment function
export const getEnrichedPositions = async (walletAddress: string) => {
  const positions = await getPacificaPositions(walletAddress);
  
  // MOCK DATA FALLBACK (Keep this for the hackathon!)
  const dataToUse = (!positions || positions.length === 0) 
    ? [{ symbol: 'SOL-PERP', size: '100' }] 
    : positions;

  return Promise.all(dataToUse.map(async (pos: any) => {
    const intent = await analyzeAssetIntent(pos.symbol || 'SOL');
    return {
      ...pos,
      asset: pos.symbol || 'SOL',
      socialAlpha: intent.score,
      whaleAlert: intent.whaleAlert
    };
  }));
};