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
  if (score >= 7) return "#0b8f60";
  if (score >= 5) return "#b45309";
  return "#d92d20";
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-ink">Stock Scorecard</h2>
          <p className="mt-0.5 text-sm text-ink-500">Computed from Finnhub fundamental data</p>
        </div>
        {/* Overall score badge */}
        <div className="text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 font-mono text-2xl font-semibold"
            style={{ color: overallColor, borderColor: overallColor + "40" }}
          >
            {data.overallScore}
          </div>
          <div className="mt-1 text-xs text-ink-400">/ 10</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Radar chart */}
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e6e4dd" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#0b8f60"
                fill="#0b8f60"
                fillOpacity={0.14}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e6e4dd",
                  borderRadius: 12,
                  boxShadow: "0 8px 24px rgba(14,21,36,0.08)",
                }}
                labelStyle={{ color: "#0e1524" }}
                itemStyle={{ color: "#0b8f60" }}
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
                <div className="mb-1 flex items-center justify-between">
                  <span className={`text-sm font-medium ${axis.isWarning ? "text-hold" : "text-ink-600"}`}>
                    {axis.isWarning && <span className="mr-1">⚠</span>}
                    {axis.label}
                  </span>
                  <span className="font-mono text-sm font-semibold" style={{ color }}>
                    {axis.score}/10
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${axis.score * 10}%`, backgroundColor: color }}
                  />
                </div>
                <p className="mt-1 text-xs text-ink-500">{axis.verdict}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
