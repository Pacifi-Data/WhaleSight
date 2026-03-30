import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhalePosition } from "@/app/hooks/useWhaleData";

export function StatsTable({ data, loading }: { data: any[], loading: boolean }) {
  return (
    <div className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(50,109,213,1)]">
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
          {data.map((pos, i) => (
            <tr key={i} className="border-b-4 border-black last:border-b-0">
              <td className="p-6 text-3xl font-black italic border-r-4 border-black">
                {pos.asset}
              </td>
              <td className="p-6 text-center border-r-4 border-black">
                <span className="text-4xl font-mono font-black">{pos.socialAlpha}%</span>
              </td>
              <td className="p-6 text-right">
                {pos.whaleAlert ? (
                  <span className="bg-[#F2674A] text-white px-4 py-2 font-black text-sm uppercase animate-pulse inline-block border-2 border-black">
                    Danger
                  </span>
                ) : (
                  <span className="border-2 border-black px-4 py-2 font-black text-sm uppercase">
                    Stable
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}