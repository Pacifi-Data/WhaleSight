import { useState, useEffect, useCallback } from 'react';
import { getEnrichedPositions } from '@/lib/engine';

export interface WhalePosition {
  id?: string;
  asset?: string;
  size?: string;
  markPrice?: number | string;
  liquidationPrice?: number | string;
  socialAlpha?: string | number;
  whaleAlert?: boolean;
}

export function useWhaleData(walletAddress: string) {
  const [data, setData] = useState<WhalePosition[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    if (!walletAddress) return;
    try {
      const enriched = (await getEnrichedPositions(walletAddress)) as WhalePosition[];
      setData(enriched ?? []);
    } catch (error) {
      console.error("WhaleData Refresh Error:", error);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      // Avoid calling state if the component unmounted during the async call
      try {
        const enriched = (await getEnrichedPositions(walletAddress)) as WhalePosition[];
        if (isMounted) {
          setData(enriched ?? []);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) setLoading(false);
      }
    };

    init();

    const interval = setInterval(() => {
      if (isMounted) {
        refreshData();
      }
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [walletAddress, refreshData]);

  // CRITICAL: This was missing! 
  // This allows page.tsx to destructure { data, loading }
  return { data, loading, refreshData };
}