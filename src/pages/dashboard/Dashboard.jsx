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
import ClearanceStatusChart from "../reports/ClearanceStatus";
import { BarChartComponent } from "../reports/CollectionReport";
import LastLogin from "../reports/LastLogin";
import { AreaChartComponent } from "../reports/PaymentReport";
import { AccordionComponent } from "../reports/Question";

const DashboardStats = () => {
  const { data: students } = useGetStudentListQuery();
  const { data: teachers } = useGetUserListQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { data: Categories } = useGetClearanceCategoriesQuery();

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 dark:bg-dark-card rounded-lg bg-white intro_card px-5 py-8 ">
          <h2 className="text-2xl font-semibold text-blue-900 font-raleway">
            Welcome Back , Dear Pappu{" "}
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis, velit.
          </p>
          <button
            type="button"
            className="py-3 px-5 bg-dark-bg text-white rounded-lg"
          >
            Check More
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="flex items-center bg-white dark:bg-dark-card p-7 rounded-lg shadow hover:shadow-lg transition duration-300 ">
            <div
              className={`w-12 h-12 flex items-center justify-center text-white rounded-full bg-blue-500`}
            >
              <PiStudent size={25} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 dark:text-slate-100 text-sm font-raleway">
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
              <p className="text-gray-500 dark:text-slate-100 text-sm font-raleway">
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
              <p className="text-gray-500 dark:text-slate-100 text-sm font-raleway">
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
              <p className="text-gray-500 dark:text-slate-100 text-sm font-raleway">
                Categories
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-slate-200">
                {Categories?.data.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <ClearanceStatusChart />
        <BarChartComponent />
        <AreaChartComponent />
        {/* <DepartmentClearanceChart /> */}
        {/* <MyLineChart /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <LastLogin />
        <AccordionComponent />
      </div>
    </div>
  );
};

export default DashboardStats;
