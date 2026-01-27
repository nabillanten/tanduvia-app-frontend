"use client";

import {TrendingUp} from "lucide-react";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {MonthlyStat} from "@/app/(authenticated)/dashboard/admin/admin-dashboard";

const chartConfig = {
  normal: {
    label: "Perlu Perhatian",
    color: "var(--chart-1)",
  },
  notNormal: {
    label: "Normal",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({
  title,
  chartData,
}: {
  title: string;
  chartData: MonthlyStat[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Januari - Desember {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="monthName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className="w-48" />}
            />
            <Bar dataKey="normal" fill="var(--color-normal)" radius={4} />
            <Bar dataKey="notNormal" fill="var(--color-notNormal)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
