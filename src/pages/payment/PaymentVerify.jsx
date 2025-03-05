import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  useDeleteStuDuePaymentMutation,
  useGetAllDuePaymentListQuery,
  useUpdateDuePaymentMutation,
} from "../../api/apiSlice";
import { CardHeader } from "../../components/CardHeader";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";

const PaymentVerify = () => {
  const {
    data: paymentList,
    isLoading,
    isError,
    refetch,
  } = useGetAllDuePaymentListQuery();

  const [updatePayment] = useUpdateDuePaymentMutation();
  const [deletePayment] = useDeleteStuDuePaymentMutation();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 20;

  const [payments, setPayments] = useState(paymentList?.data || []);

  useEffect(() => {
    if (paymentList) {
      setPayments(paymentList.data);
    }
  }, [paymentList]);

  const handleEdit = async (id, status) => {
    await updatePayment({ id, status });

    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status } : payment
      )
    );
  };

  const handleDelete = (id) => {
    // Handle delete payment
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              await deletePayment(id).unwrap();
              toast.success("Payment deleted successfully");
              refetch();
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Payment"
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPayments = payments.filter((payment) => {
    return payment.student.boardRoll
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * paymentsPerPage,
    currentPage * paymentsPerPage
  );

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const handleOpenPopup = (payment) => {
    setSelectedPayment(payment);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPayment(null);
  };

  const handleStatusChange = (e) => {
    setSelectedPayment({
      ...selectedPayment,
      status: e.target.value,
    });
  };

  return (
    <CardWrapper>
      <CardHeader title="Payment Verify" />
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <p>Loading...</p>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center py-4">
          <p>Error loading payments</p>
        </div>
      ) : (
        <>
          {/* Search Section */}
          <div className="px-6 py-3 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search by student roll"
              value={searchTerm}
              onChange={handleSearch}
              className="dark:text-white border outline-none dark:border dark:border-none text-gray-900 rounded-lg p-3 dark:bg-gray-700"
            />
          </div>

          {/* Payment List */}
          <div className="px-6 py-3 overflow-x-auto">
            <div className="w-[1200px] lg:w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
              <div className="dark:text-white w-[5%]">
                <h3>SL</h3>
              </div>
              <div className="dark:text-white w-[15%]">
                <h3>Student Name</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Roll</h3>
              </div>
              <div className="dark:text-white w-[15%]">
                <h3>Department</h3>
              </div>
              <div className="dark:text-white w-[5%]">
                <h3>Amount</h3>
              </div>
              <div className="dark:text-white w-[15%]">
                <h3>Transaction ID</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Transaction Number</h3>
              </div>
              <div className="dark:text-white w-[8%] text-center">
                <h3>Status</h3>
              </div>
              <div className="dark:text-white w-[5%]">
                <h3>Actions</h3>
              </div>
            </div>

            {paginatedPayments.map((payment, index) => (
              <div
                key={payment.id}
                className="w-[1200px] lg:w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
              >
                <div className="dark:text-white w-[5%]">
                  <h3>{(currentPage - 1) * paymentsPerPage + index + 1}</h3>
                </div>
                <div className="dark:text-white w-[15%]">
                  <Link to={`/student/profile/${payment.student.id}`}>
                    <h3>{payment.student.name}</h3>
                  </Link>
                </div>
                <div className="dark:text-white w-[10%]">
                  <h3>{payment.student.boardRoll}</h3>
                </div>
                <div className="dark:text-white w-[15%]">
                  <h3>{payment.student.department.name}</h3>
                </div>
                <div className="dark:text-white w-[5%]">
                  <h3>{payment.due_amount}</h3>
                </div>
                <div className="dark:text-white w-[15%]">
                  <h3>{payment.transaction_id}</h3>
                </div>
                <div className="dark:text-white w-[10%]">
                  <h3>{payment.transaction_number}</h3>
                </div>
                <div className="dark:text-white w-[8%]">
                  <h3
                    className={`border text-center p-1 rounded-md ${
                      payment.status === "APPROVED"
                        ? "text-white bg-green-500 border-none"
                        : payment.status === "PENDING"
                        ? "text-white bg-orange-400 border-none"
                        : "text-white bg-red-500 border-none"
                    }`}
                  >
                    {payment.status}
                  </h3>
                </div>
                <div className="dark:text-white w-[5%]">
                  <div className="flex flex-wrap justify-start gap-2">
                    <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                      <CiEdit
                        size={20}
                        className="text-white"
                        onClick={() => handleOpenPopup(payment)}
                      />
                    </div>
                    <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer text-white">
                      <AiOutlineDelete
                        size={20}
                        onClick={() => handleDelete(payment.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

          {isPopupOpen && selectedPayment && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Edit Payment
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={handleClosePopup}
                  >
                    <RxCrossCircled fontSize={20} />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap justify-between">
                    <div>
                      <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Student Name: {selectedPayment.student.name}
                      </p>
                      <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Roll: {selectedPayment.student.boardRoll}
                      </p>
                      <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Department: {selectedPayment.student.department.name}
                      </p>
                      <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Amount: {selectedPayment.due_amount}
                      </p>
                      <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Transaction ID: {selectedPayment.transaction_id}
                      </p>
                      <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                        Transaction Number: {selectedPayment.transaction_number}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-gray-700 dark:text-white">
                        Status
                      </label>
                      <select
                        value={selectedPayment.status}
                        onChange={handleStatusChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                      >
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() =>
                        handleEdit(selectedPayment.id, selectedPayment.status)
                      }
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </CardWrapper>
  );
};

export default PaymentVerify;
