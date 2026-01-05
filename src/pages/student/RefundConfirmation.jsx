import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    useCheckRefundEligibilityMutation,
    useSubmitRefundConfirmationMutation,
} from "../../api/apiSlice";
import Logo from "../../assets/cpi_logo.png";
import ErrorMessage from "../../utils/ErrorMessage";

const RefundConfirmation = () => {
  const [formData, setFormData] = useState({
    boardRoll: "",
    registrationNo: "",
  });
  const [studentData, setStudentData] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const [checkEligibility, { isLoading: isChecking, error: serverError }] =
    useCheckRefundEligibilityMutation();
  const [submitConfirmation, { isLoading: isSubmitting }] =
    useSubmitRefundConfirmationMutation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.boardRoll || !formData.registrationNo) {
      setError("Both fields are required");
      return;
    }

    setError("");

    try {
      const result = await checkEligibility(formData).unwrap();
      setStudentData(result.data);
      setShowResult(true);
      setAgreed(false);
    } catch (error) {
      setError(error?.data?.message || "Student not found or refund process is not active");
    }
  };

  const handleConfirmSubmit = async () => {
    if (!agreed) {
      toast.error("Please confirm that you received the refund");
      return;
    }

    try {
      await submitConfirmation(formData).unwrap();
      toast.success("Refund confirmation submitted successfully!");

      // Refresh student data to show updated status
      const result = await checkEligibility(formData).unwrap();
      setStudentData(result.data);
      setAgreed(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit confirmation");
    }
  };

  const handleBack = () => {
    setShowResult(false);
    setFormData({ boardRoll: "", registrationNo: "" });
    setError("");
    setStudentData(null);
    setAgreed(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-800 dark:text-yellow-200" },
      APPROVED: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-200" },
      REJECTED: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200" },
    };
    return badges[status] || badges.PENDING;
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
              Campus Refund Confirmation
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Confirm receipt of your campus refund money
            </p>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="boardRoll"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Board Roll Number
                </label>
                <input
                  type="text"
                  name="boardRoll"
                  id="boardRoll"
                  value={formData.boardRoll}
                  onChange={handleInputChange}
                  placeholder="Enter your roll number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="registrationNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNo"
                  id="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleInputChange}
                  placeholder="Enter your registration number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={isChecking}
                className="w-full text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChecking ? "Checking..." : "Check Eligibility"}
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

            {serverError ? (
              <ErrorMessage message={serverError?.data?.message} />
            ) : (
              <>
                <div className="w-full mb-4">
                  <h2 className="text-lg mb-6 text-center font-bold text-gray-900 dark:text-white">
                    Student Details
                  </h2>
                  <div className="flex flex-wrap justify-between">
                    <div>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Name: {studentData?.student?.name}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Board Roll: {studentData?.student?.boardRoll}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Registration No: {studentData?.student?.registrationNo}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Shift: {studentData?.student?.shift}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Group: {studentData?.student?.group}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Session: {studentData?.student?.session}
                      </p>
                      <p className="text-sm mb-2 text-gray-900 dark:text-white">
                        Department: {studentData?.student?.department?.name}
                      </p>
                      {studentData?.refundAmount && (
                        <p className="text-sm mb-2 font-bold text-green-600 dark:text-green-400">
                          Refund Amount: ৳ {studentData?.refundAmount}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Confirmation Section */}
                  {!studentData?.hasSubmitted ? (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                      <div className="flex items-start mb-4 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                        <input
                          type="checkbox"
                          id="agree"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="agree"
                          className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                        >
                          I confirm that I have received the campus refund money
                        </label>
                      </div>
                      <button
                        onClick={handleConfirmSubmit}
                        disabled={!agreed || isSubmitting}
                        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Confirmation"}
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Confirmation Status
                        </p>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                            getStatusBadge(studentData?.confirmation?.status).bg
                          } ${getStatusBadge(studentData?.confirmation?.status).text}`}
                        >
                          {studentData?.confirmation?.status}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                          Submitted on:{" "}
                          {new Date(
                            studentData?.confirmation?.confirmed_at
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundConfirmation;
