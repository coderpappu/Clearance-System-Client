"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "keep-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useGetDuePaidReportQuery } from "../../api/apiSlice";

export const AreaChartComponent = () => {
  const { data, isLoading } = useGetDuePaidReportQuery();

  if (isLoading) return <div>Loading...</div>;

  const duepaidReport = data?.data;

  const chartConfig = {
    due_student: {
      label: "due_student",
      color: "#1B4DFF",
    },
    due_paid: {
      label: "due_paid",
      color: "#60a5fa",
    },
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card ">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Payment's Due
      </h3>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart
          accessibilityLayer
          data={duepaidReport}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="department"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <defs>
            <linearGradient id="due_paid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B4DFF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1B4DFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="due_student" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B4DFF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1B4DFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartLegend
            verticalAlign="top"
            align="right"
            content={<ChartLegendContent />}
          />
          <Area
            stackId="a"
            type="natural"
            dataKey="due_paid"
            stroke="#1B4DFF"
            fillOpacity={1}
            fill="url(#due_paid)"
          />
          <Area
            stackId="a"
            type="natural"
            dataKey="due_student"
            stroke="#1B4DFF"
            fillOpacity={1}
            fill="url(#due_student)"
          />
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent indicator="dot" />}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
