"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "keep-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const AreaChartComponent = ({ dashboardData }) => {
  // Use financial data from dashboard stats
  const dueStats = dashboardData?.financial?.dueStats || [];
  const paymentStats = dashboardData?.financial?.paymentStats || [];

  // Transform data for the chart - showing due vs paid by status
  const chartData = [
    {
      name: "Pending",
      dueAmount: parseFloat(
        dueStats.find((s) => s.status === "PENDING")?.amount || 0
      ),
      paidAmount: parseFloat(
        paymentStats.find((s) => s.status === "PENDING")?.amount || 0
      ),
    },
    {
      name: "Approved",
      dueAmount: parseFloat(
        dueStats.find((s) => s.status === "APPROVED")?.amount || 0
      ),
      paidAmount: parseFloat(
        paymentStats.find((s) => s.status === "APPROVED")?.amount || 0
      ),
    },
    {
      name: "Rejected",
      dueAmount: parseFloat(
        dueStats.find((s) => s.status === "REJECTED")?.amount || 0
      ),
      paidAmount: parseFloat(
        paymentStats.find((s) => s.status === "REJECTED")?.amount || 0
      ),
    },
  ];

  const chartConfig = {
    dueAmount: {
      label: "Due Amount",
      color: "#EF4444",
    },
    paidAmount: {
      label: "Paid Amount",
      color: "#10B981",
    },
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card ">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Payment Overview
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
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <defs>
            <linearGradient id="dueAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="paidAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend
            verticalAlign="top"
            align="right"
            content={<ChartLegendContent />}
          />
          <Area
            stackId="a"
            type="natural"
            dataKey="dueAmount"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#dueAmount)"
          />
          <Area
            stackId="a"
            type="natural"
            dataKey="paidAmount"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#paidAmount)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
