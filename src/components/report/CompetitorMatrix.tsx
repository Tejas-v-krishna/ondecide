import { CompetitorMatrix } from "@/types";
import { Info } from "lucide-react";

export function CompetitorMatrixSection({ matrix }: { matrix: CompetitorMatrix }) {
  if (!matrix || !matrix.peers || matrix.peers.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
          Peer Comps Analysis
          <div className="group relative">
            <Info className="h-4 w-4 cursor-help text-ink-400" />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-xl border border-line bg-surface p-2 text-xs text-ink-600 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              Comparing valuation (P/E) and profitability across direct competitors.
            </div>
          </div>
        </h3>
      </div>

      <p className="mb-4 text-sm text-ink-500">{matrix.summary}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 text-sm font-medium text-ink-400">Peer</th>
              <th className="py-2 text-sm font-medium text-ink-400">P/E Ratio</th>
              <th className="py-2 text-sm font-medium text-ink-400">P/B Ratio</th>
              <th className="py-2 text-sm font-medium text-ink-400">EPS Growth (3Y)</th>
            </tr>
          </thead>
          <tbody>
            {matrix.peers.map((peer) => (
              <tr key={peer.ticker} className="border-b border-line/60">
                <td className="py-3 font-mono text-sm font-semibold text-ink">{peer.ticker}</td>
                <td className="py-3 font-mono text-sm text-ink-600">
                  {peer.peTTM ? peer.peTTM.toFixed(1) + "x" : "N/A"}
                </td>
                <td className="py-3 font-mono text-sm text-ink-600">
                  {peer.pb ? peer.pb.toFixed(1) + "x" : "N/A"}
                </td>
                <td className="py-3 font-mono text-sm text-ink-600">
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
