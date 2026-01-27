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

const chartConfig = {
  anak: {
    label: "Anak",
  },
  l: {
    label: "Laki-laki",
    color: "#2563eb",
  },
  p: {
    label: "Perempuan",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartPieDonutText({
  pieChartData: {totalGenderL, totalGenderP, total},
}: {
  pieChartData: {totalGenderL: number; totalGenderP: number; total: number};
}) {
  const chartData = [
    {
      gender: "l",
      anak: totalGenderL,
      fill: "#2563eb",
    },
    {
      gender: "p",
      anak: totalGenderP,
      fill: "#60a5fa",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Jumlah Anak Berdasarkan Gender</CardTitle>
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
              dataKey="anak"
              nameKey="gender"
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
                          Anak
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="gender" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
