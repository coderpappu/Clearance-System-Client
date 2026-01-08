import { ChartContainer, ChartTooltip, ChartTooltipContent } from "keep-react";
import { Cell, Pie, PieChart } from "recharts";

const PieChartComponent = ({ dashboardData }) => {
  // Use department clearance data instead of status distribution
  const departmentClearanceData =
    dashboardData?.departmentClearanceStats?.departments || [];
  const totalCleared =
    dashboardData?.departmentClearanceStats?.totalCleared || 0;
  const isLoading = !dashboardData;

  // Vibrant color palette for departments
  const COLORS = [
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#6366F1", // Indigo
    "#14B8A6", // Teal
    "#F97316", // Orange
  ];

  // Add fill colors to chart data
  const processedData =
    departmentClearanceData?.map((item, index) => ({
      name: item.departmentName,
      value: item.clearedStudents,
      fill: COLORS[index % COLORS.length],
    })) || [];

  const chartConfig = {
    value: {
      label: "Cleared Students",
    },
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-dark-card shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-heading-color">
          Department Clearance Status
        </h3>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!processedData || processedData.length === 0) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-dark-card shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-heading-color">
          Department Clearance Status
        </h3>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No clearance data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-dark-card shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-heading-color">
        Department Clearance Status
      </h3>

      <div className="relative">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={2}
              stroke="#fff"
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {totalCleared}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Cleared
          </p>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
