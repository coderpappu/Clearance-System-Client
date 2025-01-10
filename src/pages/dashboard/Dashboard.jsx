import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { HiOutlineChartPie, HiOutlineColorSwatch } from "react-icons/hi";
import { PiStudent } from "react-icons/pi";
import {
  useGetClearanceCategoriesQuery,
  useGetDepartmentsQuery,
  useGetStudentListQuery,
  useGetUserListQuery,
} from "../../api/apiSlice";

const DashboardStats = () => {
  const { data: students } = useGetStudentListQuery();
  const { data: teachers } = useGetUserListQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { data: Categories } = useGetClearanceCategoriesQuery();

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center bg-white dark:bg-dark-card p-7 rounded-lg shadow hover:shadow-lg transition duration-300">
          <div
            className={`w-12 h-12 flex items-center justify-center text-white rounded-full bg-blue-500`}
          >
            <PiStudent size={25} />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 dark:text-slate-100 text-sm">
              Students
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">
              {students?.data.length}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-card p-7 rounded-lg shadow hover:shadow-lg transition duration-300">
          <div
            className={`w-12 h-12 flex items-center justify-center text-white rounded-full bg-[#FB7D5B]`}
          >
            <GiGraduateCap size={25} />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 dark:text-slate-100 text-sm">
              Teachers
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-slate-200">
              {teachers?.data.length}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-card p-7 rounded-lg shadow hover:shadow-lg transition duration-300">
          <div
            className={`w-12 h-12 flex items-center justify-center text-white rounded-full bg-green-600`}
          >
            <HiOutlineColorSwatch size={25} />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 dark:text-slate-100 text-sm">
              Departments
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-slate-200">
              {departments?.data.length}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-white dark:bg-dark-card p-7 rounded-lg shadow hover:shadow-lg transition duration-300">
          <div
            className={`w-12 h-12 flex items-center justify-center text-white rounded-full bg-emerald-400`}
          >
            <HiOutlineChartPie size={25} />
          </div>
          <div className="ml-4">
            <p className="text-gray-500 dark:text-slate-100 text-sm">
              Categories
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-slate-200">
              {Categories?.data.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
