"use client";

import { useState } from "react";
import { useWhaleData } from "../hooks/useWhaleData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/Marquee";
import { StatsTable } from "@/components/StatsTable";
import { AccountActivityChart } from "@/components/AccountActivityChart";
import { TacticalFeed } from "@/components/TacticalFeed"; // New Component
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A");
  const [activeAddress, setActiveAddress] = useState(searchInput);
  
  const { data, loading: isLoading } = useWhaleData(activeAddress);

  const calculatedTVL = Array.isArray(data) 
    ? data.reduce((acc, curr) => {
        const val = typeof curr.size === 'string' 
          ? parseFloat(curr.size.replace(/[^\d.-]/g, '')) 
          : (curr.size || 0);
        return acc + (isNaN(val) ? 0 : val);
      }, 0) 
    : 0;

  return (
    <main className="min-h-screen bg-[#FFFFCD] p-6 text-black font-medium selection:bg-[#326DD5] selection:text-white">
      <Marquee />

      <div className="pt-20 p-6 max-w-6xl mx-auto space-y-8">
        
        {/* 1. Header */}
        <header className="border-b-4 border-black pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-6xl font-black tracking-tighter uppercase italic">
              WHALE<span className="text-[#326DD5]">SIGHT</span>
            </h1>
            <p className="font-mono text-sm mt-2">AGENT_ID: {activeAddress.slice(0, 12)}...</p>
          </div>
          <div className="hidden md:block text-right font-mono text-[10px] leading-tight opacity-40">
            SYST_VER: 4.0.2-BETA<br />
            LOC: BKK_NODE_PRIV
          </div>
        </header>

        {/* 2. UNIQUE FEATURE: STRATEGIC SUMMARY BAR */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "STRATEGIC_INTENT", value: "ACCUMULATION", color: "text-emerald-600" },
            { label: "SIGNAL_STRENGTH", value: "88/100", color: "text-[#326DD5]" },
            { label: "MARKET_BIAS", value: "LONG_SOL", color: "text-[#FFD200]" },
            { label: "WHALE_TYPE", value: "SMART_MONEY", color: "text-black" },
          ].map((stat, i) => (
            <div key={i} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[9px] font-black uppercase opacity-40">{stat.label}</p>
              <p className={`text-xl font-black italic ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* 3. Search Bar */}
        <div className="flex gap-0 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Input 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-none bg-white text-black h-14 rounded-none focus-visible:ring-0 text-lg font-mono placeholder:text-slate-300"
            placeholder="Paste Wallet Address..."
          />
          <Button 
            onClick={() => setActiveAddress(searchInput)}
            className="bg-[#FFD200] hover:bg-[#326DD5] hover:text-white text-black h-14 rounded-none px-10 border-l-4 border-black font-black text-xl transition-all"
          >
            SCAN
          </Button>
        </div>

        {/* 4. Assets Table */}
        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
          <StatsTable data={data} loading={isLoading} />
        </div>

        {/* 5. UNIQUE FEATURE: CONTROL CENTER (Graph + Feed) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Distribution Graph */}
          <div className="lg:col-span-2 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-1">Distribution_Weight</span>
              <span className="text-[10px] font-black uppercase text-slate-400">Live_API_Feed</span>
            </div>
            <AccountActivityChart data={data} isLoading={isLoading} />
          </div>

          {/* REAL-TIME TERMINAL LOG */}
          <div className="lg:col-span-1">
             <TacticalFeed />
          </div>
        </section>

        {/* 6. Metric Sidebars (Moved to bottom grid) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-[#326DD5] text-white rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Aggregate Exposure</p>
              <h4 className="text-4xl font-black mt-2">
                ${calculatedTVL > 0 ? calculatedTVL.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
              </h4>
              <p className="text-[10px] font-mono mt-2 opacity-60">UNITS: NATIVE_ASSET_VALUE</p>
            </Card>
            
            <Card className="p-8 bg-white rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Risk Status</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-2xl font-black text-emerald-600 italic">OPTIMAL / SECURE</h4>
              </div>
            </Card>
        </section>

        <footer className="flex justify-between font-mono text-xs uppercase pt-10 border-t-2 border-black/10">
          <div className="space-y-1">
            <span className="block font-bold text-black/40 italic">BKK_NODE_PACIFICA_UPLINK</span>
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className="bg-[#F2674A] px-3 py-1 text-white font-bold italic">CONFIDENTIAL_DATA</span>
          </div>
        </footer>
      </div>
    </main>
  );
}