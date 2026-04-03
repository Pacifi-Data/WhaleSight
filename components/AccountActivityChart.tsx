"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface ActivityData {
  asset: string;
  size: string;
}

export function AccountActivityChart({ data, isLoading }: { data: ActivityData[], isLoading: boolean }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const parsed = data.map(item => {
      const stringSize = String(item.size || "0");
      // Clean numbers like "$1,200,000 JUP" or "500,000 SOL"
      const numericValue = parseFloat(stringSize.replace(/[$, ]/g, '').replace(/[a-zA-Z]/g, ''));
      return { 
        ...item, 
        val: isNaN(numericValue) ? 0 : numericValue 
      };
    });

    const maxVal = Math.max(...parsed.map(d => d.val), 1);

    return parsed.map(d => ({
      ...d,
      displayHeight: Math.max((d.val / maxVal) * 100, 8),
      isHighest: d.val === maxVal && d.val > 0
    }));
  }, [data]);

  if (isLoading) return (
    <div className="h-96 w-full flex items-center justify-center border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <span className="font-black italic animate-pulse tracking-widest text-xl uppercase">CALIBRATING WEIGHTS...</span>
    </div>
  );

  return (
    <div className="relative border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* HEADER SECTION */}
      <div className="mb-10 space-y-2">
        <div className="flex justify-between items-end">
          <div className="max-w-md">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2">
              ASSET WEIGHTING
            </h3>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed">
              Visualizing how this whale divides their wealth. <span className="text-black font-black">Larger blocks represent higher conviction</span> in that asset.
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="bg-black text-white text-[10px] px-2 py-1 font-black uppercase mb-1">
              MAX CONVICTION
            </div>
          </div>
        </div>
        <div className="h-1.5 w-full bg-black" />
      </div>

      {/* CHART AREA */}
      <div className="h-72 w-full relative flex items-end justify-around gap-4 px-4">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 pt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t-2 border-black/5" />
          ))}
        </div>

        {chartData.map((item, i) => (
          <div key={i} className="relative flex-1 flex flex-col items-center h-full justify-end group">
            
            {/* ASSET SIZE BADGE */}
            <div className={`mb-2 font-black text-[10px] px-1.5 py-0.5 border-2 border-black whitespace-nowrap z-10 transition-transform group-hover:scale-110
              ${item.isHighest ? 'bg-[#F2674A] text-white' : 'bg-white text-black'}
            `}>
              {item.size}
            </div>

            {/* UNIFIED COLOR BAR */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${item.displayHeight}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.05 }}
              className={`w-full max-w-[80px] border-x-4 border-t-4 border-black relative
                ${item.isHighest ? 'bg-[#F2674A]' : 'bg-[#326DD5]'}
              `}
            >
              {/* Highlight Effect for the Winner */}
              {item.isHighest && (
                <div className="absolute -inset-1 border-2 border-[#F2674A] animate-pulse pointer-events-none" />
              )}
              
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-white/10" />
            </motion.div>

            {/* TICKER LABEL */}
            <div className={`mt-3 w-full text-center py-1 border-2 border-black transition-colors
              ${item.isHighest ? 'bg-black text-white' : 'bg-slate-100 text-black group-hover:bg-slate-200'}
            `}>
              <span className="font-black italic text-[13px] uppercase tracking-tighter">
                ${item.asset}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER METRICS */}
      <div className="mt-8 pt-2 border-t-4 border-black flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-black">
             Live Portfolio Scan
           </span>
        </div>
        <div className="flex gap-2">
           <div className="px-2 py-0.5 bg-[#F2674A] text-white text-[9px] font-black uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Peak</div>
           <div className="px-2 py-0.5 bg-[#326DD5] text-white text-[9px] font-black uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Holding</div>
        </div>
      </div>
    </div>
  );
}