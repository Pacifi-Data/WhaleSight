"use client";

import { useState } from "react";
import Link from "next/link";
import { useWhaleData } from "../hooks/useWhaleData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/Marquee";
import { StatsTable } from "@/components/StatsTable";
import { AccountActivityChart } from "@/components/AccountActivityChart";
import { TacticalFeed } from "@/components/TacticalFeed";
import { ActivityRadar } from "@/components/ActivityRadar";
import { WhaleHeatmap } from "@/components/WhaleHeatmap";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const WATCHLIST = [
  { name: "SOL_LEGEND", address: "pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A" },
  { name: "JUP_WHALE", address: "H8sHT8beMw6Enp2S4AnY4v9Y3QYEnFvVwzveEphKp8p9" },
  { name: "ORCA_LP", address: "9W8uFm9vSzavch6E96jM8Y58pWzG1m5y5ZfJ" }
];

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A");
  const [activeAddress, setActiveAddress] = useState(searchInput);
  const [isScanning, setIsScanning] = useState(false);
  
  const { data, loading: isLoading } = useWhaleData(activeAddress);

  const handleScan = () => {
    setIsScanning(true);
    setActiveAddress(searchInput);
    setTimeout(() => setIsScanning(false), 800);
  };

  // TVL Calculation: Safely handles the generated 'amount' from your route
  const calculatedTVL = Array.isArray(data) 
    ? data.reduce((acc, curr) => {
        const val = typeof curr.size === 'string' 
          ? parseFloat(curr.size.replace(/[^\d.-]/g, '')) 
          : (curr.amount || 0);
        return acc + (isNaN(val) ? 0 : val);
      }, 0) 
    : 0;

  return (
    <main className={`min-h-screen bg-[#FFFFCD] p-6 text-black font-medium selection:bg-[#326DD5] selection:text-white transition-all duration-300 ${isScanning ? 'brightness-125 saturate-150' : ''}`}>
      
      {/* 0. Top Navigation (Fixed Marquee) */}
      <Marquee />

      <div className="pt-24 p-6 max-w-6xl mx-auto space-y-8 relative">
        
        {/* --- SIDEBAR LANDING BUTTON --- */}
        <div className="hidden lg:block absolute -left-35 top-26.25">
          <Link href="/">
            <button className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 font-black uppercase text-[10px] italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD200] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Landing
            </button>
          </Link>
        </div>

        {/* 1. Header & Radar */}
        <header className="border-b-4 border-black pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="lg:hidden self-start mb-4">
            <Link href="/">
              <button className="flex items-center gap-2 bg-white border-4 border-black px-3 py-1.5 font-black uppercase text-[9px] italic shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <ChevronLeft className="w-3 h-3" />
                Landing
              </button>
            </Link>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
              WHALE<span className="text-[#326DD5]">SIGHT</span>
            </h1>
            <p className="font-mono text-sm mt-2 flex items-center gap-2 justify-center md:justify-start">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              TARGET_ID: {activeAddress.slice(0, 14)}...
            </p>
          </div>
          
          <ActivityRadar />
        </header>

        {/* 2. Dynamic Intelligence Summary Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "STRATEGIC_INTENT", value: data?.[0]?.strategic_intent || "ANALYZING", color: "text-emerald-600" },
            { label: "WHALE_TYPE", value: "INSTITUTIONAL", color: "text-[#326DD5]" },
            { label: "MARKET_BIAS", value: data?.[0]?.asset === 'SOL' ? "BULLISH_SOL" : "NEUTRAL", color: "text-[#FFD200]" },
            { label: "ALPHA_SIGNAL", value: parseInt(data?.[0]?.alpha_score) > 80 ? "STRONG" : "STABLE", color: "text-black" },
          ].map((stat, i) => (
            <div key={i} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[9px] font-black uppercase opacity-40">{stat.label}</p>
              <p className={`text-xl font-black italic ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* 3. Search & Watchlist */}
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            <span className="text-[10px] font-black bg-black text-white px-2 py-1 uppercase self-center">Targets:</span>
            {WATCHLIST.map((target) => (
              <button
                key={target.address}
                onClick={() => { setSearchInput(target.address); setActiveAddress(target.address); }}
                className="border-2 border-black bg-white px-3 py-1 text-[10px] font-black hover:bg-[#FFD200] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase italic transition-all"
              >
                {target.name}
              </button>
            ))}
          </div>

          <div className="flex gap-0 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Input 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-none bg-white text-black h-14 rounded-none focus-visible:ring-0 text-lg font-mono"
              placeholder="Paste Wallet Address..."
            />
            <Button 
              onClick={handleScan}
              className="bg-[#FFD200] hover:bg-[#326DD5] hover:text-white text-black h-14 rounded-none px-10 border-l-4 border-black font-black text-xl transition-all"
            >
              SCAN
            </Button>
          </div>
        </div>

        {/* 4. PACIFICA HEATMAP (Visual Context) */}
        <WhaleHeatmap data={data || []} />

        {/* 5. Assets Table */}
        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
          <StatsTable data={data} loading={isLoading} />
        </div>

        {/* 6. Analytics Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-black text-white px-2 py-1">Distribution_Map</span>
              <span className="text-[10px] font-black text-slate-400">REAL TIME NODE</span>
            </div>
            <AccountActivityChart data={data} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-1 space-y-8">
             <TacticalFeed />
             <Card className="p-8 bg-[#326DD5] text-white rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Aggregate Value</p>
               <h4 className="text-4xl font-black mt-2">
                 ${calculatedTVL > 0 ? calculatedTVL.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
               </h4>
               <p className="text-[10px] font-mono mt-2 opacity-60 italic">STAGED FOR EXTRACTION</p>
             </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-between font-mono text-xs uppercase pt-10 border-t-2 border-black/10">
          <span className="font-bold text-black/30 italic">BKK NODE 01 PACIFICA</span>
          <span className="bg-[#F2674A] px-3 py-1 text-white font-bold italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">CLASSIFIED</span>
        </footer>
      </div>
    </main>
  );
}