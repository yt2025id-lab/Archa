"use client";

import { useState } from "react";

interface DataPoint {
  date: string;
  apy: number;
  tvl: number;
}

// Generate mock historical data
function generateHistoricalData(days: number): DataPoint[] {
  const data: DataPoint[] = [];
  const baseApy = 8.5;
  const baseTvl = 50000;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      apy: baseApy + (Math.random() - 0.5) * 4,
      tvl: baseTvl + Math.random() * 20000 + (days - i) * 500,
    });
  }

  return data;
}

interface PoolAnalyticsChartProps {
  poolAddress?: string;
  title?: string;
}

export default function PoolAnalyticsChart({
  title = "Pool Performance",
}: PoolAnalyticsChartProps) {
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(7);
  const [metric, setMetric] = useState<"apy" | "tvl">("apy");

  const data = generateHistoricalData(timeRange);

  // Calculate chart dimensions
  const maxValue = Math.max(...data.map((d) => (metric === "apy" ? d.apy : d.tvl)));
  const minValue = Math.min(...data.map((d) => (metric === "apy" ? d.apy : d.tvl)));
  const range = maxValue - minValue;

  // Calculate averages
  const avgApy = data.reduce((sum, d) => sum + d.apy, 0) / data.length;
  const avgTvl = data.reduce((sum, d) => sum + d.tvl, 0) / data.length;
  const currentApy = data[data.length - 1].apy;
  const currentTvl = data[data.length - 1].tvl;

  // Generate SVG path
  const getPath = () => {
    const width = 100;
    const height = 100;
    const padding = 5;

    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const value = metric === "apy" ? d.apy : d.tvl;
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  // Generate area path (for gradient fill)
  const getAreaPath = () => {
    const width = 100;
    const height = 100;
    const padding = 5;

    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const value = metric === "apy" ? d.apy : d.tvl;
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });

    return `M ${padding},${height - padding} L ${points.join(" L ")} L ${100 - padding},${height - padding} Z`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>

        <div className="flex items-center gap-2">
          {/* Metric Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMetric("apy")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                metric === "apy" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              APY
            </button>
            <button
              onClick={() => setMetric("tvl")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                metric === "tvl" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              TVL
            </button>
          </div>

          {/* Time Range */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {([7, 14, 30] as const).map((days) => (
              <button
                key={days}
                onClick={() => setTimeRange(days)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  timeRange === days ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-1">
            {metric === "apy" ? "Current APY" : "Current TVL"}
          </p>
          <p className="text-2xl font-bold text-green-600">
            {metric === "apy" ? `${currentApy.toFixed(2)}%` : `$${(currentTvl / 1000).toFixed(1)}K`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Avg: {metric === "apy" ? `${avgApy.toFixed(2)}%` : `$${(avgTvl / 1000).toFixed(1)}K`}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <p className="text-sm text-gray-500 mb-1">
            {metric === "apy" ? "APY Change" : "TVL Change"}
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {metric === "apy"
              ? `${(currentApy - data[0].apy) >= 0 ? "+" : ""}${(currentApy - data[0].apy).toFixed(2)}%`
              : `${(currentTvl - data[0].tvl) >= 0 ? "+" : ""}$${((currentTvl - data[0].tvl) / 1000).toFixed(1)}K`}
          </p>
          <p className="text-xs text-gray-500 mt-1">vs {timeRange} days ago</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-48 w-full">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={metric === "apy" ? "#22c55e" : "#3b82f6"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={metric === "apy" ? "#22c55e" : "#3b82f6"} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="5"
              y1={y}
              x2="95"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Area fill */}
          <path d={getAreaPath()} fill="url(#areaGradient)" />

          {/* Line */}
          <path
            d={getPath()}
            fill="none"
            stroke={metric === "apy" ? "#22c55e" : "#3b82f6"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = 5 + (i / (data.length - 1)) * 90;
            const value = metric === "apy" ? d.apy : d.tvl;
            const y = 95 - ((value - minValue) / range) * 90;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill="white"
                stroke={metric === "apy" ? "#22c55e" : "#3b82f6"}
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
          <span>{data[0].date}</span>
          <span>{data[Math.floor(data.length / 2)].date}</span>
          <span>{data[data.length - 1].date}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${metric === "apy" ? "bg-green-500" : "bg-blue-500"}`} />
          <span className="text-gray-600">
            {metric === "apy" ? "Historical APY" : "Total Value Locked"}
          </span>
        </div>
      </div>
    </div>
  );
}
