const LastLogin = ({ dashboardData }) => {
  // Use login logs from dashboard stats instead of separate API call
  const loginLogs = dashboardData?.recentLoginLogs || [];

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
        Last Login List (24h)
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
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">IP Address</th>
              <th className="py-2">Login Time</th>
            </tr>
          </thead>
          <tbody className="overflow-hidden ">
            {/* Map through your login data */}
            {loginLogs.map((login, index) => (
              <tr
                key={index}
                className="dark:hover:bg-[#333f52] transition-all hover:bg-blue-600 hover:text-white border-b px-2 border-dark-text-color border-opacity-10 text-sm"
              >
                {" "}
                {/* Hover effect */}
                <td className="py-2 px-2">{login?.userName}</td>
                <td className="py-2 px-2">{login?.email}</td>
                <td className="py-2 px-2">{login?.role}</td>
                <td className="py-2 px-2">{login?.ipAddress}</td>
                <td className="py-2 px-2">{formatDate(login?.loginTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastLogin;
