import { ChartContainer, ChartTooltip, ChartTooltipContent } from "keep-react";
import { Pie, PieChart, Sector } from "recharts";

const PieChartComponent = () => {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "#3CAAFA" },
    { browser: "safari", visitors: 200, fill: "#9631F5" },
    { browser: "firefox", visitors: 187, fill: "#38D6EF" },
    { browser: "edge", visitors: 173, fill: "#D638EE" },
    { browser: "other", visitors: 90, fill: "#afbaca" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#3CAAFA",
    },
    safari: {
      label: "Safari",
      color: "#9631F5",
    },
    firefox: {
      label: "Firefox",
      color: "#38D6EF",
    },
    edge: {
      label: "Edge",
      color: "#D638EE",
    },
    other: {
      label: "Other",
      color: "#afbaca",
    },
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Sessions
      </h3>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
            strokeWidth={5}
            activeIndex={0}
            activeShape={({ outerRadius = 0, ...props }) => (
              <Sector {...props} outerRadius={outerRadius + 10} />
            )}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default PieChartComponent;
