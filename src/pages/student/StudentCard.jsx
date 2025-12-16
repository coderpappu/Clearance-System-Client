import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  useAddStudentsCsvMutation,
  useDeleteStudentMutation,
  useGetStudentListQuery,
} from "../../api/apiSlice";
import { CardHeader } from "../../components/CardHeader";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";
import StudentForm from "./StudentForm";

const StudentCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStudentId, setSelectStudentId] = useState(null);
  const [csvFile, setCsvFile] = useState(null); // State to hold the CSV file
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [shiftFilter, setShiftFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  const { data: studentList, isLoading, isError } = useGetStudentListQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [addStudentCsv] = useAddStudentsCsvMutation();

  const onClose = () => setIsPopupOpen(false);

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectStudentId(id);
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
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  // Handle CSV file selection
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Upload CSV to backend
  const handleUploadCSV = async () => {
    if (!csvFile) {
      toast.error("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    const userData = {
      name: "studentsfile",
      email: "students@gmail.com",
      file: csvFile, // Pass the file object here
    };

    try {
      const studentsCSV = await addStudentCsv(userData).unwrap();
      toast.success("CSV uploaded successfully!");
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
        <div className="dark:text-white w-[5%]">
          <h3>{(currentPage - 1) * studentsPerPage + index + 1}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <Link to={`/student/profile/${student?.id}`}>
            <h3>{student?.name}</h3>
          </Link>
        </div>

        <div className="dark:text-white w-[10%]">
          <h3>{student?.boardRoll}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <h3>{student?.department?.name}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{student?.shift}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
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
            <div className="dark:text-white w-[5%]">
              <h3>SL</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Name</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Board Roll</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Department</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Shift</h3>
            </div>
            <div className="dark:text-white w-[10%]">
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
        <div className="flex justify-center items-center py-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

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
                    accept=".csv"
                    onChange={handleFileChange}
                    className="border rounded p-2 w-[70%] max-w-sm"
                  />
                  <button
                    onClick={handleUploadCSV}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Upload CSV
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
