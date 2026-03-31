"use client";

import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartProps {
  data: any[];
  isLoading: boolean;
}

export function AccountActivityChart({ data, isLoading }: ChartProps) {
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => {
      // Extract number from string like "50.5 SOL" or "1000 USDC"
      const rawSize = typeof item.size === 'string' 
        ? item.size.replace(/[^\d.-]/g, '') 
        : item.size;
      
      const numericValue = parseFloat(rawSize) || 0;

      return {
        name: item.asset || "Unknown",
        value: numericValue,
        fullLabel: item.size // Keep for tooltip
      };
    });
  }, [data]);

  if (isLoading || chartData.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center font-mono text-black uppercase tracking-widest">
        <div className="animate-spin mb-2">/</div>
        <p className="text-[10px] font-black">Syncing_Chain_Data...</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000020" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#000', fontSize: 10, fontWeight: '900' }} 
          />
          <YAxis axisLine={false} tickLine={false} tick={false} />
          <Tooltip 
            cursor={{ stroke: '#000', strokeWidth: 2 }}
            contentStyle={{ 
              backgroundColor: '#FFD200', 
              border: '4px solid black', 
              borderRadius: '0px', 
              fontFamily: 'monospace',
              fontWeight: '900'
            }} 
          />
          <Area 
            type="stepAfter" 
            dataKey="value" 
            stroke="#326DD5" 
            strokeWidth={4} 
            fill="#326DD5" 
            fillOpacity={0.4} 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}