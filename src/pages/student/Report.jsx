import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetStudentBaseClearanceQuery,
  useGetStudentDetailsQuery,
} from "../../api/apiSlice";

const ClearanceForm = () => {
  const { id } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data: studentBaseClearance,
    isLoading: isBaseClearanceLoading,
    isError: isBaseClearanceError,
  } = useGetStudentBaseClearanceQuery(id);

  const {
    data: studentDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useGetStudentDetailsQuery(id);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Fetch PDF from backend
      const response = await fetch(
        `http://localhost:3000/api/clearance/student/${id}/report/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Generate filename: StudentName_Department_Date.pdf
      const date = new Date().toISOString().split("T")[0];
      const studentName =
        studentDetails?.data?.name?.replace(/\s+/g, "_") || "Student";
      const departmentName =
        studentDetails?.data?.department?.name?.replace(/\s+/g, "_") ||
        "Department";
      a.download = `${studentName}_${departmentName}_${date}.pdf`;

      // Trigger download
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Split the departments into two groups for two columns
  const departmentEntries = Object.entries(studentBaseClearance?.data || {});
  const half = Math.ceil(departmentEntries.length / 2);
  const firstHalf = departmentEntries.slice(0, half);
  const secondHalf = departmentEntries.slice(half);

  if (isBaseClearanceLoading || isDetailsLoading) {
    return (
      <div className="w-[85%] mx-auto p-4 text-center">
        <p>Loading clearance report...</p>
      </div>
    );
  }

  if (isBaseClearanceError || isDetailsError) {
    return (
      <div className="w-[85%] mx-auto p-4 text-center text-red-500">
        <p>Error loading clearance report. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-[85%] mx-auto p-4">
      {/* Download Button - Only show when status is Success */}
      {studentDetails?.data?.status === "Success" && (
        <button
          onClick={handleDownloadPDF}
          className="mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDownloading}
        >
          {isDownloading ? "Generating PDF..." : "Download Clearance Report"}
        </button>
      )}

      {/* Preview Section */}
      <div className="w-full mx-auto py-10 px-20 border border-gray-300 rounded-lg bg-white">
        {/* Header */}
        <header className="text-center mb-8">
          <h3 className="text-lg">People Republic of Bangladesh</h3>
          <h3 className="font-semibold text-base">Principal Office</h3>
          <h1 className="text-2xl font-bold">
            Chattogram Polytechnic Institute
          </h1>
          <h4>Nasirabad, Chattogram</h4>
          <p className="text-md my-2 font-bold underline">
            Student Clearance Form
          </p>
        </header>

        {/* Student Information */}
        <div className="text-base mb-6">
          <p className="mb-2">
            <strong>Name:</strong> {studentDetails?.data?.name}
          </p>
          <p className="mb-2">
            <strong>Father's Name:</strong> {studentDetails?.data?.father_name}
          </p>
          <p className="mb-2">
            <strong>Mother's Name:</strong> {studentDetails?.data?.mother_name}
          </p>
          <p className="mb-2">
            <strong>Roll Number:</strong> {studentDetails?.data?.boardRoll}
          </p>
          <p className="mb-2">
            <strong>Registration Number:</strong>{" "}
            {studentDetails?.data?.registrationNo}
          </p>
          <p className="mb-2">
            <strong>Shift:</strong> {studentDetails?.data?.shift}
          </p>
          <p className="mb-2">
            <strong>Department:</strong>{" "}
            {studentDetails?.data?.department?.name}
          </p>
          <p className="mb-2">
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                studentDetails?.data?.status === "Success"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {studentDetails?.data?.status}
            </span>
          </p>
        </div>

        {/* Clearance Summary */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Clearance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departmentEntries.map(([departmentName, clearances]) => (
              <div
                key={departmentName}
                className="border border-gray-300 rounded p-3"
              >
                <h4 className="font-semibold mb-2">{departmentName}</h4>
                <ul className="list-disc list-inside text-sm">
                  {clearances.map((clearance) => (
                    <li
                      key={clearance.id}
                      className={
                        clearance.status === "APPROVED"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {clearance.clearanceCategory.name} -{" "}
                      {clearance.status === "APPROVED" ? "✓" : "✗"}
                      {clearance.signatureUrl && " (Signed)"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> The PDF report will be generated with all
            clearance details, signatures, and official formatting. Click the
            "Download Clearance Report" button above to get the official PDF
            document.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClearanceForm;
