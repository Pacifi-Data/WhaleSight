"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SUB-COMPONENT: PACIFICA SLIPPAGE GAUGE ---
function SlippageGauge({ score }: { score: number }) {
  const isCritical = score >= 70;
  
  return (
    <div className="flex flex-col gap-1 w-full max-w-[200px]">
      <div className="flex justify-between items-end mb-1">
        <span className="text-[8px] font-black uppercase opacity-50">Impact Depth</span>
        <span className={`text-[10px] font-mono font-bold ${isCritical ? 'text-[#F2674A]' : 'text-[#326DD5]'}`}>
          {score}%
        </span>
      </div>
      
      {/* THE SEGMENTED BAR */}
      <div className="flex gap-0.5 h-4 w-full">
        {[...Array(20)].map((_, i) => {
          const threshold = (i + 1) * 5;
          const isActive = score >= threshold;
          return (
            <div 
              key={i}
              className={`flex-1 border border-black/10 transition-all duration-500 ${
                isActive 
                  ? (threshold >= 70 ? 'bg-[#F2674A]' : 'bg-[#326DD5]') 
                  : 'bg-slate-100'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

// --- MAIN TABLE COMPONENT ---
interface WhalePosition {
  asset: string;
  size: string;
  alpha_score?: string;
  whaleAlert?: boolean;
}

export function StatsTable({ data, loading }: { data: WhalePosition[], loading: boolean }) {
  if (loading && (!data || data.length === 0)) {
    return (
      <div className="p-20 bg-white border-4 border-black flex flex-col items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-10 h-10 border-4 border-black border-t-[#326DD5] rounded-full animate-spin" />
        <p className="font-black italic mt-4 uppercase">Targeting Assets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* EXTERNAL LEGEND */}
      <div className="bg-black text-white p-3 border-4 border-black flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(50,109,213,1)]">
        <div className="flex items-center gap-4">
          <span className="text-[#FFD200] font-black text-[10px] uppercase tracking-widest">Slippage Gauge Legend:</span>
          <div className="flex gap-3">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase">
              <div className="w-2 h-2 bg-[#326DD5]" /> Low Impact
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase">
              <div className="w-2 h-2 bg-[#F2674A]" /> High Volatility
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
      >
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-4 border-black bg-white">
              <th className="p-4 uppercase font-black border-r-4 border-black text-[11px]">Asset</th>
              <th className="p-4 uppercase font-black border-r-4 border-black text-[11px] text-center">Holding</th>
              <th className="p-4 uppercase font-black border-r-4 border-black text-[11px]">Slippage Gauge</th>
              <th className="p-4 uppercase font-black text-right text-[11px]">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <AnimatePresence mode="popLayout">
              {data.map((pos, i) => {
                const score = parseInt(pos.alpha_score || "0");
                return (
                  <motion.tr 
                    key={pos.asset}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b-2 border-black last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 border-r-4 border-black">
                      <span className="text-2xl font-black italic uppercase tracking-tighter">${pos.asset}</span>
                    </td>

                    <td className="p-4 border-r-4 border-black text-center">
                      <span className="bg-black text-white px-2 py-1 font-black text-xs shadow-[3px_3px_0px_0px_rgba(50,109,213,1)]">
                        {pos.size}
                      </span>
                    </td>

                    <td className="p-4 border-r-4 border-black">
                      <SlippageGauge score={score} />
                    </td>

                    <td className="p-4 text-right">
                      <div className={`inline-block border-2 border-black px-2 py-0.5 font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                        pos.whaleAlert ? 'bg-[#F2674A] text-white animate-pulse' : 'bg-[#FFD200] text-black'
                      }`}>
                        {pos.whaleAlert ? 'Liquidity Risk' : 'Floor Stable'}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}