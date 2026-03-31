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

  // Simulated live feed - in production, this would come from a WebSocket or your API
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
    <div className="border-4 border-black bg-black p-4 h-[300px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-[10px]">
      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
        <span className="text-[#FFD200] font-black uppercase">Live_Tactical_Feed</span>
        <span className="text-white/40 animate-pulse">● SIGNAL_ACTIVE</span>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-3 items-start"
            >
              <span className="text-white/30">[{log.timestamp}]</span>
              <span className={`font-black ${
                log.type === 'INFLOW' ? 'text-emerald-400' : 
                log.type === 'OUTFLOW' ? 'text-[#F2674A]' : 
                log.type === 'RISK' ? 'text-[#FFD200]' : 'text-[#326DD5]'
              }`}>
                {log.action}:
              </span>
              <span className="text-white/80 uppercase truncate">{log.details}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {logs.length === 0 && (
        <div className="text-white/20 flex items-center justify-center h-full">
          WAITING_FOR_CHAIN_DATA...
        </div>
      )}
    </div>
  );
}