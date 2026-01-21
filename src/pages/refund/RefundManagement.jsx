import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import {
  useBulkApproveDepartmentRefundsMutation,
  useDeleteRefundConfirmationMutation,
  useGetRefundConfirmationsQuery,
  useGetUserQuery,
  useUpdateRefundConfirmationMutation,
} from "../../api/apiSlice";
import { CardHeader } from "../../components/CardHeader";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";

const RefundManagement = () => {
  const { data: confirmations, isLoading, refetch } = useGetRefundConfirmationsQuery();
  const { data: userData } = useGetUserQuery();
  const [updateConfirmation] = useUpdateRefundConfirmationMutation();
  const [deleteConfirmation] = useDeleteRefundConfirmationMutation();
  const [bulkApproveRefunds, { isLoading: isApprovingBulk }] =
    useBulkApproveDepartmentRefundsMutation();

  const isSuperAdmin = userData?.data?.role === "SuperAdmin";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const confirmationsPerPage = 20;

  const handleStatusUpdate = (id, status, studentName) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await updateConfirmation({ id, status }).unwrap();
                toast.success(
                  `Refund confirmation ${status.toLowerCase()} successfully!`
                );
                refetch();
              } catch (error) {
                toast.error(error?.data?.message || "Failed to update status");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title={`${status === "APPROVED" ? "Approve" : "Reject"} Refund Confirmation?`}
            message={`Are you sure you want to ${status.toLowerCase()} the refund confirmation for ${studentName}?`}
            confirmText={status === "APPROVED" ? "Approve" : "Reject"}
            confirmColor={status === "APPROVED" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  const handleDelete = (id, studentName) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteConfirmation(id).unwrap();
                toast.success("Refund confirmation deleted successfully!");
                refetch();
              } catch (error) {
                toast.error(error?.data?.message || "Failed to delete confirmation");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Delete Refund Confirmation?"
            message={`Are you sure you want to delete the refund confirmation for ${studentName}? The student will be able to submit again.`}
            confirmText="Delete"
            confirmColor="bg-red-500 hover:bg-red-600"
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  const handleBulkApproveRefunds = () => {
    const pendingCount = filteredConfirmations.filter(
      (c) => c.status === "PENDING"
    ).length;

    if (pendingCount === 0) {
      toast.error("No pending refund confirmations to approve");
      return;
    }

    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                const result = await bulkApproveRefunds().unwrap();
                toast.success(result.message);
                refetch();
              } catch (error) {
                toast.error(error?.data?.message || "Failed to approve refunds");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Approve All Department Refunds?"
            message={`Are you sure you want to approve ALL ${pendingCount} pending refund confirmations in your department?`}
            confirmText="Approve All"
            confirmColor="bg-green-500 hover:bg-green-600"
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      APPROVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return badges[status] || badges.PENDING;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredConfirmations = confirmations?.data?.filter((confirmation) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      confirmation.student.name.toLowerCase().includes(searchLower) ||
      confirmation.student.boardRoll.toLowerCase().includes(searchLower) ||
      confirmation.student.registrationNo.toLowerCase().includes(searchLower)
    );
  }) || [];

  const paginatedConfirmations = filteredConfirmations.slice(
    (currentPage - 1) * confirmationsPerPage,
    currentPage * confirmationsPerPage
  );

  const totalPages = Math.ceil(filteredConfirmations.length / confirmationsPerPage);

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
    <CardWrapper>
      <CardHeader title="Refund Confirmation" />

      <div className="px-6 py-3">
        {/* Search and Bulk Actions */}
        <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
          <input
            type="text"
            placeholder="Search by name, roll, or registration..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-dark-bg dark:text-white"
          />
          
          {/* Bulk Approve Button (SuperAdmin Only) */}
          {isSuperAdmin && (
            <button
              onClick={handleBulkApproveRefunds}
              disabled={isApprovingBulk}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {isApprovingBulk ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Approving...
                </>
              ) : (
                <>
                  <AiOutlineCheck size={16} />
                  Approve All Refunds
                </>
              )}
            </button>
          )}
        </div>

        {filteredConfirmations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No refund confirmations found
            </p>
          </div>
        ) : (
          <>
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
                  {paginatedConfirmations.map((confirmation, index) => (
                    <tr
                      key={confirmation.id}
                      className="hover:bg-gray-50 dark:hover:bg-dark-box"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {(currentPage - 1) * confirmationsPerPage + index + 1}
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
                        {new Date(confirmation.confirmed_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
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
                          <div className="flex gap-2">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">
                              {confirmation.status === "APPROVED"
                                ? "Approved"
                                : "Rejected"}
                            </span>
                            <button
                              onClick={() =>
                                handleDelete(confirmation.id, confirmation.student.name)
                              }
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                              title="Delete"
                            >
                              <AiOutlineDelete size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </CardWrapper>
  );
};

export default RefundManagement;
