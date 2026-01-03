import { ChartContainer, ChartTooltip, ChartTooltipContent } from "keep-react";
import { Cell, Pie, PieChart } from "recharts";
import { useGetDepartmentClearanceReportQuery } from "../../api/apiSlice";

const PieChartComponent = () => {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useGetDepartmentClearanceReportQuery();

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
  const processedData = chartData?.data?.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  })) || [];

  // Calculate total students
  const totalStudents = processedData.reduce((sum, item) => sum + item.students, 0);

  const chartConfig = {
    students: {
      label: "Students",
    },
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-dark-card shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-heading-color">
          Clearance Status by Department
        </h3>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !processedData || processedData.length === 0) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-dark-card shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-heading-color">
          Clearance Status by Department
        </h3>
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No clearance data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-dark-card shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-dark-heading-color">
        Clearance Status
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
              dataKey="students"
              nameKey="department"
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
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{totalStudents}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
