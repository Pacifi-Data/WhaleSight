import { useState, useEffect } from 'react';
export interface WhalePosition {  // <--- Add 'export' here
  id: string;
  asset: string;
  size: string;
  rawSize: number;
  markPrice: number;
  socialAlpha: number;
  whaleAlert: boolean;
}
export function useWhaleData(address: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/whale?address=${address}`);
        const json = await res.json();
        if (isMounted) setData(json);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [address]); // This triggers the reload when the address changes

  return { data, loading };
}