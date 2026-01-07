import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  useAddStudentsExcelMutation,
  useBulkApproveAllClearancesMutation,
  useBulkDeleteStudentsMutation,
  useBulkSignClearancesMutation,
  useBulkUnsignClearancesMutation,
  useDeleteStudentMutation,
  useGetStudentListQuery,
  useGetUserQuery,
} from "../../api/apiSlice";
import { CardHeader } from "../../components/CardHeader";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";
import Pagination from "../../components/Pagination";
import StudentForm from "./StudentForm";

const StudentCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudentId, setSelectStudentId] = useState(null);
  const [excelFile, setExcelFile] = useState(null); // State to hold the Excel file
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [shiftFilter, setShiftFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const studentsPerPage = 20;

  const { data: studentList, isLoading, isError } = useGetStudentListQuery();
  const { data: userData } = useGetUserQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [bulkDeleteStudents] = useBulkDeleteStudentsMutation();
  const [addStudentExcel] = useAddStudentsExcelMutation();
  const [bulkSignClearances, { isLoading: isSigning }] =
    useBulkSignClearancesMutation();
  const [bulkUnsignClearances, { isLoading: isUnsigning }] =
    useBulkUnsignClearancesMutation();
  const [bulkApproveAllClearances] = useBulkApproveAllClearancesMutation();

  const isSuperAdmin = userData?.data?.role === "SuperAdmin";

  const onClose = () => setIsPopupOpen(false);

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectStudentId(id);
  };

  // Handle individual checkbox selection
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    const currentPageStudentIds =
      paginatedStudents?.map((student) => student.id) || [];
    const allSelected = currentPageStudentIds.every((id) =>
      selectedStudents.includes(id)
    );

    if (allSelected) {
      setSelectedStudents((prev) =>
        prev.filter((id) => !currentPageStudentIds.includes(id))
      );
    } else {
      setSelectedStudents((prev) => [
        ...new Set([...prev, ...currentPageStudentIds]),
      ]);
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteStudent(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Student deleted successfully");
                  }
                });
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

  // Handle bulk sign
  const handleBulkSign = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to sign clearances");
      return;
    }

    if (!userData?.data?.signature) {
      toast.error("Please upload your signature in your profile first");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to sign all approved clearances for ${selectedStudents.length} selected student(s) in ${userData?.data?.department_name} department?`
    );

    if (confirmed) {
      try {
        const result = await bulkSignClearances(selectedStudents).unwrap();
        toast.success(result.message);
        setSelectedStudents([]); // Clear selection
      } catch (error) {
        toast.error(error?.data?.message || "Failed to sign clearances");
      }
    }
  };

  // Handle bulk unsign (remove signatures)
  const handleBulkUnsign = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to remove signatures");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to remove signatures from ${selectedStudents.length} selected student(s) in ${userData?.data?.department_name} department? This will unsign all clearances you have signed.`
    );

    if (confirmed) {
      try {
        const result = await bulkUnsignClearances(selectedStudents).unwrap();
        toast.success(result.message);
        setSelectedStudents([]); // Clear selection
      } catch (error) {
        toast.error(error?.data?.message || "Failed to remove signatures");
      }
    }
  };

  // Handle bulk approve all clearances (SuperAdmin only)
  const handleBulkApproveAll = async () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select students to approve clearances");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to approve ALL clearance categories for ${selectedStudents.length} selected student(s)? This action will mark all clearances as approved.`
    );

    if (confirmed) {
      try {
        const result = await bulkApproveAllClearances(
          selectedStudents
        ).unwrap();
        toast.success(result.message);
        setSelectedStudents([]); // Clear selection
      } catch (error) {
        toast.error(error?.data?.message || "Failed to approve clearances");
      }
    }
  };

  // Handle Excel file selection
  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  // Upload Excel to backend
  const handleUploadExcel = async () => {
    if (!excelFile) {
      toast.error("Please select an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    const userData = {
      name: "studentsfile",
      email: "students@gmail.com",
      file: excelFile, // Pass the file object here
    };

    try {
      const studentsExcel = await addStudentExcel(userData).unwrap();
      toast.success("Excel file uploaded successfully!");
    } catch (error) {
      toast.error("An error occurred while uploading the file.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSessionFilter = (e) => {
    setSessionFilter(e.target.value);
  };

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleShiftFilter = (e) => {
    setShiftFilter(e.target.value);
  };

  const handleGroupFilter = (e) => {
    setGroupFilter(e.target.value);
  };

  const filteredStudents = studentList?.data?.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (sessionFilter ? student.session === sessionFilter : true) &&
      (departmentFilter
        ? student.department?.name === departmentFilter
        : true) &&
      (shiftFilter ? student.shift === shiftFilter : true) &&
      (groupFilter ? student.group === groupFilter : true)
    );
  });

  const paginatedStudents = filteredStudents?.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const currentPageStudentIds =
    paginatedStudents?.map((student) => student.id) || [];
  const allCurrentPageSelected =
    currentPageStudentIds.length > 0 &&
    currentPageStudentIds.every((id) => selectedStudents.includes(id));

  const totalPages = Math.ceil(filteredStudents?.length / studentsPerPage);

  const uniqueSessions = [
    ...new Set(studentList?.data?.map((student) => student.session)),
  ];
  const uniqueDepartments = [
    ...new Set(studentList?.data?.map((student) => student.department?.name)),
  ];
  const uniqueShifts = [
    ...new Set(studentList?.data?.map((student) => student.shift)),
  ];
  const uniqueGroups = [
    ...new Set(studentList?.data?.map((student) => student.group)),
  ];

  let content;

  if (isLoading && isError) return "Loading...";

  if (!isLoading && isError) return "Error";

  if (!isLoading && !isError && studentList)
    content = paginatedStudents?.map((student, index) => (
      <div
        key={student?.id}
        className="w-[1200px] lg:w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[3%]">
          <input
            type="checkbox"
            checked={selectedStudents.includes(student?.id)}
            onChange={() => handleCheckboxChange(student?.id)}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="dark:text-white w-[4%]">
          <h3>{(currentPage - 1) * studentsPerPage + index + 1}</h3>
        </div>

        <div className="dark:text-white w-[14%]">
          <Link to={`/student/profile/${student?.id}`}>
            <h3>{student?.name}</h3>
          </Link>
        </div>

        <div className="dark:text-white w-[9%]">
          <h3>{student?.boardRoll}</h3>
        </div>

        <div className="dark:text-white w-[14%]">
          <h3>{student?.department?.name}</h3>
        </div>
        <div className="dark:text-white w-[9%]">
          <h3>{student?.shift}</h3>
        </div>
        <div className="dark:text-white w-[9%]">
          <h3>{student?.group}</h3>
        </div>
        <div className="dark:text-white w-[5%]">
          <h3>{student?.session}</h3>
        </div>
        <div className="dark:text-white w-[8%]">
          <h3
            className={` border text-center p-1 rounded-md ${
              student?.clearanceStatus == "Success"
                ? " text-white bg-green-500 border-none"
                : "text-white bg-orange-400 border-none"
            } `}
          >
            {student?.clearanceStatus}
          </h3>
        </div>

        <div className="dark:text-white w-[10%]">
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
        <CardHeader title="Student List" handleOpen={handleOpen} />

        {/* Bulk Action Buttons */}
        {selectedStudents.length > 0 && (
          <div className="px-6 py-3 flex gap-3">
            <button
              onClick={handleBulkSign}
              disabled={isSigning || !userData?.data?.signature}
              title={
                !userData?.data?.signature
                  ? "Please upload your signature first"
                  : "Sign approved clearances for your department"
              }
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FiEdit size={20} />
              {isSigning
                ? "Signing..."
                : `Sign Selected (${selectedStudents.length})`}
            </button>

            <button
              onClick={handleBulkUnsign}
              disabled={isUnsigning}
              title="Remove signatures from clearances you have signed"
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <RxCrossCircled size={20} />
              {isUnsigning
                ? "Removing..."
                : `Unsign Selected (${selectedStudents.length})`}
            </button>

            {isSuperAdmin && (
              <button
                onClick={handleBulkApproveAll}
                title="Approve all clearance categories for selected students"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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

            <button
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <AiOutlineDelete size={20} />
              Delete Selected ({selectedStudents.length})
            </button>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="px-6 py-3 flex flex-wrap justify-between items-center gap-3">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="dark:text-white border outline-none dark:border dark:border-none text-gray-900 rounded-lg p-3 dark:bg-gray-700 w-full md:w-auto"
          />
          <div className="flex flex-wrap justify-end gap-3 w-full md:w-auto">
            <select
              value={sessionFilter}
              onChange={handleSessionFilter}
              className="dark:text-white border outline-none dark:border dark:border-none text-gray-900 rounded-lg p-3 pr-8 dark:bg-gray-700 w-full md:w-auto"
            >
              <option value="">All Sessions</option>

              {uniqueSessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
            <select
              value={departmentFilter}
              onChange={handleDepartmentFilter}
              className="dark:text-white border outline-none dark:border dark:border-none text-gray-900 rounded-lg p-3 pl-8 dark:bg-gray-700 w-full md:w-auto"
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <select
              value={shiftFilter}
              onChange={handleShiftFilter}
              className="dark:text-white border outline-none dark:border dark:border-none text-gray-900 rounded-lg p-3 pl-8 dark:bg-gray-700 w-full md:w-auto"
            >
              <option value="">All Shifts</option>
              {uniqueShifts.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
            <select
              value={groupFilter}
              onChange={handleGroupFilter}
              className="dark:text-white border outline-none dark:border dark:border-none text-gray-900 rounded-lg p-3 pl-8 dark:bg-gray-700 w-full md:w-auto"
            >
              <option value="">All Groups</option>
              {uniqueGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CSV Upload Section */}

        <div className="px-6 py-3 overflow-x-auto ">
          {/* header */}
          <div className="w-[1200px] lg:w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[3%]">
              <input
                type="checkbox"
                checked={allCurrentPageSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
            <div className="dark:text-white w-[4%]">
              <h3>SL</h3>
            </div>
            <div className="dark:text-white w-[14%]">
              <h3>Name</h3>
            </div>
            <div className="dark:text-white w-[9%]">
              <h3>Board Roll</h3>
            </div>
            <div className="dark:text-white w-[14%]">
              <h3>Department</h3>
            </div>
            <div className="dark:text-white w-[9%]">
              <h3>Shift</h3>
            </div>
            <div className="dark:text-white w-[9%]">
              <h3>Group</h3>
            </div>
            <div className="dark:text-white w-[5%]">
              <h3>Session</h3>
            </div>
            <div className="dark:text-white w-[8%] text-center">
              <h3>Status</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body */}
          {content}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Add Student
                </h3>
                <div className="flex items-center gap-4 px-6 py-4">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="border rounded p-2 w-[70%] max-w-sm"
                  />
                  <button
                    onClick={handleUploadExcel}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Upload Excel
                  </button>
                </div>
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

export default StudentCard;
