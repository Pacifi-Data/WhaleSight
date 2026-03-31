"use client";

export function WhaleHeatmap({ data }: { data: any[] }) {
  const getIntensityColor = (score: number) => {
    if (score >= 85) return "bg-[#F2674A]"; // Red/Orange (Critical/Heavy)
    if (score >= 60) return "bg-[#326DD5]"; // Blue (Stable)
    if (score >= 40) return "bg-[#FFD200]"; // Yellow (Moderate)
    return "bg-slate-100"; // Grey (Low)
  };

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
        <h3 className="text-xl font-black italic uppercase tracking-tighter">PACIFICA_ASSET_SCAN</h3>
        <span className="bg-black text-white text-[10px] px-2 py-0.5 font-bold">LIVE_FEED</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {data?.map((item, i) => {
          const score = parseInt(item.alpha_score) || 0;
          return (
            <div key={i} className={`p-4 border-2 border-black relative overflow-hidden ${getIntensityColor(score)}`}>
              {/* Carbon fiber texture overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: `glitch-texture-url-here` }} />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-2xl font-black text-white drop-shadow-md">${item.asset}</span>
                <span className="text-[10px] font-black bg-black text-white px-1">{score}%</span>
              </div>
              <div className="relative z-10 mt-4">
                <p className="text-[8px] font-bold text-white uppercase opacity-80">INTENT: {item.strategic_intent}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between text-[8px] font-mono opacity-50 uppercase">
        <span>THERMAL_INDEX_V4.02</span>
        <span>SENSOR: PACIFICA_MAINFRAME</span>
      </div>
    </div>
  );
}