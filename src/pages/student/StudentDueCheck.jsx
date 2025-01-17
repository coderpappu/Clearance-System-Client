import React, { useState } from "react";
import { usePDF } from "react-to-pdf";
import { useGetTotalDueByStudentIdQuery } from "../../api/apiSlice";
import Logo from "../../assets/cpi_logo.png";
import ErrorMessage from "../../utils/ErrorMessage";
const StudentDueCheck = () => {
  const [boardRoll, setBoardRoll] = useState("");
  const [session, setSession] = useState("");
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState("");
  const [showResult, setShowResult] = useState(false);

  const {
    data: totalStudentDueCheck,
    isError,
    error: serverMsg,
  } = useGetTotalDueByStudentIdQuery(studentData);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf", margin: 40 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!boardRoll || !session) {
      setError("Both fields are required");
      return;
    }
    setError("");
    try {
      setStudentData(boardRoll);
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBack = () => {
    setShowResult(false);
    setBoardRoll("");
    setSession("");
    setError("");
    setStudentData("");
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img className="w-24 h-24 mr-2" src={Logo} alt="logo" />
      </a>
      {!showResult ? (
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Student Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="boardRoll"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Board Roll
                </label>
                <input
                  type="text"
                  name="boardRoll"
                  id="boardRoll"
                  value={boardRoll}
                  onChange={(e) => setBoardRoll(e.target.value)}
                  placeholder="203010"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="session"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Session
                </label>
                <select
                  name="session"
                  id="session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Session</option>
                  <option value="20-21">20-21</option>
                  <option value="21-22">21-22</option>
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <button
              className="text-blue-500 hover:underline"
              onClick={handleBack}
            >
              &larr; Back
            </button>
            {isError ? (
              <ErrorMessage message={serverMsg?.data?.message} />
            ) : (
              <>
                <div className="w-full mb-4" ref={targetRef}>
                  <h2 className="text-lg mb-6 text-center font-bold text-gray-900 dark:text-white">
                    Account Information
                  </h2>
                  <div className="flex flex-wrap justify-between">
                    <div>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Name: {totalStudentDueCheck?.data?.stuInfo?.name}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Board Roll:{" "}
                        {totalStudentDueCheck?.data?.stuInfo?.boardRoll}
                      </p>

                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Registration No:{" "}
                        {totalStudentDueCheck?.data?.stuInfo?.registrationNo}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Group : {totalStudentDueCheck?.data?.stuInfo?.group}
                      </p>

                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Session: {totalStudentDueCheck?.data?.stuInfo?.session}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Department:{" "}
                        {totalStudentDueCheck?.data?.stuInfo?.department?.name}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-base font-bold mb-6 text-gray-900 dark:text-white mt-4">
                    Due Information
                  </h2>

                  <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Department
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Clearance
                        </th>
                        <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalStudentDueCheck?.data?.dueDetails.map(
                        (detail, index) => (
                          <tr key={index}>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white">
                              {detail.department}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white">
                              {detail.clearanceCategory}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white">
                              {detail.amount}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  <div className="flex flex-wrap justify-between my-5">
                    <p className="text-sm text-right font-bold text-gray-900 dark:text-white">
                      Payment Status:{" "}
                      {totalStudentDueCheck?.data?.paymentStatus}
                    </p>
                    <p className="text-sm text-right font-bold text-gray-900 dark:text-white">
                      Total Due: {totalStudentDueCheck?.data?.totalDue}
                    </p>
                  </div>
                </div>
                <div className="flex  justify-start gap-3">
                  <button
                    onClick={() => toPDF()}
                    className="mb-4 px-3 py-2 bg-blue-500 text-white rounded cursor-pointer text-sm"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => {}}
                    className="mb-4 px-3 py-2 bg-green-500 text-white rounded cursor-pointer text-sm"
                  >
                    Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDueCheck;
