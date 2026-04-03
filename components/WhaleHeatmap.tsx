"use client";

import React from "react";

export function WhaleHeatmap({ data }: { data: any[] }) {
  // 1. DATA VALIDATION & SORTING (Largest to Smallest)
  const validData = data
    ?.filter(item => {
      const amount = parseFloat(String(item.amount).replace(/,/g, ''));
      return !isNaN(amount) && amount > 0;
    })
    .sort((a, b) => {
      const amtA = parseFloat(String(a.amount).replace(/,/g, ''));
      const amtB = parseFloat(String(b.amount).replace(/,/g, ''));
      return amtB - amtA; 
    }) || [];

  // 2. CALCULATE GLOBAL TOTAL
  const globalTotal = validData.reduce((sum, item) => 
    sum + parseFloat(String(item.amount).replace(/,/g, '')), 0
  );

  // 3. COLOR SCALE (NEW PALETTE)
  const getAmountColor = (ratio: number) => {
    if (ratio >= 0.40) return "bg-[#947BFC]"; // Whale (Light Purple)
    if (ratio >= 0.15) return "bg-[#326DD5]"; // Growth (Blue)
    return "bg-[#01033E]";                  // Entry (Deep Navy)
  };

  return (
    <div className="border-4 border-black bg-[#F1E4ED] p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-3">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#01033E]">
          Pacifica Asset Heatmap
        </h3>
        <div className="flex items-center gap-2 text-[#01033E]/60 font-black text-[9px] uppercase italic shrink-0">
           <div className="w-2 h-2 bg-[#947BFC] rounded-full animate-pulse" />
           Inventory Scaled
        </div>
      </div>
      
      {/* HEATMAP CONTAINER (FIT TO BOX) */}
      <div className="flex w-full border-4 border-black bg-black p-1 overflow-hidden h-[140px]">
        {validData.map((item, i) => {
          const amount = parseFloat(String(item.amount).replace(/,/g, ''));
          const ratio = (amount / globalTotal);
          const percentage = (ratio * 100).toFixed(1);

          // Dynamic check to ensure small tokens stay visible
          const isSmall = ratio < 0.15;

          return (
            <div 
              key={i} 
              style={{ 
                flex: `${amount} 1 0%`,
                minWidth: '90px' // Guaranteed space for $SOL name
              }}
              className={`h-full border-2 border-black relative transition-all overflow-hidden shrink ${getAmountColor(ratio)}`}
            >
              <div className="p-3 h-full flex flex-col justify-between relative z-10">
                <div className={`flex ${isSmall ? 'flex-col gap-0' : 'justify-between items-start gap-1'}`}>
                  {/* TOKEN NAME: Standardized size with small-box fallback */}
                  <span className={`font-black text-white italic leading-none uppercase truncate ${isSmall ? 'text-[13px] mb-1' : 'text-xl md:text-2xl'}`}>
                    ${item.asset}
                  </span>
                  
                  {/* % BADGE */}
                  <span className="bg-black/60 text-[7px] text-white px-1 font-mono font-bold border border-white/10 self-start">
                    {percentage}%
                  </span>
                </div>
                
                {/* SIZE DISPLAY: Enlarged for visibility */}
                <div className="mt-auto bg-black/30 p-1.5 border-t border-white/10 -mx-3 -mb-3">
                  <p className={`font-black text-white leading-none uppercase tracking-tighter truncate ${isSmall ? 'text-[9px]' : 'text-[11px]'}`}>
                    SIZE: {item.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER LEGEND */}
      <div className="mt-6 flex flex-wrap gap-6 text-[11px] font-black uppercase italic tracking-tight text-[#01033E]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#947BFC] border-2 border-black" /> 
          <span>Whale Position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#326DD5] border-2 border-black" /> 
          <span>Growth Position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#01033E] border-2 border-black" /> 
          <span>Entry Position</span>
        </div>
      </div>
    </div>
  );
}