"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <PageTransition>
      <main className="min-h-screen md:h-screen w-full bg-[#FFFFCD] p-4 md:p-6 text-black flex flex-col md:grid md:grid-rows-[auto_1fr_auto] selection:bg-[#326DD5]/20 overflow-x-hidden md:overflow-hidden gap-4 md:gap-6">
        
        {/* 1. HEADER */}
        <header className="max-w-7xl mx-auto w-full border-b-4 border-black pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              WHALE<span className="text-[#326DD5]">SIGHT</span>
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mt-1">
              Intelligent Whale Tracking // Modular Node v1.0
            </p>
          </div>
          <div className="font-mono text-[9px] text-zinc-500 uppercase flex items-center gap-1.5 bg-black/5 px-2 py-0.5 rounded border border-black/10">
            <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            STATUS: UPLINK_READY
          </div>
        </header>

        {/* 2. HERO AREA */}
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:grid md:grid-cols-2 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] min-h-0 overflow-hidden relative">
          
          {/* MOBILE TEXT CONTENT */}
          <div className="flex md:hidden flex-col p-6 space-y-3 bg-white order-1">
            <div className="inline-block self-start bg-[#FFD200] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">
              SYSTEM_READY
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter italic">
              Identify <br />
              <span className="text-[#326DD5]">Movement.</span>
            </h2>
            <p className="text-xs max-w-sm leading-tight border-l-4 border-[#FFD200] pl-4 font-medium italic">
              Real-time intent analysis for Pacifica. Decode whale behavior through social alpha.
            </p>
          </div>

          {/* WHALE IMAGE - RADAR ENABLED */}
          <div className="relative flex items-center justify-center bg-[#326DD5] p-2 md:p-6 order-2 h-72 md:h-full overflow-hidden group border-b-4 md:border-b-0 border-black">
            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full border-4 border-black bg-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <motion.img 
                src="/WhaleSight-Landing.jpg" 
                alt="Whale Visual" 
                initial={{ scale: 1.1 }} // Slight zoom out effect
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* RADAR RED SCANLINE */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[3px] bg-red-600 shadow-[0_0_20px_5px_rgba(220,38,38,0.8)] z-30 pointer-events-none" 
              />

              {/* Bauhaus Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#F2674A] border-l-4 border-b-4 border-black z-40" />

              {/* Static UI Text Overlay */}
              <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 font-mono text-[9px] uppercase tracking-tighter z-40">
                RADAR_ID: <span className="text-[#FFD200]">ALPHA_WHALE_01</span>
              </div>
              
              {/* Screen Grain Texture */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 z-20" />
            </motion.div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex md:hidden p-6 bg-white order-3">
            <Link href="/dashboard" className="w-full text-center bg-[#FFD200] border-4 border-black py-4 text-xl font-black uppercase hover:bg-[#326DD5] hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
              Launch Application
            </Link>
          </div>

          {/* DESKTOP CONTENT */}
          <div className="hidden md:flex p-10 flex-col justify-center space-y-6 border-r-4 border-black bg-white md:order-1">
            <div className="inline-block self-start bg-[#FFD200] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">
              SYSTEM READY
            </div>
            <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter italic">
              Identify <br />
              <span className="text-[#326DD5]">Movement</span>
            </h2>
<p className="text-base max-w-sm leading-tight border-l-4 border-[#FFD200] pl-4 font-medium italic py-1">
  <span className="block mb-1">Real-time intent analysis for Pacifica.</span>
  <span className="block text-[#326DD5] font-black">Decode whale behavior through social alpha.</span>
</p>
            <div className="pt-4 flex items-center gap-6">
              <Link href="/dashboard" className="inline-block text-center bg-[#FFD200] border-4 border-black py-3 px-8 text-lg font-black uppercase hover:bg-[#326DD5] hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none">
                 Launch Application
              </Link>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-[#FFD200] text-3xl font-bold">
                &rarr;
              </motion.span>
            </div>
          </div>
        </div>

        {/* 3. FEATURE BOXES */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-2">
          {[
            { title: "TRACKING", color: "#FFD200", desc: "Monitor testnet portfolio balances." },
            { title: "INTENT", color: "#326DD5", desc: "Decode whale sentiment on-chain." },
            { title: "ALERTS", color: "#F2674A", desc: "Receive classified risk assessments." },
          ].map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}>
              <Card className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none h-24 md:h-28 overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform cursor-pointer">
                <CardHeader className="p-1 border-b-2 border-black" style={{ backgroundColor: feature.color }}>
                  <CardTitle className={`text-[10px] md:text-xs font-black uppercase text-center ${feature.color === "#326DD5" ? 'text-white' : 'text-black'}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 md:p-3 flex items-center justify-center h-full">
                  <p className="text-[10px] md:text-[11px] leading-tight font-bold text-center uppercase">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}