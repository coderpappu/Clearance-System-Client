import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateDepartmentMutation,
  useGetInstituteQuery,
} from "../api/apiSlice";

const DepartmentForm = () => {
  const { data: getInstitute } = useGetInstituteQuery();
  const [createDepartment] = useCreateDepartmentMutation();

  const validationSchema = Yup.object({
    department: Yup.string().required("Department name is required"),
  });

  const initialValues = {
    department: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createDepartment({
          ...values,
          institute_id: getInstitute?.[0]?.id,
        }).unwrap();

        toast.success("Successfully created department");
      } catch (error) {
        toast.error("Failed to create department");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Add Department
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Department Field */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Department
            </label>
            <input
              type="text"
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
              placeholder="Enter Department Name"
            />
            {formik.touched.department && formik.errors.department ? (
              <div className="text-red-500 text-sm">
                {formik.errors.department}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
