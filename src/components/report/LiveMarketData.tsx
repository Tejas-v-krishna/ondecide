"use client";

import { useEffect, useRef } from "react";
import type { LiveMarketData } from "@/types";

interface LiveMarketDataProps {
  data: LiveMarketData;
  ticker: string;
  currency: string;
}

export function LiveMarketDataSection({ data, ticker }: LiveMarketDataProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || data.candles.length === 0) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    import("lightweight-charts").then(({ createChart, ColorType, LineSeries }) => {
      if (!chartRef.current || !isMounted) return;

      const chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 260,
        layout: {
          background: { type: ColorType.Solid, color: "#ffffff" },
          textColor: "#64748b",
        },
        grid: {
          vertLines: { color: "#f0efe8" },
          horzLines: { color: "#f0efe8" },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: "#e6e4dd",
        },
        timeScale: {
          borderColor: "#e6e4dd",
          timeVisible: true,
        },
      });

      // lightweight-charts v5 API
      const lineSeries = chart.addSeries(LineSeries, {
        color: "#0b8f60",
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: "#ffffff",
        crosshairMarkerBackgroundColor: "#0b8f60",
      });

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

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [data.candles]);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-4 border-b border-line pb-4">
        <h2 className="text-lg font-medium text-ink">Live Market Data</h2>
        <p className="mt-0.5 text-sm text-ink-500">1-year price history · {ticker}</p>
      </div>

      {/* Chart */}
      <div className="pt-4">
        {data.candles.length > 0 ? (
          <div ref={chartRef} className="w-full overflow-hidden rounded-xl" />
        ) : (
          <div className="flex h-[260px] items-center justify-center rounded-xl bg-surface-subtle text-ink-500">
            Price chart data unavailable
          </div>
        )}
      </div>
    </div>
  );
}
