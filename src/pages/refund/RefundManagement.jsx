import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
    useGetRefundConfirmationsQuery,
    useUpdateRefundConfirmationMutation,
} from "../../api/apiSlice";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";

const RefundManagement = () => {
  const { data: confirmations, isLoading } = useGetRefundConfirmationsQuery();
  const [updateConfirmation] = useUpdateRefundConfirmationMutation();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    id: null,
    status: null,
    studentName: "",
  });

  const handleStatusUpdate = (id, status, studentName) => {
    setConfirmDialog({
      isOpen: true,
      id,
      status,
      studentName,
    });
  };

  const confirmStatusUpdate = async () => {
    try {
      await updateConfirmation({
        id: confirmDialog.id,
        status: confirmDialog.status,
      }).unwrap();

      toast.success(
        `Refund confirmation ${confirmDialog.status.toLowerCase()} successfully!`
      );
      setConfirmDialog({ isOpen: false, id: null, status: null, studentName: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
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

  if (isLoading) {
    return (
      <CardWrapper>
        <div className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </CardWrapper>
    );
  }

  return (
    <>
      <CardWrapper>
        <div className="border-b border-gray-200 dark:border-dark-border-color px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Refund Confirmations
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage student refund confirmations
          </p>
        </div>

        <div className="px-6 py-3">
          {confirmations?.data?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No refund confirmations yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-box">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      SL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Roll
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Registration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                  {confirmations?.data?.map((confirmation, index) => (
                    <tr key={confirmation.id} className="hover:bg-gray-50 dark:hover:bg-dark-box">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {confirmation.student.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {confirmation.student.boardRoll}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {confirmation.student.registrationNo}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {confirmation.student.department.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(confirmation.confirmed_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            confirmation.status
                          )}`}
                        >
                          {confirmation.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {confirmation.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  confirmation.id,
                                  "APPROVED",
                                  confirmation.student.name
                                )
                              }
                              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
                              title="Approve"
                            >
                              <AiOutlineCheck size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  confirmation.id,
                                  "REJECTED",
                                  confirmation.student.name
                                )
                              }
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                              title="Reject"
                            >
                              <AiOutlineClose size={16} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500 text-xs">
                            {confirmation.status === "APPROVED" ? "Approved" : "Rejected"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardWrapper>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, id: null, status: null, studentName: "" })
        }
        onConfirm={confirmStatusUpdate}
        title={`${confirmDialog.status === "APPROVED" ? "Approve" : "Reject"} Refund Confirmation`}
        message={`Are you sure you want to ${confirmDialog.status?.toLowerCase()} the refund confirmation for ${
          confirmDialog.studentName
        }?`}
      />
    </>
  );
};

export default RefundManagement;
