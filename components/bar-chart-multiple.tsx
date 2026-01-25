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

export const description = "A multiple bar chart";

const chartData = [
  {month: "January", warning: 186, normal: 80},
  {month: "February", warning: 305, normal: 200},
  {month: "March", warning: 237, normal: 120},
  {month: "April", warning: 73, normal: 190},
  {month: "May", warning: 209, normal: 130},
  {month: "June", warning: 214, normal: 140},
  {month: "July", warning: 214, normal: 140},
  {month: "August", warning: 214, normal: 140},
  {month: "September", warning: 214, normal: 140},
  {month: "October", warning: 214, normal: 140},
  {month: "November", warning: 214, normal: 140},
  {month: "December", warning: 214, normal: 140},
];

const chartConfig = {
  warning: {
    label: "Perlu Perhatian",
    color: "var(--chart-1)",
  },
  normal: {
    label: "Normal",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({title} : {title : string}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Januari - Maret 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
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
            <Bar dataKey="warning" fill="var(--color-warning)" radius={4} />
            <Bar dataKey="normal" fill="var(--color-normal)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
