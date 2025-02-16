import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "keep-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

export const BarChartComponent = () => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#1B4DFF",
    },
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Student's Payment
      </h3>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend
            verticalAlign="top"
            align="right"
            content={<ChartLegendContent />}
          />
          <Bar
            dataKey="desktop"
            activeIndex={2}
            activeBar={({ ...props }) => {
              return <Rectangle {...props} fill="#1B4DFF" fillOpacity={1} />;
            }}
            fill="#1B4DFF"
            fillOpacity={0.2}
            radius={[5, 5, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
