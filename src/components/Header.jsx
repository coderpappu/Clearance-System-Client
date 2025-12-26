import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { BiLogoAudible } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline, IoMoonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import ManProfile from "../assets/profile.png";
const Header = ({ moduleName }) => {
  const [user, setUser] = useState(null); // Initialize user as null
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On initial render, check localStorage for theme preference and user data
  useEffect(() => {
    // Fetch user data from token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      setUser(decodedToken);
    }
  }, []);

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
    <div className="bg-[#fff] dark:bg-dark-card w-full py-2 xl:px-6">
      <div className="lg:wrapper-container xl:w-full flex flex-wrap items-center justify-between ">
        {/* Product Brand Logo  */}
        <div className="w-[50%]">
          <h2 className="font-semibold  mt-10 ml-5 md:mt-0 md:ml-16  text-[#0E1A34] dark:text-white font-poppins flex gap-2 items-center">
            <BiLogoAudible size={25} />
            {moduleName}
          </h2>
        </div>

        {/* Company Name  */}

        <div className="w-[50%] flex flex-wrap items-center justify-end gap-1">
          <div className="w-[40px] h-[40px] flex flex-col items-center rounded-md bg-[#e9e9e961] dark:bg-dark-box mr-2">
            <CiBellOn className="text-2xl text-[#0E1A34] dark:text-white m-auto" />
          </div>
          <div className="w-[40px] h-[40px] flex flex-col items-center rounded-md bg-[#e9e9e961] dark:bg-dark-box mr-2">
            <IoChatbubbleOutline className="text-2xl text-[#0E1A34] dark:text-white m-auto" />
          </div>
          <div
            className="w-[40px] h-[40px] flex flex-col items-center text-white rounded-md bg-[#e9e9e961] dark:bg-dark-box mr-2"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <BsSun className="text-xl text-[#0E1A34] dark:text-white m-auto" />
            ) : (
              <IoMoonOutline className="text-xl text-[#0E1A34] dark:text-white m-auto" />
            )}
          </div>
          {/* profile here  */}

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900  shadow-xs  ">
                <Link to={`user/profile/${user?.userId}`}>
                  <div className="flex flex-wrap items-center gap-1">
                    <img
                      src={ManProfile}
                      alt="Avatar "
                      className="w-[40px] h-[40px] rounded-full border border-[#0E1A34]"
                    />{" "}
                    <label className="ml-1 text-left font-medium text-[#0E1A34] dark:text-white ">
                      {user ? (
                        <>
                          <h2 className="text-base font-semibold">
                            {user.first_name}
                          </h2>
                          <p className="text-xs">{user.role}</p>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </label>
                  </div>
                </Link>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-44 top-[60px] origin-top-right rounded-md bg-white dark:bg-dark-box ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to={`user/profile/${user?.userId}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-color data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Account settings
                  </Link>
                </MenuItem>

                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      type="submit"
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-dark-text-color data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
