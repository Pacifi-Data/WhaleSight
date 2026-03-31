"use client";

import { motion } from "framer-motion";

export function ActivityRadar() {
  return (
    <div className="relative h-28 w-28 border-4 border-black rounded-full overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center scale-110">
      {/* Radar Sweeper */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[conic-gradient(from_0deg,#326DD5_0%,transparent_25%)] opacity-30" 
      />
      
      {/* Radar Grid Lines */}
      <div className="absolute inset-0 border border-black/10 rounded-full m-3" />
      <div className="absolute inset-0 border border-black/10 rounded-full m-7" />
      <div className="absolute h-[1px] w-full bg-black/10 top-1/2" />
      <div className="absolute w-[1px] h-full bg-black/10 left-1/2" />
      
      {/* Target Signals */}
      <div className="absolute top-1/4 right-1/3 h-2 w-2 bg-red-600 rounded-full" />
      <motion.div 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/4 h-2 w-2 bg-[#326DD5] rounded-full" 
      />
      
      <span className="text-[7px] font-black uppercase z-10 bg-white/80 px-1 border border-black">Scanning</span>
    </div>
  );
}