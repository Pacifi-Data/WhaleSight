"use client";

import { motion } from "framer-motion";

export function ActivityRadar() {
  return (
    /* Responsive sizing: h-20 on mobile, h-28 on desktop */
    <div className="relative h-20 w-20 md:h-28 md:w-28 border-4 border-black rounded-full overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
      {/* Radar Sweeper */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[conic-gradient(from_0deg,#326DD5_0%,transparent_25%)] opacity-30" 
      />
      
      {/* Radar Grid Lines - Adjusted margins for responsiveness */}
      <div className="absolute inset-0 border border-black/10 rounded-full m-2 md:m-3" />
      <div className="absolute inset-0 border border-black/10 rounded-full m-5 md:m-7" />
      <div className="absolute h-px w-full bg-black/10 top-1/2" />
      <div className="absolute w-px h-full bg-black/10 left-1/2" />
      
      {/* Target Signals */}
      <div className="absolute top-1/4 right-1/3 h-1.5 w-1.5 md:h-2 md:w-2 bg-red-600 rounded-full" />
      <motion.div 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/4 h-1.5 w-1.5 md:h-2 md:w-2 bg-[#326DD5] rounded-full" 
      />
      
      <span className="text-[6px] md:text-[7px] font-black uppercase z-10 bg-white/80 px-1 border border-black">
        Scanning
      </span>
    </div>
  );
}