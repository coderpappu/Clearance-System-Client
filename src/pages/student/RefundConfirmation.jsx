import { useState } from "react";
import { toast } from "react-hot-toast";
import {
    useCheckRefundEligibilityMutation,
    useSubmitRefundConfirmationMutation,
} from "../../api/apiSlice";

const RefundConfirmation = () => {
  const [formData, setFormData] = useState({
    boardRoll: "",
    registrationNo: "",
  });
  const [studentData, setStudentData] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const [checkEligibility, { isLoading: isChecking }] =
    useCheckRefundEligibilityMutation();
  const [submitConfirmation, { isLoading: isSubmitting }] =
    useSubmitRefundConfirmationMutation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = async (e) => {
    e.preventDefault();

    if (!formData.boardRoll || !formData.registrationNo) {
      toast.error("Please enter both Roll and Registration Number");
      return;
    }

    try {
      const result = await checkEligibility(formData).unwrap();
      setStudentData(result.data);
      setAgreed(false);
      toast.success("Student found!");
    } catch (error) {
      toast.error(error?.data?.message || "Student not found or refund process is not active");
      setStudentData(null);
    }
  };

  const handleSubmit = async () => {
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

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      APPROVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return badges[status] || badges.PENDING;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Campus Refund Confirmation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Confirm receipt of your campus refund money
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleCheck}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Board Roll Number
                </label>
                <input
                  type="text"
                  name="boardRoll"
                  value={formData.boardRoll}
                  onChange={handleInputChange}
                  placeholder="Enter your roll number"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleInputChange}
                  placeholder="Enter your registration number"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isChecking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? "Checking..." : "Check Eligibility"}
            </button>
          </form>
        </div>

        {/* Student Details Card */}
        {studentData && (
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Student Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.department.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Roll Number</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.boardRoll}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Registration No</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.registrationNo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Shift</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.shift}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Group</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.group}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Session</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {studentData.student.session}
                </p>
              </div>
              {studentData.refundAmount && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Refund Amount</p>
                  <p className="font-medium text-green-600 dark:text-green-400 text-lg">
                    ৳ {studentData.refundAmount}
                  </p>
                </div>
              )}
            </div>

            {/* Confirmation Section */}
            {!studentData.hasSubmitted ? (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-start mb-4">
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
                  onClick={handleSubmit}
                  disabled={!agreed || isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Confirmation"}
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Confirmation Status
                  </p>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(
                      studentData.confirmation.status
                    )}`}
                  >
                    {studentData.confirmation.status}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    Submitted on:{" "}
                    {new Date(studentData.confirmation.confirmed_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundConfirmation;
