import { useEffect, useState } from "react";
import {
  useCreateStudentClearanceMutation,
  useGetClearanceCategoriesQuery,
  useGetDepartmentsQuery,
  useGetStudentBaseClearanceQuery,
} from "../../api/apiSlice";

const StudentClearanceCard = ({ studentId, instituteId, approvedBy }) => {
  const { data: departmentList } = useGetDepartmentsQuery();
  const { data: clearanceCategory } = useGetClearanceCategoriesQuery();
  const { data: studentBaseClearance } =
    useGetStudentBaseClearanceQuery(studentId);

  const [createStudentClearance] = useCreateStudentClearanceMutation();

  // State to hold category status
  const [categoryStatus, setCategoryStatus] = useState({});

  // Sync the category statuses with fetched data
  useEffect(() => {
    if (studentBaseClearance?.data) {
      const initialStatus = {};
      studentBaseClearance.data.forEach((clearance) => {
        initialStatus[clearance.clearanceCategoryId] = clearance.status; // "APPROVED" or "PENDING"
      });
      setCategoryStatus(initialStatus);
    }
  }, [studentBaseClearance]);

  // Handle checkbox changes (toggle between APPROVED and PENDING)
  const handleCheckboxChange = (categoryId) => {
    setCategoryStatus((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === "APPROVED" ? "PENDING" : "APPROVED",
    }));
  };

  // Save function to send the updated statuses to the backend
  const handleSave = async () => {
    const payload = Object.keys(categoryStatus).map((categoryId) => ({
      student_id: studentId,
      institute_id: instituteId,
      clearanceCategoryId: categoryId,
      status: categoryStatus[categoryId],
      approvedBy,
    }));

    try {
      await createStudentClearance(payload);
      alert("Clearance updated successfully!");
    } catch (error) {
      console.error("Error updating clearance:", error);
      alert("Failed to update clearance.");
    }
  };

  return (
    <div className="w-full mx-5 mt-5 mb-2 rounded-md flex flex-wrap justify-between">
      <div className="w-[49%] relative p-4 bg-white dark:bg-dark-card rounded-md">
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
              ?.map((category) => (
                <div className="flex items-center mb-2" key={category?.id}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    id={`category-${category?.id}`}
                    checked={categoryStatus[category.id] === "APPROVED"}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  <label
                    htmlFor={`category-${category?.id}`}
                    className="text-sm dark:text-dark-heading-color"
                  >
                    {category?.name}
                  </label>
                </div>
              ))}
          </div>
        ))}

        <button
          className="px-5 py-2 rounded-md text-white mt-2 bg-blue-500"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StudentClearanceCard;
