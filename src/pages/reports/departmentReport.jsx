import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDepartmentClearanceReportQuery } from "../../api/apiSlice";

const data = [
  { department: "Computer Technology", clearances: 45 },
  { department: "Electrical Technology", clearances: 30 },
  { department: "Civil Technology", clearances: 60 },
  { department: "Mechanical Technology", clearances: 35 },
  { department: "Mechanical Technology", clearances: 50 },
  { department: "Mechanical Technology", clearances: 60 },
  { department: "Mechanical Technology", clearances: 26 },
  { department: "Mechanical Technology", clearances: 88 },
];

const DepartmentClearanceChart = () => {
 

  return (
    <div className=" p-4 rounded bg-white dark:bg-dark-card">
      <h3 className="text-lg font-semibold mb-2 dark:text-dark-heading-color">
        Clearances by Department
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 1" /> */}
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="clearances" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentClearanceChart;
