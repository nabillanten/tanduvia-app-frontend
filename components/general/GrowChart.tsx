import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface GrowthChartProps {
  title: string;
  data: object[];
  childDataKey: string;
  yLabel: string;
  unit: string;
}

const GrowthChart: React.FC<GrowthChartProps> = ({
  title,
  data,
  childDataKey,
  yLabel,
  unit,
}) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-full mb-4 md:mb-8">
      <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-4 md:mb-6">
        {title}
      </h3>
      {/* Responsive height: 300px on mobile, 450px on larger screens */}
      <div className="h-[300px] md:h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{top: 5, right: 10, left: 0, bottom: 20}}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="age"
              label={{
                value: "Usia (Bulan)",
                position: "bottom",
                offset: -10,
                fontSize: 12,
              }}
              tick={{fontSize: 10}}
              type="number"
              domain={[0, 60]}
              // Reduced ticks on mobile to avoid crowding
              interval="preserveStartEnd"
              ticks={[0, 12, 24, 36, 48, 60]}
            />
            <YAxis tick={{fontSize: 10}} domain={["auto", "auto"]} width={35} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
              }}
              formatter={(value: number, name: string) => {
                const label = name === childDataKey ? "Hasil Ukur Anak" : name;
                return [
                  `${Number(value)?.toFixed(1)}${unit}`,
                  label,
                ];
              }}
              labelFormatter={(label) => `Usia: ${label} bulan`}
            />
            <Legend
              verticalAlign="top"
              height={40}
              iconType="circle"
              wrapperStyle={{fontSize: "10px", paddingTop: "0px"}}
            />

            <Line
              type="monotone"
              dataKey="sd_p3"
              stroke="#ef4444"
              strokeWidth={1}
              dot={false}
              name="+3 SD"
              strokeDasharray="3 3"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="sd_p2"
              stroke="#f59e0b"
              strokeWidth={1}
              dot={false}
              name="+2 SD"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="median"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Median"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="sd_m2"
              stroke="#f59e0b"
              strokeWidth={1}
              dot={false}
              name="-2 SD"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="sd_m3"
              stroke="#ef4444"
              strokeWidth={1}
              dot={false}
              name="-3 SD"
              strokeDasharray="3 3"
              connectNulls
            />

            <Line
              type="monotone"
              dataKey={childDataKey}
              stroke="#2563eb"
              strokeWidth={3}
              name="Data Anak"
              dot={{r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff"}}
              activeDot={{r: 8, strokeWidth: 0}}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart;
