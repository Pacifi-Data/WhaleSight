"use client"; // This MUST be the first line

import { useState } from "react";
import { useWhaleData, type WhalePosition } from "./hooks/useWhaleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const walletAddress = "your-wallet-address-here"; 
  const { data, loading } = useWhaleData(walletAddress);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="animate-pulse tracking-tighter font-bold text-xl">
          INITIALIZING WHALESIGHT ENGINE...
        </div>
      </div>
    );
  }

  return (
    <main className="p-8 bg-zinc-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 tracking-tighter">
        WHALESIGHT <span className="text-zinc-500 text-sm">v1.0</span>
      </h1>

      {/* Your Table and Logic here */}
      <div className="rounded-md border border-zinc-800 bg-zinc-900/50">
        <Table>
          <TableHeader>
             <TableRow className="border-zinc-800">
               <TableHead>Asset</TableHead>
               <TableHead>Social Alpha</TableHead>
               <TableHead>Status</TableHead>
             </TableRow>
          </TableHeader>
 <TableBody>
  {data.map((pos: WhalePosition) => ( // 2. Add the type here
    <TableRow key={pos.asset} className="border-zinc-800">
      <TableCell className="font-mono">{pos.asset}</TableCell>
      <TableCell>
        <Badge variant={Number(pos.socialAlpha) > 50 ? "default" : "outline"}>
          {pos.socialAlpha}%
        </Badge>
      </TableCell>
      {/* ... rest of your row */}
    </TableRow>
  ))}
</TableBody>
        </Table>
      </div>
    </main>
  );
}