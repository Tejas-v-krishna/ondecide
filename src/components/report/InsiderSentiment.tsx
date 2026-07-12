import { InsiderSentiment } from "@/types";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function InsiderSentimentSection({ data }: { data: InsiderSentiment }) {
  if (!data || data.trend === "No Data") {
    return (
      <div className="flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 opacity-50">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            &quot;Smart Money&quot; Insider Tracker
          </h3>
        </div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-emerald-400 text-sm font-medium">
            Coming Soon
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
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
          ${data.trend === 'Buying' ? 'bg-zinc-900/50 text-emerald-400 border border-zinc-800' : ''}
          ${data.trend === 'Selling' ? 'bg-zinc-900/50 text-zinc-400 border border-zinc-800' : ''}
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
