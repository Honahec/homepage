"use client";

import { useState } from "react";

interface ActivityChartProps {
  events: Array<{ created_at: string; type: string }>;
}

export default function ActivityChart({ events }: ActivityChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // 生成过去 30 天的数据
  const generateChartData = () => {
    const days = 30;
    const now = new Date();
    // 使用本地时区的今天日期
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const data: { date: string; count: number; label: string }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // 使用本地时区格式化日期字符串，避免UTC转换问题
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const label = date.getDate().toString();

      // 统计这一天的事件数
      const count = events.filter((event) => {
        const eventDate = new Date(event.created_at);
        const eventYear = eventDate.getFullYear();
        const eventMonth = String(eventDate.getMonth() + 1).padStart(2, '0');
        const eventDay = String(eventDate.getDate()).padStart(2, '0');
        const eventDateStr = `${eventYear}-${eventMonth}-${eventDay}`;
        return eventDateStr === dateStr;
      }).length;

      data.push({ date: dateStr, count, label });
    }

    return data;
  };

  const data = generateChartData();
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  const avgCount = (totalCount / data.length).toFixed(1);
  const activeDays = data.filter((d) => d.count > 0).length;

  // SVG 尺寸
  const width = 800;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // 生成路径
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.count / maxCount) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");

  // 填充区域路径
  const areaPath = `
    M ${padding.left},${padding.top + chartHeight}
    L ${points[0].x},${points[0].y}
    ${points
      .slice(1)
      .map((p) => `L ${p.x},${p.y}`)
      .join(" ")}
    L ${points[points.length - 1].x},${padding.top + chartHeight}
    Z
  `;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          活跃度趋势
        </h2>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <StatCard
            label="近30天活动"
            value={totalCount}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            label="活跃天数"
            value={activeDays}
            suffix=" 天"
            color="from-orange-500 to-red-500"
          />
          <StatCard
            label="日均活动"
            value={avgCount}
            color="from-pink-500 to-purple-500"
          />
          <StatCard
            label="最高单日"
            value={maxCount}
            color="from-blue-500 to-purple-500"
          />
        </div>

        {/* 曲线图 */}
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
          <h3 className="text-lg font-semibold text-gray-300 mb-6">
            近 30 天活动趋势
          </h3>

          <div className="relative overflow-x-auto">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto"
              style={{ minWidth: "600px" }}
            >
              {/* 网格线 */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = padding.top + chartHeight * (1 - ratio);
                return (
                  <g key={i}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                    <text
                      x={padding.left - 10}
                      y={y + 4}
                      textAnchor="end"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="12"
                    >
                      {Math.round(maxCount * ratio)}
                    </text>
                  </g>
                );
              })}

              {/* 填充渐变 */}
              <defs>
                <linearGradient
                  id="areaGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(168, 85, 247)"
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(236, 72, 153)"
                    stopOpacity="0.1"
                  />
                </linearGradient>
              </defs>

              {/* 填充区域 */}
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* 曲线 */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                  <stop offset="50%" stopColor="rgb(236, 72, 153)" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" />
                </linearGradient>
              </defs>

              {/* 数据点 */}
              {points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={point.count > 0 ? 4 : 2}
                  fill={
                    point.count > 0
                      ? "rgb(236, 72, 153)"
                      : "rgba(255,255,255,0.3)"
                  }
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      date: point.date,
                      count: point.count,
                      x: point.x,
                      y: point.y,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}

              {/* X轴标签 (每5天显示一次) */}
              {data.map((d, i) => {
                if (i % 5 === 0 || i === data.length - 1) {
                  const x = padding.left + (i / (data.length - 1)) * chartWidth;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={height - 10}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="12"
                    >
                      {d.label}
                    </text>
                  );
                }
                return null;
              })}

              {/* 悬浮提示 */}
              {hoveredPoint && (
                <g>
                  <rect
                    x={hoveredPoint.x - 50}
                    y={hoveredPoint.y - 50}
                    width="100"
                    height="40"
                    fill="rgba(17, 24, 39, 0.95)"
                    stroke="rgb(236, 72, 153)"
                    strokeWidth="1"
                    rx="6"
                  />
                  <text
                    x={hoveredPoint.x}
                    y={hoveredPoint.y - 32}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {hoveredPoint.count} 次活动
                  </text>
                  <text
                    x={hoveredPoint.x}
                    y={hoveredPoint.y - 16}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="11"
                  >
                    {new Date(hoveredPoint.date).toLocaleDateString("zh-CN", {
                      month: "long",
                      day: "numeric",
                    })}
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            数据基于最近 {events.length} 个 GitHub 活动事件
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  suffix = "",
  color,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-pink-500/50 transition-all group hover:scale-105">
      <div
        className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
      >
        {value}
        {suffix}
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}
