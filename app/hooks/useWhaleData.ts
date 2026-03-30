import { useState, useEffect, useCallback } from 'react';

// ADD 'export' HERE so other files can see it
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
  const [data, setData] = useState<WhalePosition[]>([]); // Use the interface here
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    if (!walletAddress) return;
    try {
      const response = await fetch(`/api/whale?address=${walletAddress}`);
      const enriched = await response.json();
      if (Array.isArray(enriched)) {
        setData(enriched);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  return { data, loading };
}