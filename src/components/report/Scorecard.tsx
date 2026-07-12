"use client";

import type { Scorecard } from "@/types";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ScorecardProps {
  data: Scorecard;
}

const SCORE_COLOR = (score: number) => {
  if (score >= 7) return "#10b981";
  if (score >= 5) return "#f59e0b";
  return "#f43f5e";
};

export function ScorecardSection({ data }: ScorecardProps) {
  const radarData = data.axes.map((axis) => ({
    subject: axis.label,
    score: axis.score,
    fullMark: 10,
  }));

  const overallColor = SCORE_COLOR(data.overallScore);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-lg font-semibold text-white">Stock Scorecard</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Computed from Finnhub fundamental data</p>
        </div>
        {/* Overall score badge */}
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold border-2"
            style={{ color: overallColor, borderColor: overallColor + "40" }}
          >
            {data.overallScore}
          </div>
          <div className="text-xs text-zinc-500 mt-1">/ 10</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: 8 }}
                labelStyle={{ color: "#f1f5f9" }}
                itemStyle={{ color: "#10b981" }}
                formatter={(value) => [`${value ?? 0}/10`, "Score"]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Axis breakdown */}
        <div className="space-y-3">
          {data.axes.map((axis) => {
            const color = SCORE_COLOR(axis.score);
            return (
              <div key={axis.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${axis.isWarning ? "text-zinc-400" : "text-zinc-100"}`}>
                    {axis.isWarning && <span className="mr-1">⚠</span>}
                    {axis.label}
                  </span>
                  <span className="text-sm font-sans font-bold" style={{ color }}>
                    {axis.score}/10
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${axis.score * 10}%`, backgroundColor: color }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-1">{axis.verdict}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
