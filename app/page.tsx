"use client";

import { useState } from "react";
import { useWhaleData } from "./hooks/useWhaleData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WhaleHeader } from "@/components/WhaleHeader";
import { StatsTable } from "@/components/StatsTable";

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A");
  const [activeAddress, setActiveAddress] = useState(searchInput);
  const { data, loading } = useWhaleData(activeAddress);

  return (
    <main className="min-h-screen bg-[#FFFFCD] p-6 text-black font-medium">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header with Blue Accent */}
        <header className="border-b-4 border-black pb-6">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">
            WHALE<span className="text-[#326DD5]">SIGHT</span>
          </h1>
          <p className="font-mono text-sm mt-2">AGENT_ID: {activeAddress.slice(0,12)}...</p>
        </header>

        {/* Search Bar - Yellow & Black */}
        <div className="flex gap-0 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Input 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-none bg-white text-black h-14 rounded-none focus-visible:ring-0 text-lg font-mono"
          />
          <Button 
            onClick={() => setActiveAddress(searchInput)}
            className="bg-[#FFD200] hover:bg-[#326DD5] text-black h-14 rounded-none px-10 border-l-4 border-black font-black text-xl transition-colors"
          >
            SCAN
          </Button>
        </div>

        {/* The Table Component */}
        <StatsTable data={data} loading={loading} />

        <footer className="flex justify-between font-mono text-xs uppercase pt-10">
          <span>Local System: BKK_NODE_01</span>
          <span className="bg-[#F2674A] px-2 py-1 text-white font-bold">Confidential</span>
        </footer>
      </div>
    </main>
  );
}