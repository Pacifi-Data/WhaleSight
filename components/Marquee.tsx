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
    // Changed 'absolute' to 'fixed' and added 'z-50' to keep it on top
    <div className="fixed top-0 left-0 w-full bg-black text-[#FFD200] py-4 overflow-hidden border-b-4 border-[#326DD5] flex z-50">
      <motion.div
        className="flex whitespace-nowrap gap-10 items-center font-mono text-[10px] font-black uppercase tracking-widest"
        animate={{ x: [0, -1000] }} // Using pixel values can be more stable for Framer Motion
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {[...tickerText, ...tickerText, ...tickerText].map((text, i) => (
          <span key={i} className="flex items-center gap-10">
            {text}
            <span className="w-2 h-2 bg-[#F2674A] rounded-none" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}