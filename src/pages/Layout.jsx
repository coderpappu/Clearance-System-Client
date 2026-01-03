import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiBookOpen, BiDialpadAlt, BiLayer, BiMenu, BiX } from "react-icons/bi";
import { PiSpeedometer, PiStudentDuotone, PiUsers } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { TbMoneybag, TbReceipt2 } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router-dom";
import devCompany from "../assets/company.png";
import SupportImg from "../assets/customer-service.png";
import ClearanceLogo from "../assets/eclearance.png";
import Header from "../components/Header";

const Layout = () => {
  const [module, setModule] = useState(null);
  const [moduleName, setModuleName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

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
    } else if (path.includes("/refund-management")) {
      setModuleName("Refund Management");
    } else if (path.includes("/refund-settings")) {
      setModuleName("Refund Settings");
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
        <div
          className={`w-72 px-5 bg-dark-card text-white fixed h-full overflow-y-auto transition-transform transform z-50 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Close Button */}
          {sidebarOpen && (
            <button
              className="absolute top-4 right-4 z-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <BiX className="text-3xl dark:text-white text-dark-bg" />
            </button>
          )}

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
                  <PiSpeedometer className="mr-2" /> Dashboard
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/user/list"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/user/list") ? "bg-gray-700" : ""
                  }`}
                >
                  <PiUsers className="mr-2" /> Users
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/institute/profile"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/institute/profile") ? "bg-gray-700" : ""
                  }`}
                >
                  <BiBookOpen className="mr-2" /> Institute
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/department/list"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/department/list") ? "bg-gray-700" : ""
                  }`}
                >
                  <BiDialpadAlt className="mr-2" /> Departments
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/clearance/category"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/clearance/category") ? "bg-gray-700" : ""
                  }`}
                >
                  <BiLayer className="mr-2" /> Clearance Category
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/student"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/student") ? "bg-gray-700" : ""
                  }`}
                >
                  <PiStudentDuotone className="mr-2" /> Student
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/payment-verify"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/payment-verify") ? "bg-gray-700" : ""
                  }`}
                >
                  <TbMoneybag className="mr-2" /> Payment
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/refund-management"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/refund-management") ? "bg-gray-700" : ""
                  }`}
                >
                  <TbReceipt2 className="mr-2" /> Refund Management
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/refund-settings"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/refund-settings") ? "bg-gray-700" : ""
                  }`}
                >
                  <SlSettings className="mr-2" /> Refund Settings
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/settings"
                  className={`flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md ${
                    isActive("/settings") ? "bg-gray-700" : ""
                  }`}
                >
                  <SlSettings className="mr-2" /> Settings
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
                  <h2 className="text-sm text-slate-400 mb-3 mt-8 text-center">
                    Need help? Visit our support center
                  </h2>

                  <img src={devCompany} alt="Codex Devware" className="mt-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 ml-0 lg:ml-72">
          <Header moduleName={moduleName} />
          <div className="p-5">
            <Outlet />
          </div>
        </div>

        {/* Menu Button */}
        {!sidebarOpen && (
          <button
            className="fixed top-4 left-4  z-50 lg:hidden bg-dark-border-color dark:bg-dark-card rounded-full bg-opacity-35 p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <BiMenu className="text-3xl dark:text-white text-dark-bg" />
          </button>
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Layout;
