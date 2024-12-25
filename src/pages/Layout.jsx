import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  FaBuilding,
  FaGraduationCap,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaUniversity,
  FaUser,
} from "react-icons/fa"; // Import icons

import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { Link, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import ProfileImg from "../assets/profile.png";

const Layout = () => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null); // Initialize user as null
  const navigate = useNavigate();

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

    // Fetch user data from token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUser(decodedToken);
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

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem("token");
    navigate("/signin"); // Redirect to login page
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-72 bg-gray-800 text-white relative">
          {/* logged profile img and user name */}
          <div className="flex items-center p-4">
            <Link to={`user/profile/${user?.userId}`}>
              <img
                src={ProfileImg}
                alt="Profile"
                className="h-14 w-14 rounded-full mr-4"
              />
            </Link>
            <div>
              {user ? (
                <>
                  <h2 className="text-lg font-semibold">
                    {user.first_name + " " + user?.last_name}
                  </h2>
                  <p className="text-sm">{user.role}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
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
                  to="/institute/profile"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaBuilding className="mr-2" /> {/* Icon for Institute */}
                  Institute
                </Link>
              </li>

              <li>
                <Link
                  to="/department/list"
                  className="flex items-center px-4 py-2 text-base hover:bg-gray-700"
                >
                  <FaUser className="mr-2" /> {/* Icon for User Account */}
                  Department
                </Link>
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
          <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
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
