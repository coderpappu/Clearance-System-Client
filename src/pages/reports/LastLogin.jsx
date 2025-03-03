import React from "react";
import { useGetLoginLogsQuery } from "../../api/apiSlice";
const loginData = [
  {
    id: 1,
    user: "john.doe",
    role: "Teacher",
    lastLogin: "2024-07-26 10:35:22", // YYYY-MM-DD HH:MM:SS format
    ipAddress: "192.168.1.105",
    location: "Chattogram", // Dummy location
  },
  {
    id: 2,
    user: "jane.smith",
    role: "Admin",
    lastLogin: "2024-07-26 09:12:45",
    ipAddress: "10.0.0.20",
    location: "Dhaka", // Dummy location
  },
  {
    id: 3,
    user: "david.lee",
    role: "Student",
    lastLogin: "2024-07-25 15:58:10",
    ipAddress: "172.16.0.5",
    location: "Sylhet", // Dummy location
  },
  {
    id: 4,
    user: "sarah.jones",
    role: "Teacher",
    lastLogin: "2024-07-26 08:40:33",
    ipAddress: "192.168.1.112",
    location: "Khulna", // Dummy location
  },
  {
    id: 5,
    user: "michael.brown",
    role: "Admin",
    lastLogin: "2024-07-26 11:21:55",
    ipAddress: "10.0.0.25",
    location: "Rajshahi", // Dummy location
  },
  {
    id: 6,
    user: "emily.davis",
    role: "Student",
    lastLogin: "2024-07-24 18:33:28",
    ipAddress: "172.16.0.8",
    location: "Barishal", // Dummy location
  },
  {
    id: 7,
    user: "Pappu",
    role: "SuperAdmin",
    lastLogin: "2024-07-26 14:15:28",
    ipAddress: "192.168.1.10",
    location: "Chattogram", // Dummy location
  },
  // ... add more dummy data as needed
];

const LastLogin = () => {
  const { data } = useGetLoginLogsQuery();

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleString("en-GB", options)
      .replace(",", "");
  };

  return (
    <div className="dark:bg-dark-card p-4 bg-white rounded shadow h-[280px] overflow-y-auto custom-scrollbar">
      {" "}
      {/* Darker background, scroll */}
      <h3 className="text-lg font-semibold mb-2 text-dark-box dark:text-dark-heading-color">
        Last Login List
      </h3>{" "}
      {/* White title */}
      <div className="overflow-x-auto">
        <table className="w-full text-dark-box dark:text-white">
          {" "}
          {/* Full width, light text */}
          <thead>
            <tr className="text-left px-2 text-sm border-b border-dark-text-color border-opacity-10">
              {" "}
              {/* Left-aligned header text */}
              <th className="py-2 px-2">User</th>
              <th className="py-2">Role</th>
              <th className="py-2">Last Login Time</th>
              <th className="py-2">Location</th>
              <th className="py-2">IP Address</th>
            </tr>
          </thead>
          <tbody className="overflow-hidden ">
            {/* Map through your login data */}
            {data?.data?.logs.map((login) => (
              <tr
                key={login.id}
                className="dark:hover:bg-[#333f52] transition-all hover:bg-blue-600 hover:text-white border-b px-2 border-dark-text-color border-opacity-10 text-sm"
              >
                {" "}
                {/* Hover effect */}
                <td className="py-2 px-2">{login?.user?.first_name}</td>
                <td className="py-2 px-2">{login?.user?.role}</td>
                <td className="py-2 px-2">{formatDate(login?.createdAt)}</td>
                <td className="py-2 px-2">{login?.location}</td>
                <td className="py-2 px-2">{login?.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastLogin;
