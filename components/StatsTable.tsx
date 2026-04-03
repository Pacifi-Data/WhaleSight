"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhalePosition {
  asset: string;
  size: string;
  alpha_score?: string;
  whaleAlert?: boolean;
}

export function StatsTable({ data, loading }: { data: WhalePosition[], loading: boolean }) {
  if (loading) {
    return (
      <div className="p-20 bg-white border-4 border-black flex flex-col items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-10 h-10 border-4 border-black border-t-[#326DD5] rounded-full animate-spin mb-4" />
        <p className="font-black italic uppercase tracking-widest text-sm">Synchronizing Table...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-0 font-sans">
      {/* 1. SECTION TITLE - MATCHED TO ASSET SCAN SIZE */}
      <div className="bg-[#326DD5] border-4 border-black p-4 flex justify-between items-center shadow-[4px_0px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-[#FFD200] rounded-full animate-pulse border-2 border-black" />
          <h2 className="text-white font-black uppercase tracking-tighter text-xl italic leading-none">
            Market Depth Analysis
          </h2>
        </div>
        <div className="text-white/40 font-mono text-[9px] hidden md:block tracking-[0.2em]">
          PACIFICA_V3_LIVE
        </div>
      </div>

      {/* 2. MAIN TABLE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-x-4 border-b-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              {/* TABLE HEADERS - SCALED FOR BEGINNER CLARITY */}
              <tr className="border-b-4 border-black bg-slate-50 text-[11px] font-black uppercase tracking-tight">
                <th className="p-4 border-r-4 border-black w-[20%]">Token Name</th>
                <th className="p-4 border-r-4 border-black text-center w-[20%]">Total Held</th>
                <th className="p-4 border-r-4 border-black w-[40%] text-center">Sell Risk (SPI)</th>
                <th className="p-4 text-right w-[20%]">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <AnimatePresence mode="popLayout">
                {data.map((pos, i) => {
                  const score = parseInt(pos.alpha_score || "0");
                  const isHighPressure = score >= 70;

                  return (
                    <motion.tr 
                      key={pos.asset}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b-2 border-black last:border-b-0 hover:bg-slate-50 transition-colors group"
                    >
                      <td className="p-4 border-r-4 border-black">
                        <span className="text-xl font-black italic uppercase tracking-tighter group-hover:text-[#326DD5] transition-colors">
                          ${pos.asset}
                        </span>
                      </td>

                      <td className="p-4 border-r-4 border-black text-center font-mono font-bold">
                        <span className="bg-black text-white px-2 py-0.5 text-xs shadow-[2px_2px_0px_0px_rgba(255,210,0,1)] inline-block">
                          {pos.size}
                        </span>
                      </td>

                      <td className="p-4 border-r-4 border-black">
                        <div className="flex items-center gap-4 px-2">
                           <div className="flex-1 h-4 border-2 border-black bg-slate-100 relative overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                className={`h-full border-r-2 border-black transition-colors duration-500
                                  ${isHighPressure ? 'bg-[#F2674A]' : 'bg-[#326DD5]'}
                                `}
                              />
                           </div>
                           <span className={`text-[10px] font-black w-8 text-right ${isHighPressure ? 'text-[#F2674A]' : 'text-black'}`}>
                             {score}%
                           </span>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className={`inline-block border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                          ${pos.whaleAlert ? 'bg-[#F2674A] text-white animate-pulse' : 'bg-[#FFD200] text-black'}
                        `}>
                          {pos.whaleAlert ? 'Selling Now' : 'Holding Tight'}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 3. METRIC LEGEND (SINGLE LINE) */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-black text-white border-x-4 border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <p className="text-[10px] font-medium uppercase tracking-tight whitespace-nowrap">
            <span className="text-[#FFD200] font-black mr-3 border-r border-white/20 pr-3">
              Metric: SPI
            </span>
            Difficulty to sell without price impact. 
            <span className="text-[#F2674A] font-bold mx-2 italic underline underline-offset-2 decoration-1">Red (70%+)</span> high risk. 
            <span className="text-[#326DD5] font-bold mx-2 italic underline underline-offset-2 decoration-1">Blue</span> safe liquidity.
          </p>
          
          <div className="flex-1 border-b border-white/10 hidden md:block" />

          <div className="hidden lg:flex gap-4 shrink-0">
            <div className="flex items-center gap-1.5 text-[8px] font-black uppercase">
              <div className="w-2 h-2 bg-[#326DD5]" /> Stable
            </div>
            <div className="flex items-center gap-1.5 text-[8px] font-black uppercase">
              <div className="w-2 h-2 bg-[#F2674A]" /> Risk
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}