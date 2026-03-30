import { WhalePosition } from "@/app/hooks/useWhaleData";
import { motion, AnimatePresence } from "framer-motion"; // Add AnimatePresence for smoother entries

export function StatsTable({ data, loading }: { data: any[], loading: boolean }) {
  return (
    <motion.div 
      // 1. Initial entry for the whole table
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(50,109,213,1)]"
    >
      <div className="bg-[#326DD5] border-b-4 border-black p-3">
        <h2 className="text-white font-black uppercase tracking-widest">Live Inventory</h2>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-4 border-black bg-[#FFD200]">
            <th className="p-4 uppercase font-black border-r-4 border-black">Asset</th>
            <th className="p-4 uppercase font-black border-r-4 border-black text-center">Alpha</th>
            <th className="p-4 uppercase font-black text-right">Risk Status</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((pos, i) => (
              // 2. Wrap each row in a motion.tr for a "staggered" load effect
              <motion.tr 
                key={pos.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1 }} // Staggered delay: row 1, then 2, then 3
                className="border-b-4 border-black last:border-b-0 hover:bg-zinc-50 transition-colors"
              >
                <td className="p-6 text-3xl font-black italic border-r-4 border-black text-black">
                  {pos.asset}
                </td>
                <td className="p-6 text-center border-r-4 border-black">
                  <span className="text-4xl font-mono font-black text-black">{pos.socialAlpha}%</span>
                </td>
                <td className="p-6 text-right">
                  {pos.whaleAlert ? (
                    // 3. Replace 'animate-pulse' with Framer Motion for better control
                    <motion.span 
                      animate={{ opacity: [1, 0.5, 1], scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="bg-[#F2674A] text-white px-4 py-2 font-black text-sm uppercase inline-block border-2 border-black"
                    >
                      Danger
                    </motion.span>
                  ) : (
                    <span className="border-2 border-black px-4 py-2 font-black text-sm uppercase text-black">
                      Stable
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
}