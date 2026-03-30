// app/page.tsx
"use client";

import Link from "next/link";
import { WhaleHeader } from "@/components/WhaleHeader"; // Reuse your header
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/PageTransition";

export default function LandingPage() {
  return (
    <PageTransition>
    <main className="min-h-screen bg-[#FFFFCD] p-6 text-black selection:bg-[#326DD5]/20 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Reuse your existing branding header! */}
        <div className="border-b-4 border-black pb-6">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">
            WHALE<span className="text-[#326DD5]">SIGHT</span>
          </h1>
          <p className="font-mono text-sm mt-2 uppercase tracking-widest text-zinc-600">
            Intelligent Whale Tracking // Modular Node v1.0
          </p>
        </div>

        {/* Hero Section: The "Bauhaus Waterfall" */}
        <div className="grid md:grid-cols-2 gap-0 border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
  
  {/* Text Side - Responsive Padding */}
  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 border-b-4 md:border-b-0 md:border-r-4 border-black">
    <div className="inline-block self-start bg-[#FFD200] border-2 border-black px-3 py-1 text-[10px] font-black uppercase">
      SYSTEM_READY
    </div>
    <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter italic">
      Identify <br />
      <span className="text-[#326DD5]">Movement.</span>
    </h2>
    <p className="text-lg md:text-xl max-w-sm leading-tight border-l-4 border-[#FFD200] pl-4 font-medium">
      Real-time intent analysis for Pacifica. Decode whale behavior through social alpha.
    </p>
    
    <Link href="/dashboard" className="inline-block text-center bg-[#FFD200] border-4 border-black py-4 px-8 text-xl font-black uppercase hover:bg-[#326DD5] hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
      Launch Application
    </Link>
  </div>

  {/* Image Side - Responsive & Scaled */}
  <div className="relative aspect-square md:aspect-auto flex items-center justify-center bg-[#326DD5] p-4">
    {/* The Frame */}
    <div className="relative w-full h-full border-4 border-black bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
      <img 
        src="/WhaleSight-Landing.jpg" 
        alt="Whale Breach" 
        className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
      />
      
      {/* Bauhaus Decorative Elements */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#F2674A] border-l-4 border-b-4 border-black hidden sm:block" />
      <div className="absolute bottom-0 left-0 bg-black text-white px-3 py-1 font-mono text-[10px] uppercase">
        Asset_Preview_01
      </div>
    </div>
  </div>
</div>

        {/* Modular Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "POSITION_TRACKING", color: "#FFD200", desc: "Monitor testnet portfolio balances." },
            { title: "INTENT_ANALYSIS", color: "#326DD5", desc: "Decode whale sentiment on-chain." },
            { title: "CONFIDENTIAL_REPORT", color: "#F2674A", desc: "Receive classified risk assessment alerts." },
          ].map((feature) => (
            <Card key={feature.title} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b-4 border-black" style={{ backgroundColor: feature.color }}>
                <CardTitle className={`text-xl font-black uppercase text-center ${feature.color === "#326DD5" ? 'text-white' : 'text-black'}`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 font-medium">
                <p>{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="text-center font-mono text-[10px] text-zinc-500 uppercase pt-20">
          Secure Node Connection // Location: {process.env.NEXT_PUBLIC_NODE_LOC || "BANGKOK"}
        </footer>
      </div>
    </main>
    </PageTransition>
  );
}