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
    <div className="absolute top-0 left-0 w-full bg-[#326DD5] text-[#FFD200] py-2 overflow-hidden border-b-4 flex">
      <motion.div
        className="flex whitespace-nowrap gap-10 items-center font-mono text-[10px] font-black uppercase tracking-widest"
        animate={{ x: ["0%", "-50%"] }} // Only need to move halfway if content is doubled
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {/* Double the content to create the infinite loop effect */}
        {[...tickerText, ...tickerText].map((text, i) => (
          <span key={i} className="flex items-center gap-10">
            {text}
            <span className="w-2 h-2 bg-[#F2674A] rounded-none" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}