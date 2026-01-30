"use client";

import {Bar, BarChart, CartesianGrid, LabelList, XAxis} from "recharts";

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
import {MonthlyStat} from "@/app/(authenticated)/dashboard/admin/admin-dashboard";

const chartConfig = {
  normal: {
    label: "Normal",
    color: "var(--chart-2)",
  },
  notNormal: {
    label: "Perlu Perhatian",
    color: "var(--chart-1)",
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
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
            }}>
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
            <Bar dataKey="normal" fill="var(--color-normal)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="notNormal" fill="var(--color-notNormal)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
