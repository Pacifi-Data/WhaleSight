"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export function AccountActivityChart({ data, isLoading }: { data: any[], isLoading: boolean }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // CLEANING THE DATA: Convert "1,200,000 JUP" -> 1200000
    const parsed = data.map(item => {
      const stringSize = String(item.size || "0");
      const numericValue = parseFloat(stringSize.replace(/,/g, '').split(' ')[0]);
      return { 
        ...item, 
        val: isNaN(numericValue) ? 0 : numericValue 
      };
    });

    const maxVal = Math.max(...parsed.map(d => d.val), 1);

    return parsed.map(d => ({
      ...d,
      // Calculate percentage: (Current / Max) * 100
      // We add Math.max(..., 10) so the bar is never 0px tall
      displayHeight: Math.max((d.val / maxVal) * 100, 10) 
    }));
  }, [data]);

  if (isLoading) return <div className="h-64 flex items-center justify-center font-black animate-pulse">LOADING DATA CHART...</div>;

  return (
    <div className="h-80 w-full bg-white border-4 border-black p-8 relative flex items-end justify-around gap-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Y-Axis Indicator Line */}
      <div className="absolute left-0 w-full h-0.5 bg-black/10 border-dashed border-b bottom-[20%]" />
      <div className="absolute left-0 w-full h-0.5 bg-black/10 border-dashed border-b bottom-[50%]" />
      <div className="absolute left-0 w-full h-0.5 bg-black/10 border-dashed border-b bottom-[80%]" />

      {chartData.map((item, i) => (
        <div key={i} className="relative flex-1 flex flex-col items-center group h-full justify-end">
          
          {/* THE DYNAMIC BAR */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${item.displayHeight}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="w-full max-w-12.5 bg-[#326DD5] border-4 border-black relative group-hover:bg-[#FFD200] transition-colors"
          >
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 pointer-events-none" />
            
            {/* Size Label on Top */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 whitespace-nowrap z-50">
              {item.size}
            </div>
          </motion.div>

          {/* ASSET NAME */}
          <span className="mt-4 font-black italic text-xs uppercase tracking-tighter">
            {item.asset}
          </span>
          
          {/* Visual Percentage Tag */}
          <span className="text-[8px] font-mono text-slate-400">
            {Math.round(item.displayHeight)}%_ALLOC
          </span>
        </div>
      ))}

      {/* Side Label */}
      <div className="absolute -left-10 top-1/2 -rotate-90 text-[10px] font-black uppercase tracking-widest text-slate-300">
        Inventory Weight
      </div>
    </div>
  );
}