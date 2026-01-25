"use client";

import * as React from "react";
import {Label, LabelList, Pie, PieChart} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  {status: "published", panduan: 10, fill: "var(--chart-2)"},
  {status: "pending", panduan: 2, fill: "var(--chart-5)"},
  {status: "rejected", panduan: 3, fill: "var(--chart-1)"},
];

const chartConfig = {
  panduan: {
    label: "Panduan",
  },
  published: {
    label: "Published",
    color: "#2563eb",
  },
  pending: {
    label: "Pending",
    color: "#60a5fa",
  },
  rejected: {
    label: "Ditolak",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartPieDonutTextPanduanGizi() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.panduan, 0);
  }, []);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Jumlah Panduan Gizi Berdasarkan Status</CardTitle>
        <CardDescription>Januari - Maret 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="panduan"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}>
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
              <Label
                content={({viewBox}) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg lg:text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Panduan
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
