import { ChartContainer, ChartTooltip, ChartTooltipContent } from "keep-react";
import { Pie, PieChart, Sector } from "recharts";
import { useGetDepartmentClearanceReportQuery } from "../../api/apiSlice";

const PieChartComponent = () => {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useGetDepartmentClearanceReportQuery();

 

  // const chartData = [
  //   { department: "Computer Technology", students: 275, fill: "#3CAAFA" },
  //   { department: "Civil Technology", students: 200, fill: "#9631F5" },
  // ];
  const chartConfig = {
    students: {
      label: "Visitors",
    },
    computer: {
      label: "Computer Technology",
      color: "#3CAAFA",
    },
    electronics: {
      label: "Electronics Technology",
      color: "#9631F5",
    },
    civil: {
      label: "Civil Technology",
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
    other2: {
      label: "Other",
      color: "#afbaca",
    },
    other3: {
      label: "Other",
      color: "#afbaca",
    },
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-dark-card">
      <h3 className="text-lg font-semibold mb-2 text-dark-box  dark:text-dark-heading-color">
        Clearance
      </h3>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData?.data}
            dataKey="students"
            nameKey="department"
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
