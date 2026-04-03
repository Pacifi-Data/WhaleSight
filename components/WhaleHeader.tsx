"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export function WhaleHeader({ address }: { address: string }) {
  return (
    <div className="flex justify-between items-end border-b-4 border-[#01033E] pb-8 bg-[#F1E4ED]/50 p-4 -mx-4">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-[#01033E]">
          WHALESIGHT 
          <span className="text-[#947BFC] not-italic font-mono text-sm ml-2 bg-[#01033E] px-2 py-1 shadow-[2px_2px_0px_0px_rgba(148,123,252,1)]">
            v1.0
          </span>
        </h1>
        <div className="flex items-center gap-4 mt-3">
          <p className="text-[#01033E]/60 text-xs font-mono uppercase tracking-[0.2em] font-bold">
            Status: <span className="text-[#326DD5] animate-pulse">● LIVE</span>
          </p>
          <p className="text-[#01033E]/40 text-xs font-mono border-l border-[#01033E]/20 pl-4">
            ID: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
      </div>
      
      <Badge 
        variant="outline" 
        className="border-2 border-black text-white bg-[#326DD5] hidden md:block px-4 py-1 rounded-none font-black italic shadow-[4px_4px_0px_0px_rgba(1,3,62,1)]"
      >
        PACIFICA MAINNET
      </Badge>
    </div>
  );
}