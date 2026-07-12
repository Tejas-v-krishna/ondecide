import { InsiderSentiment } from "@/types";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function InsiderSentimentSection({ data }: { data: InsiderSentiment }) {
  if (!data || data.trend === "No Data") return null;

  return (
    <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          &quot;Smart Money&quot; Insider Tracker
          <div className="group relative">
            <Info className="w-4 h-4 text-zinc-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-900 text-xs text-zinc-300 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Tracks whether corporate executives are buying or selling their own stock.
            </div>
          </div>
        </h3>
        
        <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1
          ${data.trend === 'Buying' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : ''}
          ${data.trend === 'Selling' ? 'bg-rose-950 text-rose-400 border border-rose-900' : ''}
          ${data.trend === 'Neutral' ? 'bg-zinc-900 text-zinc-300 border border-zinc-800' : ''}
        `}>
          {data.trend === 'Buying' && <TrendingUp className="w-4 h-4" />}
          {data.trend === 'Selling' && <TrendingDown className="w-4 h-4" />}
          {data.trend === 'Neutral' && <Minus className="w-4 h-4" />}
          Net {data.trend}
        </div>
      </div>
      
      <p className="text-zinc-300 leading-relaxed text-sm">
        {data.summary}
      </p>
    </div>
  );
}
