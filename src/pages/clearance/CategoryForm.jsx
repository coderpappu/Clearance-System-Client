import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateClearanceCategoryMutation,
  useGetClearanceCategoryDetailsQuery,
  useGetDepartmentsQuery,
  useGetInstituteQuery,
  useUpdateClearanceCategoryMutation,
} from "../../api/apiSlice";

const ClearanceCategoryForm = ({ selectedCategoryId, onClose }) => {
  const [createClearance] = useCreateClearanceCategoryMutation();
  const { data: instituteData } = useGetInstituteQuery();
  const { data: departmentList } = useGetDepartmentsQuery();
  const { data: categoryDetails, isLoading: isCategoryLoading } =
    useGetClearanceCategoryDetailsQuery(selectedCategoryId);
  const [updateClearanceCategory] = useUpdateClearanceCategoryMutation();

  // State for initial values
  const [initialValues, setInitialValues] = useState({
    department_id: "",
    clearanceCategory: "",
  });

  useEffect(() => {
    if (!isCategoryLoading && categoryDetails) {
      setInitialValues({
        department_id: categoryDetails?.data?.department?.id || "",
        clearanceCategory: categoryDetails?.data?.name || "",
      });
    }
  }, [isCategoryLoading, categoryDetails]);

  // Form validation schema
  const validationSchema = Yup.object({
    department_id: Yup.string().required("Department is required"),
    clearanceCategory: Yup.string().required("Clearance category is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedCategoryId) {
        try {
          await createClearance({
            ...values,
            institute_id: instituteData?.[0]?.id,
          }).unwrap();
          toast.success("Clearance category created successfully");
        } catch (error) {
          toast.error(error?.data?.message);
        }
      } else {
        try {
          await updateClearanceCategory({
            id: selectedCategoryId,
            ...values,
            institute_id: instituteData?.[0]?.id,
          }).unwrap();
          toast.success("Clearance category updated successfully");
        } catch (error) {
          toast.error(error?.data?.message);
        }
      }
      onClose();
    },
  });

  if (isCategoryLoading) {
    return <div>Loading...</div>; // Show loading state while fetching category details
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Department Dropdown */}
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Department
          </label>
          <select
            name="department_id"
            id="department"
            className={`w-full bg-gray-50 border ${
              formik.touched.department_id && formik.errors.department_id
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.department_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select a department" />
            {departmentList?.data?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {formik.touched.department_id && formik.errors.department_id ? (
            <div className="text-red-500 text-sm">
              {formik.errors.department_id}
            </div>
          ) : null}
        </div>

        {/* Clearance Category Field */}
        <div>
          <label
            htmlFor="clearanceCategory"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Clearance Category
          </label>
          <input
            type="text"
            name="clearanceCategory"
            id="clearanceCategory"
            className={`w-full bg-gray-50 border ${
              formik.touched.clearanceCategory &&
              formik.errors.clearanceCategory
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            placeholder="e.g., Computer Lab 1"
            value={formik.values.clearanceCategory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.clearanceCategory &&
          formik.errors.clearanceCategory ? (
            <div className="text-red-500 text-sm">
              {formik.errors.clearanceCategory}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Add Clearance Category
        </button>
      </form>
    </>
  );
};

export default ClearanceCategoryForm;
