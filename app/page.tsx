"use client";

import { useWhaleData } from "./hooks/useWhaleData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const walletAddress = "pDbTNSJMQ7MMwZvFtWJLiUz9fMY6tMU7CPv8CkPQ39A";
  const { data, loading } = useWhaleData(walletAddress);

  return (
    // Changed bg-black to bg-zinc-950 and added a subtle gradient
    <main className="min-h-screen bg-[#09090b] p-4 md:p-12 font-sans text-zinc-100 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">
              WHALESIGHT <span className="text-blue-500 not-italic font-mono text-sm ml-2">v1.0</span>
            </h1>
            <p className="text-zinc-400 text-xs font-mono mt-2 uppercase tracking-[0.2em]">
              Status: <span className="text-green-500">Connected</span> // Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
          <div className="hidden md:block">
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/5">
              PACIFICA TESTNET NODE
            </Badge>
          </div>
        </div>

        {/* Main Data Container */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm shadow-2xl overflow-hidden">
          <CardHeader className="bg-zinc-900/80 border-b border-zinc-800 py-4">
            <CardTitle className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Live Market Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-zinc-950">
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-500 text-[10px] font-mono uppercase py-4">Asset Pair</TableHead>
                  <TableHead className="text-zinc-500 text-[10px] font-mono uppercase text-center">Social Sentiment</TableHead>
                  <TableHead className="text-zinc-500 text-[10px] font-mono uppercase text-right">Risk Assessment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((pos, index) => (
                    <TableRow key={pos.id || index} className="border-zinc-800/50 hover:bg-white/[0.02] transition-all group">
                      <TableCell className="py-8">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                            {pos.asset}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase">Perpetual Contract</span>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <div className="inline-flex flex-col items-center gap-2">
                          <span className="text-3xl font-mono font-bold tracking-tighter text-white">
                            {pos.socialAlpha}%
                          </span>
                          <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                            <div 
                              className={`h-full transition-all duration-1000 ${Number(pos.socialAlpha) > 60 ? 'bg-blue-500' : 'bg-zinc-500'}`} 
                              style={{ width: `${pos.socialAlpha}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        {pos.whaleAlert ? (
                          <div className="flex flex-col items-end gap-1">
                            <Badge className="bg-red-600 text-white hover:bg-red-600 animate-bounce rounded-sm font-bold text-[10px]">
                              🚨 HIGH VOLATILITY
                            </Badge>
                            <span className="text-[10px] text-red-500 font-mono">Whale Exit Detected</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="border-zinc-700 text-zinc-500 rounded-sm font-mono text-[10px]">
                            NEUTRAL
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-32">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-zinc-500 font-mono text-sm animate-pulse">SYNCHRONIZING WITH PACIFICA...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer / System Status */}
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>System Latency: 24ms</span>
          <span>Engine: Elfa-Pacifica-Hybrid</span>
        </div>
      </div>
    </main>
  );
}