import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  useCreateStudentClearanceMutation,
  useGetClearanceCategoriesQuery,
  useGetDepartmentsQuery,
  useGetStudentBaseClearanceQuery,
  useGetUserDetailsQuery,
} from "../../api/apiSlice";
import { config } from "../../utils/config";

const StudentClearanceCard = ({ studentId, instituteId }) => {
  const token = localStorage.getItem("token");

  const decodedToken = jwtDecode(token);
  const id = decodedToken?.userId;

  const { data: departmentList } = useGetDepartmentsQuery();
  const { data: clearanceCategory } = useGetClearanceCategoriesQuery();
  const { data: studentBaseClearance } =
    useGetStudentBaseClearanceQuery(studentId);
  const [createStudentClearance] = useCreateStudentClearanceMutation();
  const { data: userData } = useGetUserDetailsQuery(id);

  // State to hold category status
  const [categoryStatus, setCategoryStatus] = useState({});

  // Sync the category statuses with fetched data
  useEffect(() => {
    if (studentBaseClearance?.data) {
      const initialStatus = {};
      Object.values(studentBaseClearance.data).forEach((clearances) => {
        clearances.forEach((clearance) => {
          initialStatus[clearance.clearanceCategoryId] = clearance.status; // "APPROVED" or "PENDING"
        });
      });
      setCategoryStatus(initialStatus);
    }
  }, [studentBaseClearance]);

  // Handle checkbox changes (toggle between APPROVED and PENDING)
  const handleCheckboxChange = (categoryId, departmentId) => {
    if (
      (userData?.data?.department_name === departmentId &&
        ["Manager", "Admin"].includes(userData?.data?.role)) ||
      ["SuperAdmin"].includes(userData?.data?.role)
    ) {
      setCategoryStatus((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId] === "APPROVED" ? "PENDING" : "APPROVED",
      }));
    } else {
      toast.error("You are not authorized to change this clearance.");
    }
  };

  // Save function to send the updated statuses to the backend
  const handleSave = async () => {
    const payload = {
      student_id: studentId,
      institute_id: instituteId,
      clearances: Object.keys(categoryStatus)
        .filter((categoryId) => categoryStatus[categoryId] === "APPROVED")
        .map((categoryId) => ({
          clearanceCategoryId: categoryId,
          status: categoryStatus[categoryId],
        })),
    };

    try {
      await createStudentClearance(payload);
      toast.success("Clearance updated successfully!");
    } catch (error) {
      toast.error("Failed to update clearance.");
    }
  };

  return (
    <div className="w-full mt-2 mb-2 rounded-md flex flex-wrap justify-between">
      <div className="w-full md:w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
        <h1 className="text-xl font-medium mb-4 dark:text-dark-heading-color">
          Clearance Form
        </h1>

        {departmentList?.data?.map((dept) => (
          <div key={dept?.id} className="mb-6">
            {/* Department Name */}
            <h2 className="text-lg font-semibold mb-2 dark:text-dark-heading-color">
              {dept?.name}
            </h2>

            {/* Categories for the Department */}
            {clearanceCategory?.data
              ?.filter((category) => category.department_id === dept.id)
              ?.map((category) => {
                // Find the clearance record for this category
                const clearanceRecord =
                  studentBaseClearance?.data?.clearances?.find(
                    (c) => c.clearanceCategoryId === category.id
                  );

                return (
                  <div
                    className="mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                    key={category?.id}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="mr-2"
                        id={`category-${category?.id}`}
                        checked={categoryStatus[category.id] === "APPROVED"}
                        onChange={() =>
                          handleCheckboxChange(category.id, dept.name)
                        }
                        disabled={
                          !(
                            (userData?.data?.department_name === dept.name &&
                              ["Manager", "Admin"].includes(
                                userData?.data?.role
                              )) ||
                            ["SuperAdmin"].includes(userData?.data?.role)
                          )
                        }
                      />
                      <label
                        htmlFor={`category-${category?.id}`}
                        className={`text-sm dark:text-dark-heading-color ${
                          !(
                            (userData?.data?.department_name === dept.name &&
                              ["Manager", "Admin"].includes(
                                userData?.data?.role
                              )) ||
                            ["SuperAdmin"].includes(userData?.data?.role)
                          )
                            ? "text-gray-400"
                            : ""
                        }`}
                      >
                        {category?.name}
                      </label>
                    </div>

                    {/* Display Signature if Approved */}
                    {clearanceRecord?.status === "APPROVED" &&
                      clearanceRecord?.signatureUrl && (
                        <div className="ml-6 mt-2 p-2 bg-white dark:bg-gray-700 rounded border border-green-300 dark:border-green-600">
                          <div className="flex items-center gap-3">
                            <img
                              src={`${config.apiBaseUrl}${clearanceRecord.signatureUrl}`}
                              alt="Signature"
                              className="h-12 border border-gray-300 dark:border-gray-600 rounded px-2 bg-white"
                            />
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                              <p className="font-semibold text-green-600 dark:text-green-400">
                                ✓ Approved
                              </p>
                              {clearanceRecord.signedAt && (
                                <p>
                                  Signed:{" "}
                                  {new Date(
                                    clearanceRecord.signedAt
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="w-full flex gap-3 justify-end mt-4">
        <button
          className="px-5 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StudentClearanceCard;
