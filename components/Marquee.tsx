"use client";

import { motion } from "framer-motion";

const tickerText = [
  "SYSTEM_ACTIVE",
  "PACIFICA_NODE_01_CONNECTED",
  "SCANNING_WHALE_INTENT",
  "SOCIAL_ALPHA_FEED_LIVE",
  "BLOCK_HEIGHT: 128,492",
  "STATUS: OPTIMAL",
];

export function Marquee() {
  return (
    // Updated to Deep Navy background with the Blue bottom border
    <div className="fixed top-0 left-0 w-full bg-[#01033E] text-[#947BFC] py-3 overflow-hidden border-b-4 border-[#326DD5] flex z-50 shadow-[0px_4px_10px_rgba(0,0,0,0.3)]">
      <motion.div
        className="flex whitespace-nowrap gap-10 items-center font-mono text-[10px] font-black uppercase tracking-widest"
        animate={{ x: [0, -1000] }} 
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {[...tickerText, ...tickerText, ...tickerText].map((text, i) => (
          <span key={i} className="flex items-center gap-10">
            {text}
            {/* Separator changed to brand Blue */}
            <span className="w-2.5 h-2.5 bg-[#326DD5] border border-black rotate-45 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}