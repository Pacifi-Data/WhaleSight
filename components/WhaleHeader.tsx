import { Badge } from "@/components/ui/badge";

export function WhaleHeader({ address }: { address: string }) {
  return (
    <div className="flex justify-between items-end border-b border-zinc-800 pb-8">
      <div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">
          WHALESIGHT <span className="text-blue-500 not-italic font-mono text-sm ml-2">v1.0</span>
        </h1>
        <p className="text-zinc-400 text-xs font-mono mt-2 uppercase tracking-[0.2em]">
          Status: <span className="text-green-500">Live</span> // {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      </div>
      <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/5 hidden md:block">
        PACIFICA TESTNET
      </Badge>
    </div>
  );
}