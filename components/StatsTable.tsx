"use client";

import React from "react";
import { WhalePosition } from "../app/hooks/useWhaleData"; 
import { motion, AnimatePresence } from "framer-motion";
import { SlippageGauge } from "./SlippageGauge"; 

export function StatsTable({ data, loading }: { data: WhalePosition[], loading: boolean }) {
  if (loading && (!data || data.length === 0)) {
    return <div className="p-20 text-center font-black animate-pulse uppercase">Syncing_Nodes...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(50,109,213,1)]"
    >
      {/* Header Bar */}
      <div className="bg-[#326DD5] border-b-4 border-black p-4 flex justify-between items-center">
        <h2 className="text-white font-black uppercase tracking-tighter text-xl italic">Live_Inventory_Intel</h2>
        <div className="flex gap-4 text-[10px] text-white font-mono">
          <span>STATUS: <span className="text-emerald-400">ENCRYPTED</span></span>
          <span>BKK_NODE_01</span>
        </div>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-4 border-black bg-[#FFD200]">
            <th className="p-4 uppercase font-black border-r-4 border-black text-xs">Target_Asset</th>
            <th className="p-4 uppercase font-black border-r-4 border-black text-xs">Position_Size</th>
            <th className="p-4 uppercase font-black border-r-4 border-black text-xs w-1/4">Market_Exit_Risk</th>
            <th className="p-4 uppercase font-black border-r-4 border-black text-center text-xs">Alpha_Score</th>
            <th className="p-4 uppercase font-black text-right text-xs">Strategic_Intent</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {data.map((pos, i) => (
              <motion.tr 
                key={pos.asset || i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="border-b-4 border-black last:border-b-0 hover:bg-slate-50 transition-colors"
              >
                {/* 1. ASSET */}
                <td className="p-6 text-4xl font-black italic border-r-4 border-black tracking-tighter">
                  {pos.asset}
                </td>

                {/* 2. SIZE */}
                <td className="p-6 border-r-4 border-black font-mono font-bold">
                  {pos.size}
                </td>

                {/* 3. UNIQUE FEATURE: RISK GAUGE */}
                <td className="p-6 border-r-4 border-black">
                  <SlippageGauge size={pos.size || "0"} />
                </td>

                {/* 4. ALPHA */}
                <td className="p-6 text-center border-r-4 border-black">
                  <span className="text-5xl font-black text-[#326DD5]">{pos.socialAlpha}%</span>
                </td>

                {/* 5. INTENT TAGS */}
                <td className="p-6 text-right">
                  <div className="flex flex-col items-end gap-2">
                    {pos.whaleAlert ? (
                      <>
                        <span className="bg-[#F2674A] text-white px-3 py-1 font-black text-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase">
                          Selling_Detected
                        </span>
                        <span className="text-[8px] font-mono font-bold animate-pulse text-red-600">!! OUTFLOW_HIGH !!</span>
                      </>
                    ) : (
                      <>
                        <span className="bg-emerald-500 text-white px-3 py-1 font-black text-[10px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase">
                          Accumulating
                        </span>
                        <span className="text-[8px] font-mono font-bold text-slate-400">HOLDING_PATTERN</span>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
}