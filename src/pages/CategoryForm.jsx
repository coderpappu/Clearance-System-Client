import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const ClearanceCategoryForm = () => {
  // Example departments array (could be fetched from an API)
  const departments = [
    { id: 1, name: "Computer Department" },
    { id: 2, name: "Electrical Department" },
    { id: 3, name: "Mechanical Department" },
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    department: Yup.string().required("Department is required"),
    clearanceCategory: Yup.string().required("Clearance category is required"),
  });

  const formik = useFormik({
    initialValues: {
      department: "",
      clearanceCategory: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Add Clearance Category
        </h2>
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
              name="department"
              id="department"
              className={`w-full bg-gray-50 border ${
                formik.touched.department && formik.errors.department
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select a department" />
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {formik.touched.department && formik.errors.department ? (
              <div className="text-red-500 text-sm">
                {formik.errors.department}
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
      </div>
    </div>
  );
};

export default ClearanceCategoryForm;
