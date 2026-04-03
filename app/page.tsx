"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <PageTransition>
      <main className="min-h-screen md:h-screen w-full bg-[#F1E4ED] p-4 md:p-6 text-[#01033E] flex flex-col md:grid md:grid-rows-[auto_1fr_auto] selection:bg-[#947BFC]/20 overflow-x-hidden md:overflow-hidden gap-4 md:gap-6">
        
        {/* 1. HEADER */}
        <header className="max-w-7xl mx-auto w-full border-b-4 border-[#01033E] pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none text-[#01033E]">
              WHALE<span className="text-[#947BFC]">SIGHT</span>
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#01033E]/60 mt-1">
              Intelligent Whale Tracking // Pacifica Node v1.0
            </p>
          </div>
          <div className="font-mono text-[9px] text-white uppercase flex items-center gap-1.5 bg-[#01033E] px-3 py-1 rounded-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(148,123,252,1)]">
            <div className="h-2 w-2 rounded-full bg-[#947BFC] animate-pulse" />
            STATUS: UPLINK_READY
          </div>
        </header>

        {/* 2. HERO AREA */}
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:grid md:grid-cols-2 border-4 border-[#01033E] bg-white shadow-[12px_12px_0px_0px_rgba(1,3,62,1)] min-h-0 overflow-hidden relative">
          
          {/* MOBILE TEXT CONTENT */}
          <div className="flex md:hidden flex-col p-6 space-y-3 bg-white order-1">
            <div className="inline-block self-start bg-[#947BFC] text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">
              SYSTEM_READY
            </div>
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter italic text-[#01033E]">
              Identify <br />
              <span className="text-[#326DD5]">Movement.</span>
            </h2>
            <p className="text-xs max-w-sm leading-tight border-l-4 border-[#947BFC] pl-4 font-medium italic text-[#01033E]/70">
              Real-time intent analysis for Pacifica. Decode whale behavior through social alpha.
            </p>
          </div>

          {/* WHALE IMAGE - PURPLE THEME */}
          <div className="relative flex items-center justify-center bg-[#01033E] p-2 md:p-6 order-2 h-72 md:h-full overflow-hidden group border-b-4 md:border-b-0 border-[#01033E]">
            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full border-4 border-black bg-[#F1E4ED] overflow-hidden shadow-[8px_8px_0px_0px_rgba(148,123,252,0.3)]"
            >
              <motion.img 
                src="/WhaleSight-Landing.jpg" 
                alt="Whale Visual" 
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80"
              />
              
              {/* SCANLINE - PURPLE VERSION */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-1 bg-[#947BFC] shadow-[0_0_20px_5px_rgba(148,123,252,0.6)] z-30 pointer-events-none" 
              />

              <div className="absolute top-0 right-0 w-8 h-8 bg-[#947BFC] border-l-4 border-b-4 border-black z-40" />

              <div className="absolute bottom-0 left-0 bg-[#01033E] text-white px-2 py-1 font-mono text-[9px] uppercase tracking-tighter z-40">
                RADAR_ID: <span className="text-[#947BFC]">ALPHA_PACIFICA</span>
              </div>
            </motion.div>
          </div>

          {/* DESKTOP CONTENT */}
          <div className="hidden md:flex p-10 flex-col justify-center space-y-6 border-r-4 border-[#01033E] bg-white md:order-1">
            <div className="inline-block self-start bg-[#947BFC] text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              SYSTEM READY
            </div>
            <h2 className="text-7xl font-black uppercase leading-[0.8] tracking-tighter italic text-[#01033E]">
              Identify <br />
              <span className="text-[#326DD5]">Movement</span>
            </h2>
            <p className="text-base max-w-sm leading-tight border-l-4 border-[#947BFC] pl-4 font-medium italic py-1 text-[#01033E]/80">
              <span className="block mb-1">Real-time intent analysis for Pacifica.</span>
              <span className="block text-[#326DD5] font-black">Decode whale behavior through social alpha.</span>
            </p>
            <div className="pt-4 flex items-center gap-6">
              <Link href="/dashboard" className="inline-block text-center bg-[#947BFC] text-white border-4 border-black py-3 px-8 text-lg font-black uppercase hover:bg-[#01033E] transition-all shadow-[8px_8px_0px_0px_rgba(1,3,62,1)] active:translate-y-1 active:shadow-none">
                 Launch Application
              </Link>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-[#947BFC] text-3xl font-bold">
                &rarr;
              </motion.span>
            </div>
          </div>
        </div>

        {/* 3. FEATURE BOXES */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-2">
          {[
            { title: "TRACKING", color: "#947BFC", desc: "Monitor institutional portfolio balances." },
            { title: "INTENT", color: "#326DD5", desc: "Decode whale sentiment on-chain." },
            { title: "ALERTS", color: "#01033E", desc: "Receive classified risk assessments." },
          ].map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}>
              <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(1,3,62,1)] rounded-none h-24 md:h-28 overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform cursor-pointer">
                <CardHeader className="p-1 border-b-2 border-black" style={{ backgroundColor: feature.color }}>
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase text-center text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 md:p-3 flex items-center justify-center h-full">
                  <p className="text-[10px] md:text-[11px] leading-tight font-bold text-center uppercase text-[#01033E]">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}