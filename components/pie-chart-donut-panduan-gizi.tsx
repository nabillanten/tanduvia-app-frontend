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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {RecentPanduanGizi} from "@/app/(authenticated)/dashboard/admin/admin-dashboard";

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

export function ChartPieDonutTextPanduanGizi({
  pieChartData: {
    totalPendingPanduan,
    totalPublishedPanduan,
    totalRejectedPanduan,
    total,
  },
}: {
  pieChartData: RecentPanduanGizi;
}) {
  const chartData = [
    {
      status: "published",
      panduan: totalPublishedPanduan,
      fill: "var(--chart-2)",
    },
    {status: "pending", panduan: totalPendingPanduan, fill: "var(--chart-5)"},
    {status: "rejected", panduan: totalRejectedPanduan, fill: "var(--chart-1)"},
  ];

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Jumlah Panduan Gizi Berdasarkan Status</CardTitle>
        <CardDescription>
          Januari - Desember {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto [&_.recharts-pie-label-text]:text-xl font-bold">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              labelLine={false}
              label
              data={chartData}
              dataKey="panduan"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}>
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
                          {total.toLocaleString()}
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
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
