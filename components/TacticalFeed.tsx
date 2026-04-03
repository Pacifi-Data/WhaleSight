"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  type: 'INFLOW' | 'OUTFLOW' | 'SWAP' | 'RISK';
}

export function TacticalFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const actions = [
      { action: "SWAP", details: "2,500 SOL -> USDC (RAYDIUM)", type: "SWAP" },
      { action: "OUTFLOW", details: "50,000 USDC -> BINANCE_HOT_WALLET", type: "OUTFLOW" },
      { action: "INFLOW", details: "1.2M BONK FROM UNKNOWN_WHALE", type: "INFLOW" },
      { action: "RISK_ALERT", details: "HIGH_SLIPPAGE_DETECTED_ON_JUPITER", type: "RISK" },
    ];

    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        action: randomAction.action,
        details: randomAction.details,
        type: randomAction.type as any
      };
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-4 border-black bg-[#01033E] p-4 h-[300px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] font-mono text-[10px]">
      {/* HEADER - NEW PALETTE */}
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
        <span className="text-[#947BFC] font-black uppercase tracking-widest">Live_Tactical_Feed</span>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-[#947BFC] rounded-full animate-pulse" />
           <span className="text-white/40 text-[8px]">SIGNAL_ACTIVE</span>
        </div>
      </div>
      
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-3 items-center border-l-2 border-transparent hover:border-[#326DD5] pl-2 transition-colors"
            >
              <span className="text-white/20 font-bold shrink-0">[{log.timestamp}]</span>
              
              {/* ACTION TAGS MATCHING PALETTE */}
              <span className={`font-black italic px-1 shrink-0 ${
                log.type === 'INFLOW' ? 'text-emerald-400' : 
                log.type === 'OUTFLOW' ? 'text-[#947BFC]' : 
                log.type === 'RISK' ? 'text-[#326DD5]' : 'text-white'
              }`}>
                {log.action}:
              </span>
              
              <span className="text-white/70 uppercase truncate tracking-tighter">
                {log.details}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {logs.length === 0 && (
        <div className="text-white/10 flex flex-col items-center justify-center h-full gap-2 italic">
          <div className="w-4 h-4 border-2 border-white/10 border-t-[#947BFC] rounded-full animate-spin" />
          WAITING_FOR_CHAIN_DATA...
        </div>
      )}
    </div>
  );
}