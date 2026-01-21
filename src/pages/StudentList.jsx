import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
    useBulkApproveAllClearancesMutation,
    useBulkApproveDepartmentClearancesMutation,
    useBulkDeleteStudentsMutation,
    useDeleteStudentMutation,
    useGetStudentListQuery,
    usePrincipalBulkSignMutation,
} from "../api/apiSlice";
import { CardHeader } from "../components/CardHeader";
import CardWrapper from "../components/CardWrapper";
import ConfirmDialog from "../components/ConfirmDialog";
import { config } from "../utils/config";
import getUserDetails from "../utils/getUserDetails";
import StudentForm from "./student/StudentForm";

const StudentList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const currentUser = getUserDetails();
  const isSuperAdmin = currentUser?.role === "SuperAdmin";
  const isPrincipal = currentUser?.role === "Principal";

  const { data: studentList, isLoading, isError } = useGetStudentListQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [bulkDeleteStudents] = useBulkDeleteStudentsMutation();
  const [bulkApproveAllClearances] = useBulkApproveAllClearancesMutation();
  const [bulkApproveDepartmentClearances] =
    useBulkApproveDepartmentClearancesMutation();
  const [principalBulkSign] = usePrincipalBulkSignMutation();

  const onClose = () => setIsPopupOpen(false);

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectedStudentId(id);
  };

  // Handle individual checkbox selection
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) => {
      // If trying to add a student
      if (!prev.includes(studentId)) {
        // Check if already at 20 limit
        if (prev.length >= 20) {
          toast.error("Cannot select more than 20 students at a time");
          return prev;
        }
        return [...prev, studentId];
      }
      // Removing a student
      return prev.filter((id) => id !== studentId);
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedStudents.length === studentList?.data?.length) {
      setSelectedStudents([]);
    } else {
      const allStudentIds = studentList?.data?.map((student) => student.id) || [];
      
      // Check if total students exceed 20 limit
      if (allStudentIds.length > 20) {
        toast.error(
          `Cannot select all ${allStudentIds.length} students. Maximum 20 students can be selected at a time. Please select manually or use department-wide approval.`
        );
        // Select only first 20
        setSelectedStudents(allStudentIds.slice(0, 20));
      } else {
        setSelectedStudents(allStudentIds);
      }
    }
  };

  // Handle single student delete
  const handleDeleteStudent = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                const res = await deleteStudent(id);
                if (res.error != null) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success("Student deleted successfully");
                }
              } catch (error) {
                toast.error(error.message || "Failed to delete student");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Student"
            message="⚠️ Warning: Deleting this student will permanently remove all related data including clearances, dues, and payment records. This action cannot be undone."
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to delete");
      return;
    }

    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                const res = await bulkDeleteStudents(selectedStudents);
                if (res.error != null) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success(
                    `${selectedStudents.length} student(s) deleted successfully`
                  );
                  setSelectedStudents([]);
                }
              } catch (error) {
                toast.error(error.message || "Failed to delete students");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title={`${selectedStudents.length} Student(s)`}
            message={`⚠️ Warning: Deleting ${selectedStudents.length} student(s) will permanently remove all their related data including clearances, dues, and payment records. This action cannot be undone.`}
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  // Handle bulk approve all clearances (SuperAdmin only)
  const handleBulkApproveAll = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to approve clearances");
      return;
    }

    if (selectedStudents.length > 20) {
      toast.error(
        "Cannot approve more than 20 students at once. Please select fewer students."
      );
      return;
    }

    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                const res = await bulkApproveAllClearances(selectedStudents);
                if (res.error != null) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success(
                    res.data?.message ||
                      `All clearances approved for ${selectedStudents.length} student(s)`
                  );
                  setSelectedStudents([]);
                }
              } catch (error) {
                toast.error(error.message || "Failed to approve clearances");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title={`Approve Clearances for ${selectedStudents.length} Student(s)`}
            message={`This will approve ALL clearance categories for ${selectedStudents.length} selected student(s). Are you sure you want to proceed?`}
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  // Handle department-wide clearance approval (SuperAdmin only - all department students)
  const handleDepartmentWideApproval = async () => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                const res = await bulkApproveDepartmentClearances();
                if (res.error != null) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success(
                    res.data?.message ||
                      "Department-wide clearances approved successfully"
                  );
                }
              } catch (error) {
                toast.error(
                  error.message ||
                    "Failed to approve department-wide clearances"
                );
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Approve All Department Clearances"
            message={`⚠️ This will approve ALL clearance categories for ALL students in your department. This action cannot be undone easily. Are you sure you want to proceed?`}
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  // Handle principal bulk sign
  const handlePrincipalBulkSign = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to sign");
      return;
    }

    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                const res = await principalBulkSign(selectedStudents);
                if (res.error != null) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success(
                    res.data?.message ||
                      `Principal signature added to ${selectedStudents.length} student(s)`
                  );
                  setSelectedStudents([]);
                }
              } catch (error) {
                toast.error(error.message || "Failed to sign as principal");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title={`Sign as Principal for ${selectedStudents.length} Student(s)`}
            message={`This will add your Principal signature to ${selectedStudents.length} selected student(s). Are you sure?`}
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  // Handle bulk download department reports (SuperAdmin only)
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBulkDownloadReports = async () => {
    try {
      setIsDownloading(true);
      
      const response = await fetch(
        `${config.apiBaseUrl}/clearance/department/bulk-reports/pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to download reports");
      }

      // Get blob from response
      const blob = await response.blob();

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "Department_Clearance_Reports.pdf";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Reports downloaded successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to download reports");
    } finally {
      setIsDownloading(false);
    }
  };

  let content;

  if (isLoading && isError) return "Loading...";
  if (!isLoading && isError) return "Error";

  if (!isLoading && !isError && studentList)
    content = studentList?.data?.map((student, index) => (
      <div
        key={student?.id}
        className="w-[1200px] lg:w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[5%]">
          <input
            type="checkbox"
            checked={selectedStudents.includes(student?.id)}
            onChange={() => handleCheckboxChange(student?.id)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="dark:text-white w-[5%]">
          <h3>{++index}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <Link to={`/student/profile/${student?.id}`}>
            <h3>{student?.name}</h3>
          </Link>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.registrationNo}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.boardRoll}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.shift}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.session}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.group}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.phoneNumber}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button */}
            <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit
                size={20}
                className="text-white"
                onClick={() => handleOpen(student?.id)}
              />
            </div>

            {/* delete button */}
            <div
              className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer text-white"
              onClick={() => handleDeleteStudent(student?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <CardWrapper>
        <CardHeader title="Student Lis" handleOpen={handleOpen} />

        {/* Bulk Action Buttons - When students ARE selected (1-20) */}
        {selectedStudents.length > 0 && (
          <div className="px-6 py-3 flex gap-3">
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <AiOutlineDelete size={20} />
              Delete Selected ({selectedStudents.length})
            </button>

            {isSuperAdmin && (
              <button
                onClick={handleBulkApproveAll}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Give Full Clearance ({selectedStudents.length})
              </button>
            )}

            {isPrincipal && (
              <button
                onClick={handlePrincipalBulkSign}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign as Principal ({selectedStudents.length})
              </button>
            )}
          </div>
        )}

        {/* Department-Wide Approval - When NO students selected (SuperAdmin only) */}
        {isSuperAdmin && selectedStudents.length === 0 && (
          <div className="px-6 py-3 flex gap-3">
            <button
              onClick={handleDepartmentWideApproval}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Give Full Department Clearance
            </button>

            <button
              onClick={handleBulkDownloadReports}
              disabled={isDownloading}
              className={`${
                isDownloading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md`}
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download All Reports (PDF)
                </>
              )}
            </button>
          </div>
        )}

        <div className="px-6 py-3 overflow-x-auto">
          {/* header */}
          <div className="w-[1200px] lg:w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[5%]">
              <input
                type="checkbox"
                checked={
                  studentList?.data?.length > 0 &&
                  selectedStudents.length === studentList?.data?.length
                }
                onChange={handleSelectAll}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
            <div className="dark:text-white w-[5%]">
              <h3>SL</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Name</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Reg. No</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Board Roll</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Shift</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Session</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Group</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Phone</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body */}
          {content}
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {selectedStudentId ? "Edit Student" : "Add Student"}
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <RxCrossCircled fontSize={20} />
                </button>
              </div>
              <div className="mt-4">
                <StudentForm
                  selectedStudentId={selectedStudentId}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </CardWrapper>
    </>
  );
};

export default StudentList;
