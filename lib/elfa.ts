// src/lib/elfa.ts

export interface ElfaSentiment {
  score: number;        // 0-100 (Bearish to Bullish)
  mentions: number;     // How many "Smart Accounts" are talking
  rank: number;         // Social ranking on Solana
  isTrending: boolean;
}

export const getWhaleSentiment = async (ticker: string): Promise<ElfaSentiment | null> => {
  const apiKey = process.env.ELFA_API_KEY;

  if (!apiKey) {
    console.error("WhaleSight Error: ELFA_API_KEY is missing in .env.local");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.elfa.ai/v1/mentions?ticker=${ticker.toUpperCase()}`, 
      {
        method: 'GET',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        // Revalidate every 60 seconds to keep dashboard fresh but save API credits
        next: { revalidate: 60 } 
      }
    );

    if (!response.ok) {
      throw new Error(`Elfa API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Map the Elfa API response to our WhaleSight structure
    // Note: Adjust 'data.sentiment' based on Elfa's exact JSON keys
    return {
      score: data.sentiment_score ?? 50,
      mentions: data.mention_count ?? 0,
      rank: data.rank ?? 999,
      isTrending: data.is_trending ?? false,
    };

  } catch (error) {
    console.error(`WhaleSight Social Sync Error [${ticker}]:`, error);
    return null;
  }
};