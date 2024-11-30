import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  useDeleteStudentMutation,
  useGetStudentListQuery,
} from "../../api/apiSlice";
import { CardHeader } from "../../components/CardHeader";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";
import StudentForm from "./StudentForm";

// import ConfirmDialog from "../../../helpers/ConfirmDialog";
// import FormSkeleton from "../../../skeletons/FormSkeleton";
// import ErrorMessage from "../../../utils/ErrorMessage";

const StudentCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedStudentId, setSelectStudentId] = useState(null);

  const { data: studentList, isLoading, isError } = useGetStudentListQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const onClose = () => {
    setIsPopupOpen(false);
  };

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
                toast.error(error.message || "Failed to delete department");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Department"
          />
        ),
        {
          duration: Infinity,
        }
      );

    confirm();
  };

  let content;

  if (isLoading && isError) return "Loading...";

  if (!isLoading && isError) return "Error";

  if (!isLoading && !isError && studentList)
    content = studentList?.data?.map((student, index) => (
      <div
        key={student?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[5%]">
          <h3>{++index}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <Link to={`/student/profile/${student?.id}`}>
            <h3>{student?.name}</h3>
          </Link>
        </div>

        <div className="dark:text-white w-[15%]">
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
        <div className="dark:text-white w-[10%]">
          <h3>{student?.session}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit
                size={20}
                className="text-white"
                onClick={() => handleOpen(student?.id)}
              />
            </div>

            {/* delete button  */}
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

        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[5%]">
              <h3>SL</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Name </h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Board Roll </h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Department </h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Shift </h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Group </h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Session </h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Add Student
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
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
