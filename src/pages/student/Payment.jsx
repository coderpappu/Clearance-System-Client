import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import {
  useDeleteDuePaymentMutation,
  useGetDuePaymentListByStudentQuery,
} from "../../api/apiSlice";
import ConfirmDialog from "../../components/ConfirmDialog";
import ErrorMessage from "../../utils/ErrorMessage";
import DuePaymentForm from "./DuePaymentForm";
const Payment = ({ studentId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectId] = useState(null);

  const {
    data: dueList,
    isLoading,
    isError,
    error,
  } = useGetDuePaymentListByStudentQuery(studentId);

  const [deleteDuePayment] = useDeleteDuePaymentMutation();

  const onClose = () => setIsPopupOpen(false);

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const handleDeleteUser = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteDuePayment(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Due payment deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete due payment");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="User"
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  let content;

  if (isLoading && !isError) return "Loading...";

  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isError && !isLoading && dueList)
    content = dueList?.data?.map((duePay) => (
      <>
        <div className="w-full dark:text-dark-text-color px-5 py-2 bg-slate-100 dark:bg-dark-box rounded-sm flex flex-wrap justify-between items-center mb-2">
          <div className="w-[40%]">
            <h2 className="mb-2 font-medium">{duePay?.department?.name}</h2>
            <h2>{duePay?.clearanceCategory?.name}</h2>
          </div>

          <div className="w-[10%]">
            <h2>{duePay?.amount}</h2>
          </div>

          <div className="w-[10%]">
            <h2>{duePay?.status}</h2>
          </div>

          <div className="w-[15%] flex flex-wrap justify-start gap-2">
            {/* edit button */}
            <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit
                size={20}
                className="text-white"
                onClick={() => handleOpen(duePay?.id)}
              />
            </div>

            {/* delete button */}
            <div
              className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer text-white"
              onClick={() => handleDeleteUser(duePay?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </>
    ));

  return (
    <div className="w-full  mt-2 mb-2 rounded-md flex flex-wrap justify-between">
      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        {/* header level  */}
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
            Due Payment
          </h1>

          <div
            className="w-8 h-8 bg-green-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
            onClick={() => handleOpen()}
          >
            <IoAdd color="#fff" />
          </div>
        </div>

        {/* due payment list  */}
        <div className="">{content}</div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Add Due Payment
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <RxCrossCircled fontSize={20} />
                </button>
              </div>
              <div className="mt-4">
                <DuePaymentForm
                  selectedId={selectedId}
                  studentId={studentId}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
