"use client";

import React from 'react';

export function SlippageGauge({ size, poolLiquidity = 100000 }: { size: string, poolLiquidity?: number }) {
  // Parse numeric value from string (e.g., "50.5 SOL" -> 50.5)
  const numericSize = parseFloat(size.replace(/[^\d.-]/g, '')) || 0;
  
  // Calculate Market Impact %
  const impact = (numericSize / poolLiquidity) * 100;

  let color = "bg-emerald-500";
  let label = "LOW_IMPACT";
  
  if (impact > 2) { color = "bg-[#FFD200]"; label = "SLIPPAGE_WARNING"; }
  if (impact > 10) { color = "bg-[#F2674A]"; label = "LIQUIDITY_CRUNCH"; }

  return (
    <div className="space-y-1 group">
      <div className="flex justify-between text-[8px] font-black uppercase mb-1">
        <span>Exit_Impact</span>
        <span className={impact > 5 ? "text-[#F2674A]" : "text-black"}>{impact.toFixed(2)}%</span>
      </div>
      <div className="h-3 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${Math.min(impact * 5, 100)}%` }}
        />
      </div>
      <p className="text-[7px] font-bold opacity-50 group-hover:opacity-100 transition-opacity uppercase">
        {label} // EST_PRICE_SLIPPAGE
      </p>
    </div>
  );
}