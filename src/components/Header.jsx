import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BiLogoAudible } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ManProfile from "../assets/profile.png";
const Header = ({ moduleName }) => {
  const [user, setUser] = useState(null); // Initialize user as null

  // On initial render, check localStorage for theme preference and user data
  useEffect(() => {
    // Fetch user data from token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUser(decodedToken);
    }
  }, []);

  return (
    <div className="bg-[#fff] dark:bg-dark-card w-full py-2 xl:px-6">
      <div className="lg:wrapper-container xl:w-full flex flex-wrap items-center justify-between ">
        {/* Product Brand Logo  */}
        <div className="w-[50%]">
          <h2 className="font-semibold  text-[#0E1A34] dark:text-white font-poppins flex gap-2 items-center">
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

          {/* profile here  */}
          <Link to={`user/profile/${user?.userId}`}>
            <div className="flex flex-wrap items-center gap-1">
              <img
                src={ManProfile}
                alt="Avatar "
                className="w-[40px] h-[40px] rounded-full border border-[#0E1A34]"
              />{" "}
              <label className="ml-1 font-medium text-[#0E1A34] dark:text-white ">
                {user ? (
                  <>
                    <h2 className="text-lg font-semibold">{user.first_name}</h2>
                    <p className="text-sm">{user.role}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </label>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
