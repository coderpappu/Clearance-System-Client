"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "keep-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const AreaChartComponent = () => {
  const chartData = [
    { month: "January", sales: 186, profit: 80 },
    { month: "February", sales: 305, profit: 200 },
    { month: "March", sales: 237, profit: 120 },
    { month: "April", sales: 73, profit: 190 },
    { month: "May", sales: 209, profit: 130 },
    { month: "June", sales: 214, profit: 140 },
  ];

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#1B4DFF",
    },
    profit: {
      label: "Profit",
      color: "#60a5fa",
    },
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card ">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Student's Due
      </h3>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <defs>
            <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B4DFF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1B4DFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
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
            dataKey="profit"
            stroke="#1B4DFF"
            fillOpacity={1}
            fill="url(#profit)"
          />
          <Area
            stackId="a"
            type="natural"
            dataKey="sales"
            stroke="#1B4DFF"
            fillOpacity={1}
            fill="url(#sales)"
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
