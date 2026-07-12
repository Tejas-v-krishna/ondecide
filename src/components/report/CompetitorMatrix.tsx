import { CompetitorMatrix } from "@/types";
import { Info } from "lucide-react";

export function CompetitorMatrixSection({ matrix }: { matrix: CompetitorMatrix }) {
  if (!matrix || !matrix.peers || matrix.peers.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          Peer Comps Analysis
          <div className="group relative">
            <Info className="w-4 h-4 text-zinc-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-900 text-xs text-zinc-300 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Comparing valuation (P/E) and profitability across direct competitors.
            </div>
          </div>
        </h3>
      </div>
      
      <p className="text-zinc-400 text-sm mb-4">{matrix.summary}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/60">
              <th className="py-2 text-sm font-medium text-zinc-400">Peer</th>
              <th className="py-2 text-sm font-medium text-zinc-400">P/E Ratio</th>
              <th className="py-2 text-sm font-medium text-zinc-400">P/B Ratio</th>
              <th className="py-2 text-sm font-medium text-zinc-400">EPS Growth (3Y)</th>
            </tr>
          </thead>
          <tbody>
            {matrix.peers.map((peer) => (
              <tr key={peer.ticker} className="border-b border-zinc-800/60/50">
                <td className="py-3 text-sm font-bold text-zinc-100">{peer.ticker}</td>
                <td className="py-3 text-sm text-zinc-300">
                  {peer.peTTM ? peer.peTTM.toFixed(1) + "x" : "N/A"}
                </td>
                <td className="py-3 text-sm text-zinc-300">
                  {peer.pb ? peer.pb.toFixed(1) + "x" : "N/A"}
                </td>
                <td className="py-3 text-sm text-zinc-300">
                  {peer.epsGrowth3Y ? peer.epsGrowth3Y.toFixed(1) + "%" : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
