"use client";

export function NetworkMap() {
  return (
    <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative h-64 overflow-hidden">
      <p className="text-[10px] font-black uppercase mb-4 underline">Entity_Cluster_Map</p>
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {/* Connection Lines */}
        <line x1="100" y1="100" x2="50" y2="50" stroke="black" strokeWidth="2" strokeDasharray="4" />
        <line x1="100" y1="100" x2="150" y2="60" stroke="black" strokeWidth="2" strokeDasharray="4" />
        <line x1="100" y1="100" x2="110" y2="160" stroke="black" strokeWidth="2" strokeDasharray="4" />
        
        {/* Central Whale Node */}
        <circle cx="100" cy="100" r="12" fill="#326DD5" stroke="black" strokeWidth="3" />
        
        {/* Satellite Wallets */}
        <circle cx="50" cy="50" r="6" fill="#FFD200" stroke="black" strokeWidth="2" />
        <circle cx="150" cy="60" r="6" fill="#FFD200" stroke="black" strokeWidth="2" />
        <circle cx="110" cy="160" r="6" fill="#FFD200" stroke="black" strokeWidth="2" />
        
        {/* Labels */}
        <text x="115" y="105" fontSize="8" fontWeight="bold" fontFamily="monospace">MAIN_TARGET</text>
        <text x="30" y="40" fontSize="6" fontFamily="monospace">SUB_WALLET_01</text>
      </svg>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-400">
        82%_PROBABILITY_LINK
      </div>
    </div>
  );
}