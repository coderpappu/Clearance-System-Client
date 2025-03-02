import React from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDuePaidReportQuery } from "../../api/apiSlice";

const data = [
  { name: "Jan", Sales: 4000, Profit: 2400 },
  { name: "Feb", Sales: 3000, Profit: 1398 },
  { name: "Mar", Sales: 2000, Profit: 9800 },
  { name: "Apr", Sales: 2780, Profit: 3908 },
  { name: "May", Sales: 1890, Profit: 4800 },
  { name: "Jun", Sales: 2390, Profit: 3800 },
  { name: "Jul", Sales: 3490, Profit: 4300 },
];

const MyLineChart = () => {
 

  return (
    <div className="bg-white dark:bg-dark-card p-4 rounded shadow">
      {" "}
      {/* Container with Tailwind styling */}
      <h3 className="text-lg font-semibold mb-2 dark:text-dark-heading-color">
        Studen
      </h3>{" "}
      {/* Chart title */}
      <ResponsiveContainer width="100%" height={300}>
        {" "}
        {/* Makes the chart responsive */}
        <LineChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" />  */}
          <XAxis dataKey="name" /> {/* X-axis with data from 'name' key */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" />{" "}
          {/* Sales line */}
          <Line type="monotone" dataKey="Profit" stroke="#34D399" />{" "}
          {/* Profit line */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineChart;
