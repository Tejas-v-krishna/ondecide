"use client";

import { useEffect, useRef } from "react";
import type { LiveMarketData } from "@/types";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";

interface LiveMarketDataProps {
  data: LiveMarketData;
  ticker: string;
  currency: string;
}

export function LiveMarketDataSection({ data, ticker }: LiveMarketDataProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.candles.length === 0) return;

    let cleanup: (() => void) | undefined;

    import("lightweight-charts").then(({ createChart, ColorType, LineSeries }) => {
      if (!chartRef.current) return;

      const chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 260,
        layout: {
          background: { type: ColorType.Solid, color: "#111827" },
          textColor: "#94a3b8",
        },
        grid: {
          vertLines: { color: "#1e293b" },
          horzLines: { color: "#1e293b" },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: "#1e293b",
        },
        timeScale: {
          borderColor: "#1e293b",
          timeVisible: true,
        },
      });

      // lightweight-charts v5 API
      const lineSeries = chart.addSeries(LineSeries, {
        color: "#10b981",
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: "#10b981",
        crosshairMarkerBackgroundColor: "#10b981",
      });

      // lightweight-charts v5 requires UTCTimestamp (branded number)
      const chartData = data.candles
        .filter((c) => c.close > 0)
        .map((c) => ({ time: c.time as import("lightweight-charts").UTCTimestamp, value: c.close }))
        .sort((a, b) => a.time - b.time);

      lineSeries.setData(chartData);
      chart.timeScale().fitContent();

      // Responsive resize
      const resizeObserver = new ResizeObserver(() => {
        if (chartRef.current) {
          chart.applyOptions({ width: chartRef.current.clientWidth });
        }
      });
      resizeObserver.observe(chartRef.current);

      cleanup = () => {
        resizeObserver.disconnect();
        chart.remove();
      };
    });

    return () => cleanup?.();
  }, [data.candles]);

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800/60">
        <h2 className="font-serif text-lg font-semibold text-white">Live Market Data</h2>
        <p className="text-sm text-zinc-500 mt-0.5">1-year price history · {ticker}</p>
      </div>

      {/* Chart */}
      <div className="px-4 pt-4 pb-2">
        {data.candles.length > 0 ? (
          <div ref={chartRef} className="w-full rounded-lg overflow-hidden" />
        ) : (
          <div className="h-[260px] flex items-center justify-center text-zinc-500 bg-black rounded-lg">
            Price chart data unavailable
          </div>
        )}
      </div>

      {/* Key stats */}
      <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.keyStats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              {stat.glossaryTerm ? (
                <GlossaryTooltip term={stat.glossaryTerm}>{stat.label}</GlossaryTooltip>
              ) : stat.label}
            </div>
            <div className="text-base font-sans font-semibold text-white">{stat.value}</div>
            <div className="text-xs text-zinc-500 leading-relaxed">{stat.plainMeaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
