"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface TooltipPayloadItem {
  name: string;
  value: number;
}

export function TestSplitTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-lg border border-border bg-popover px-3 py-1.5 shadow-md">
        <p className="text-xs font-medium text-popover-foreground">
          {data.name}: {data.value} tests
        </p>
      </div>
    );
  }
  return null;
}

const testData = [
  { name: "Vitest (Frontend)", value: 131, color: "#10b981" },
  { name: "Jest (Backend)", value: 78, color: "#6366f1" },
];

export function TestSplitDonut() {
  return (
    <div className="h-44 w-full py-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={testData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={68}
            paddingAngle={4}
            dataKey="value"
          >
            {testData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<TestSplitTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
