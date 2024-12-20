import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaBuilding,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaMoon,
  FaRegBuilding,
  FaSun,
  FaUniversity,
  FaUser,
} from "react-icons/fa"; // Import icons
import { Link, Outlet } from "react-router-dom";
const Layout = () => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On initial render, check localStorage for theme preference
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

  const toggleDepartmentMenu = () => {
    setIsDepartmentOpen((prev) => !prev);
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-72 bg-gray-800 text-white">
          <div className="h-16 flex items-center justify-center bg-blue-600">
            <h1 className="text-2xl font-bold">Clearance System</h1>
          </div>
          <nav className="mt-8">
            <ul>
              <li>
                <Link
                  to="/user/list"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaUser className="mr-2" /> {/* Icon for User Account */}
                  User Account
                </Link>
              </li>
              <li>
                <Link
                  to="/institute"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaBuilding className="mr-2" /> {/* Icon for Institute */}
                  Institute
                </Link>
              </li>

              <li>
                <Link
                  to="/institute/registration"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaBuilding className="mr-2" /> {/* Icon for Institute */}
                  Create Institute
                </Link>
              </li>

              {/* Department Dropdown */}
              <li>
                <button
                  onClick={toggleDepartmentMenu}
                  className="flex items-center w-full px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaRegBuilding className="mr-2" /> {/* Icon for Department */}
                  Department
                  {isDepartmentOpen ? (
                    <FaChevronUp className="ml-auto" />
                  ) : (
                    <FaChevronDown className="ml-auto" />
                  )}
                </button>
                {isDepartmentOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link
                        to="/institute/adddepartment"
                        className="flex items-center px-4 py-2 text-base text-gray-300 hover:bg-gray-700"
                      >
                        Add Department
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/department/list"
                        className="flex items-center px-4 py-2 text-base text-gray-300 hover:bg-gray-700"
                      >
                        Department List
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/clearance/category"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaGraduationCap className="mr-2" /> {/* Icon for Student */}
                  Clearance Category
                </Link>
              </li>
              <li>
                <Link
                  to="/student"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaGraduationCap className="mr-2" /> {/* Icon for Student */}
                  Student
                </Link>
              </li>
              <li>
                <Link
                  to="/clearance"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaUniversity className="mr-2" /> {/* Icon for Clearance */}
                  Clearance
                </Link>
              </li>
            </ul>
          </nav>

          {/* Dark Mode Toggle Button (Located at the bottom of the sidebar) */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
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
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
          {/* This will render the component based on the current route */}
          <Outlet />
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Layout;
