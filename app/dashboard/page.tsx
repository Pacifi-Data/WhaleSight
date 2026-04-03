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
  { name: "SOL LEGEND", address: "pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A" },
  { name: "JUP WHALE", address: "H8sHT8beMw6Enp2S4AnY4v9Y3QYEnFvVwzveEphKp8p9" },
  { name: "ORCA LP", address: "9W8uFm9vSzavch6E96jM8Y58pWzG1m5y5ZfJ" }
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

  const calculatedTVL = Array.isArray(data) 
    ? data.reduce((acc, curr) => {
        const val = typeof curr.size === 'string' 
          ? parseFloat(curr.size.replace(/[^\d.-]/g, '')) 
          : (curr.amount || 0);
        return acc + (isNaN(val) ? 0 : val);
      }, 0) 
    : 0;

  return (
    // UPDATED BACKGROUND TO CREAM WHITE (#F5F5F0)
    <main className={`min-h-screen bg-[#F5F5F0] p-4 sm:p-6 text-[#01033E] font-medium selection:bg-[#947BFC]/30 selection:text-[#01033E] transition-all duration-300 ${isScanning ? 'brightness-110 saturate-150' : ''}`}>
      
      <Marquee />

      <div className="pt-20 sm:pt-24 max-w-6xl mx-auto space-y-6 sm:space-y-8 relative">
        
        {/* NAVIGATION */}
        <div className="hidden lg:block absolute -left-32 top-26.25">
          <Link href="/">
            <button className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 font-black uppercase text-[10px] italic shadow-[4px_4px_0px_0px_rgba(1,3,62,1)] hover:bg-[#947BFC] hover:text-white hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Landing
            </button>
          </Link>
        </div>

        <header className="border-b-4 border-[#01033E] pb-6">
          <div className="grid grid-cols-3 items-center w-full">
            <div className="flex justify-start">
              <Link href="/" className="lg:hidden">
                <button className="flex items-center gap-2 bg-white border-4 border-black px-3 py-1.5 font-black uppercase text-[9px] italic shadow-[3px_3px_0px_0px_rgba(1,3,62,1)] hover:bg-[#947BFC] hover:text-white transition-all shrink-0">
                  <ChevronLeft className="w-3 h-3" />
                  <span className="hidden xs:inline">Landing</span>
                </button>
              </Link>
            </div>

            <div className="flex justify-center items-center">
              <h1 className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-none whitespace-nowrap text-[#01033E]">
                WHALE<span className="text-[#947BFC]">SIGHT</span>
              </h1>
            </div>

            <div className="flex justify-end">
              <div className="scale-90 sm:scale-100 md:scale-110 origin-right">
                <ActivityRadar />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 bg-[#01033E]/5 px-4 py-1.5 border-2 border-[#01033E] shadow-[4px_4px_0px_0px_rgba(1,3,62,1)] md:shadow-none md:border-none md:bg-transparent">
              <span className="h-2 w-2 rounded-full bg-[#947BFC] animate-ping shrink-0" />
              <p className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-tight text-[#01033E]">
                <span className="opacity-40">TARGET ID:</span> {activeAddress.slice(0, 18)}...
              </p>
            </div>
          </div>
        </header>

        {/* METRICS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "STRATEGIC INTENT", value: (data?.[0]?.strategic_intent || "ANALYZING").replace('_', ' '), color: "text-[#326DD5]" },
            { label: "WHALE TYPE", value: "INSTITUTIONAL", color: "text-[#01033E]" },
            { label: "MARKET BIAS", value: data?.[0]?.asset === 'SOL' ? "BULLISH SOL" : "NEUTRAL", color: "text-[#947BFC]" },
            { label: "ALPHA SIGNAL", value: parseInt(data?.[0]?.alpha_score) > 80 ? "STRONG" : "STABLE", color: "text-[#01033E]" },
          ].map((stat, i) => (
            <div key={i} className="border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(1,3,62,1)] flex flex-col justify-center items-center text-center">
              <p className="text-[10px] font-black uppercase opacity-40 mb-1 text-[#01033E]">{stat.label}</p>
              <p className={`text-2xl font-black italic tracking-tight ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* SEARCH & TARGETS */}
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            <span className="text-[10px] font-black bg-[#01033E] text-white px-3 py-1.5 uppercase self-center sticky left-0 shadow-[2px_2px_0px_0px_rgba(148,123,252,1)]">Targets:</span>
            {WATCHLIST.map((target) => (
              <button
                key={target.address}
                onClick={() => { setSearchInput(target.address); setActiveAddress(target.address); }}
                className="whitespace-nowrap border-2 border-black bg-white px-3 py-1.5 text-[10px] font-black hover:bg-[#947BFC] hover:text-white shadow-[4px_4px_0px_0px_rgba(1,3,62,1)] uppercase italic transition-all shrink-0"
              >
                {target.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-0 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(1,3,62,1)]">
            <Input 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border-none bg-white text-[#01033E] h-12 sm:h-14 rounded-none focus-visible:ring-0 text-base sm:text-lg font-mono w-full"
              placeholder="Paste Wallet Address..."
            />
            <Button 
              onClick={handleScan}
              className="bg-[#947BFC] hover:bg-[#01033E] text-white h-12 sm:h-14 rounded-none px-6 sm:px-10 border-t-4 sm:border-t-0 sm:border-l-4 border-black font-black text-lg sm:text-xl transition-all"
            >
              SCAN
            </Button>
          </div>
        </div>

        {/* VISUALIZATION DATA */}
        <div className="w-full overflow-hidden">
            <WhaleHeatmap data={data || []} />
        </div>

        <div className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(1,3,62,1)] bg-white overflow-x-auto">
          <StatsTable data={data} loading={isLoading} />
        </div>

        {/* FOOTER GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 border-4 border-black bg-white p-4 sm:p-6 shadow-[12px_12px_0px_0px_rgba(1,3,62,1)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-[#01033E] text-white px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(148,123,252,1)]">Distribution Map</span>
              <span className="text-[8px] sm:text-[10px] font-black text-[#01033E]/30">REAL TIME NODE // PACIFICA_SECURE</span>
            </div>
            <div className="w-full overflow-hidden">
                <AccountActivityChart data={data} isLoading={isLoading} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
             <TacticalFeed />
             <Card className="p-6 sm:p-8 bg-[#326DD5] text-white rounded-none border-4 border-black shadow-[12px_12px_0px_0px_rgba(1,3,62,1)]">
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Aggregate Value</p>
               <h4 className="text-3xl sm:text-4xl font-black mt-2">
                 ${calculatedTVL > 0 ? calculatedTVL.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
               </h4>
               <div className="h-1 w-full bg-white/20 mt-4 mb-2" />
               <p className="text-[10px] font-mono opacity-60 italic uppercase tracking-tighter">Verified on Pacifica Testnet</p>
             </Card>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 border-t-4 border-[#01033E] font-mono text-[10px] uppercase pb-10">
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-black text-xs italic bg-[#01033E] text-[#947BFC] px-3 py-1 mb-1 shadow-[2px_2px_0px_0px_rgba(148,123,252,1)]">PACIFICA HACK_01</span>
            <span className="font-bold text-[#01033E]/50">DESIGNED BY SANPAPHAT PORNTONGPRASERT // BKK NODE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold opacity-40 text-[#01033E]">TERMINAL_SECURE</span>
            <button className="bg-[#326DD5] text-white font-black italic px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(1,3,62,1)] hover:bg-[#947BFC] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              REPORT ANOMALY
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}