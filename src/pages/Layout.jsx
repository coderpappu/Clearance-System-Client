import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiBookOpen, BiDialpadAlt, BiLayer } from "react-icons/bi";
// import { FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import { PiSpeedometer, PiStudentDuotone, PiUsers } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { TbMoneybag } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import SupportImg from "../assets//customer-service.png";
import CompanyLogo from "../assets/company.png";
import ClearanceLogo from "../assets/eclearance.png";
import Header from "../components/Header";

const Layout = () => {
  const [module, setModule] = useState(null); // Initialize user as null
  const [moduleName, setModuleName] = useState(""); // State for module name

  const location = useLocation(); // Get current location
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  // Update module name based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/user/list")) {
      setModuleName("Users Management");
    } else if (path.includes("/institute/profile")) {
      setModuleName("Institute Management");
    } else if (path.includes("/department/list")) {
      setModuleName("Departments Management");
    } else if (path.includes("/clearance/category")) {
      setModuleName("Clearance Category Management");
    } else if (path.includes("/student")) {
      setModuleName("Student Management");
    } else if (path.includes("/dashboard")) {
      setModuleName("Dashboard");
    } else if (path.includes("/payment-verify")) {
      setModuleName("Payments Verify");
    } else {
      setModuleName("");
    }
  }, [location]);

  const isActive = (path) => {
    return activeRoute === path;
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-72 px-5 bg-dark-card text-white fixed h-full  overflow-y-auto">
          {/* logged profile img and user name */}
          <div className="py-3 w-48 ">
            <img src={ClearanceLogo} />
          </div>

          <nav className="mt-8 ">
            <ul className="py-4">
              <li className="my-1">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/dashboard") ? "bg-gray-700" : ""
                  }`}
                >
                  <PiSpeedometer className="mr-2" />{" "}
                  {/* Icon for User Account */}
                  Dashboard
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/user/list"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/user/list") ? "bg-gray-700" : ""
                  }`}
                >
                  <PiUsers className="mr-2" /> {/* Icon for User Account */}
                  Users
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/institute/profile"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/institute/profile") ? "bg-gray-700" : ""
                  }`}
                >
                  <BiBookOpen className="mr-2" /> {/* Icon for Institute */}
                  Institute
                </Link>
              </li>

              <li className="my-1">
                <Link
                  to="/department/list"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/department/list") ? "bg-gray-700" : ""
                  }`}
                >
                  <BiDialpadAlt className="mr-2" />{" "}
                  {/* Icon for User Account */}
                  Departments
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/clearance/category"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/clearance/category") ? "bg-gray-700" : ""
                  }`}
                >
                  <BiLayer className="mr-2" /> {/* Icon for Student */}
                  Clearance Category
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/student"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/student") ? "bg-gray-700" : ""
                  }`}
                >
                  <PiStudentDuotone className="mr-2" /> {/* Icon for Student */}
                  Student
                </Link>
              </li>

              <li className="my-1">
                <Link
                  to="/payment-verify"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/payment-verify") ? "bg-gray-700" : ""
                  }`}
                >
                  <TbMoneybag className="mr-2" /> {/* Icon for Student */}
                  Payment
                </Link>
              </li>

              <li className="my-1">
                <Link
                  to="/settings"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/settings") ? "bg-gray-700" : ""
                  }`}
                >
                  <SlSettings className="mr-2" /> {/* Icon for Student */}
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          <div className="">
            <div className="w-[85%] absolute bottom-40 z-20 flex justify-center">
              <img src={SupportImg} alt="Support" className="w-16" />
            </div>

            <div className="w-[85%] h-44 absolute bottom-5 bg-white bg-opacity-10 border-2 border-slate-600 rounded-md ">
              <div className="w-full p-[15px] absolute ">
                <Link to="https://www.codexdevware.com/" target="_blank">
                  {" "}
                  <h2 className="text-sm text-slate-400 mb-3 mt-8 text-center">
                    Need help? Visit our support center
                  </h2>
                  <img src={CompanyLogo} alt="Codex Devware" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1  bg-gray-100 dark:bg-gray-900 ml-72">
          <Header moduleName={moduleName} /> {/* Pass moduleName to Header */}
          {/* This will render the component based on the current route */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Layout;
