import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiLayer } from "react-icons/bi";
import { FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa"; // Import icons
import { PiStudentDuotone, PiUsers } from "react-icons/pi";

import { BiBookOpen, BiDialpadAlt } from "react-icons/bi";
import { PiSpeedometer } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate and useLocation
import CompanyLogo from "../assets/company.png";
import ClearanceLogo from "../assets/e-clearance-logo.png";
import Header from "../components/Header";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [module, setModule] = useState(null); // Initialize user as null
  const [moduleName, setModuleName] = useState(""); // State for module name
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // On initial render, check localStorage for theme preference and user data
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark"); // Apply dark theme
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark"); // Apply light theme
    }
  }, []);

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
    } else {
      setModuleName("");
    }
  }, [location]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        localStorage.setItem("theme", "dark");
        document.body.classList.add("dark"); // Apply dark theme
      } else {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark"); // Apply light theme
      }
      return newMode;
    });
  };

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem("token");
    navigate("/signin"); // Redirect to login page
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-72 bg-gray-800 text-white fixed h-full overflow-y-auto">
          {/* logged profile img and user name */}
          <div className="px-8 py-3">
            <img src={ClearanceLogo} />
          </div>
          <nav className="mt-8 ">
            <ul className="p-4 ">
              <li className="my-1">
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <PiSpeedometer className="mr-2" />{" "}
                  {/* Icon for User Account */}
                  Dashboard
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/user/list"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <PiUsers className="mr-2" /> {/* Icon for User Account */}
                  Users
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/institute/profile"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <BiBookOpen className="mr-2" /> {/* Icon for Institute */}
                  Institute
                </Link>
              </li>

              <li className="my-1">
                <Link
                  to="/department/list"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <BiDialpadAlt className="mr-2" />{" "}
                  {/* Icon for User Account */}
                  Departments
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/clearance/category"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <BiLayer className="mr-2" /> {/* Icon for Student */}
                  Clearance Category
                </Link>
              </li>
              <li className="my-1">
                <Link
                  to="/student"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <PiStudentDuotone className="mr-2" /> {/* Icon for Student */}
                  Student
                </Link>
              </li>

              <li className="my-1">
                <Link
                  to="/payment-verify"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <TbMoneybag className="mr-2" /> {/* Icon for Student */}
                  Payment
                </Link>
              </li>

              <li className="my-1">
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-base transition-all hover:bg-gray-700 rounded-md"
                >
                  <SlSettings className="mr-2" /> {/* Icon for Student */}
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          {/* Dark Mode Toggle Button (Located at the bottom of the sidebar) */}
          <div className="absolute bottom-36 left-4 flex flex-col space-y-2">
            <button
              onClick={toggleTheme}
              className="flex items-center px-4 py-2 text-base hover:bg-gray-700 rounded-lg"
            >
              {isDarkMode ? (
                <FaSun className="mr-2" />
              ) : (
                <FaMoon className="mr-2" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-base hover:bg-gray-700 rounded-lg"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          {/* company logo  */}
          <div className="w-full px-5  absolute bottom-5 ">
            <Link to="https://www.codexdevware.com/">
              {" "}
              <p className="pb-3">Developed By: </p>
              <img src={CompanyLogo} alt="Codex Devware" />
            </Link>
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
