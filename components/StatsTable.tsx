"use client";

import React from "react";
// 1. UPDATE THE INTERFACE HERE
// We add 'alpha_score' as an optional property so TypeScript knows it's allowed
import { motion, AnimatePresence } from "framer-motion";
import { SlippageGauge } from "./SlippageGauge"; 

// If WhalePosition is imported, we can extend it or define it locally to be safe
interface WhalePosition {
  asset: string;
  size: string;
  socialAlpha?: string;
  alpha_score?: string; // Add this line
  whaleAlert?: boolean;
  strategic_intent?: string;
}

export function StatsTable({ data, loading }: { data: WhalePosition[], loading: boolean }) {
  if (loading && (!data || data.length === 0)) {
    return (
      <div className="p-20 bg-black border-4 border-black flex flex-col items-center justify-center gap-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-12 h-12 border-4 border-[#FFD200] border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-[#FFD200] font-mono text-xs animate-pulse tracking-[0.2em]">
            ESTABLISHING SECURE UPLINK
          </p>
          <p className="text-white/30 font-mono text-[8px] mt-2">BYPASSING SOLANA RPC FIREWALL</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(50,109,213,1)] overflow-hidden"
    >
      <div className="bg-[#326DD5] border-b-4 border-black p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-[#FFD200] rounded-full animate-pulse border border-black" />
          <h2 className="text-white font-black uppercase tracking-tighter text-xl italic">Live Inventory</h2>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-4 border-black bg-[#FFD200]">
              <th className="p-4 uppercase font-black border-r-4 border-black text-[10px] tracking-widest">Token</th>
              <th className="p-4 uppercase font-black border-r-4 border-black text-[10px] tracking-widest text-center">Holding</th>
              <th className="p-4 uppercase font-black border-r-4 border-black text-[10px] tracking-widest w-1/4">Sell Pressure</th>
              <th className="p-4 uppercase font-black border-r-4 border-black text-center text-[10px] tracking-widest">Reliability</th>
              <th className="p-4 uppercase font-black text-right text-[10px] tracking-widest">Whale Activity</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <AnimatePresence mode="popLayout">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-20 text-center font-mono text-xs text-black/40 italic">
                    {">"} NO TARGETS ACQUIRED IN THIS SECTOR
                  </td>
                </tr>
              ) : (
                data.map((pos, i) => (
                  <motion.tr 
                    key={pos.asset || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(50, 109, 213, 0.03)" }}
                    className="border-b-4 border-black last:border-b-0 transition-colors group cursor-crosshair relative"
                  >
                    <td className="p-6 border-r-4 border-black relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#326DD5]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                      <div className="flex items-baseline gap-2 relative z-10">
                        <span className="text-4xl font-black italic tracking-tighter uppercase group-hover:text-[#326DD5] transition-colors">
                          {pos.asset}
                        </span>
                      </div>
                    </td>

                    <td className="p-6 border-r-4 border-black font-mono font-bold text-center">
                      <span className="bg-black text-white px-2 py-1 text-sm inline-block shadow-[2px_2px_0px_0px_rgba(255,210,0,1)]">
                        {pos.size}
                      </span>
                    </td>

                    <td className="p-6 border-r-4 border-black">
                      <SlippageGauge size={pos.size || "0"} />
                    </td>

                    {/* ALPHA SCORE - FIXING TYPE ERROR HERE */}
                    <td className="p-6 text-center border-r-4 border-black relative">
                      <div className="relative inline-block">
                        <span className="text-5xl font-black text-[#326DD5] relative z-10">
                          {pos.alpha_score || pos.socialAlpha || "0"}%
                        </span>
                        <div className="absolute bottom-1 left-0 w-full h-3 bg-[#FFD200] z-0 opacity-60 skew-x-12" />
                      </div>
                    </td>

                    <td className="p-6 text-right">
                      <div className="flex flex-col items-end gap-2">
                        {pos.whaleAlert ? (
                          <>
                            <motion.span 
                              animate={{ x: [0, -2, 2, 0] }}
                              transition={{ repeat: Infinity, duration: 0.5 }}
                              className="bg-[#F2674A] text-white px-3 py-1 font-black text-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase italic"
                            >
                              Extraction Live
                            </motion.span>
                            <span className="text-[8px] font-mono font-bold animate-pulse text-red-600">
                              !! LIQUIDITY DRAIN IMMINENT !!
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="bg-emerald-500 text-white px-3 py-1 font-black text-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase italic">
                              Accumulating
                            </span>
                            <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">
                              Securing Floor
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      <div className="bg-black text-xs font-mono text-white p-3 px-6 flex justify-between items-center border-t-2 border-black/20">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span className="opacity-50">TOTAL TARGETS:</span> 
            <span className="font-black">{data.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">SIGNAL:</span>
            <span className="text-emerald-400 font-black animate-pulse">STRONG</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-50">LAST UPDATE:</span>
          <span className="font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
      </div>
    </motion.div>
  );
}