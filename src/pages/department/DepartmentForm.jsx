import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateDepartmentMutation,
  useGetDepartmentDetailsQuery,
  useGetInstituteQuery,
  useUpdateDepartmentMutation,
} from "../../api/apiSlice";

const DepartmentForm = ({ selectedDepartmentId, onClose }) => {
  const { data: getInstitute } = useGetInstituteQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const {
    data: departmentDetails,
    isLoading,
    isError,
  } = useGetDepartmentDetailsQuery(selectedDepartmentId);

  const [updateDepartment] = useUpdateDepartmentMutation();

  const validationSchema = Yup.object({
    department: Yup.string().required("Department name is required"),
  });

  const [initialValues, setInitialValues] = useState({
    department: "",
  });

  useEffect(() => {
    if (!isLoading && departmentDetails) {
      setInitialValues({
        department: departmentDetails?.data?.name || "",
      });
    }
  }, [isLoading, departmentDetails]);

  console.log(departmentDetails);
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!selectedDepartmentId) {
        try {
          await createDepartment({
            ...values,
            institute_id: getInstitute?.[0]?.id,
          }).unwrap();

          toast.success("Successfully created department");
        } catch (error) {
          toast.error(error?.data?.message);
        }
      } else {
        try {
          await updateDepartment({
            id: selectedDepartmentId,
            name: values.department,
          }).unwrap();
        } catch (error) {
          toast.error(error?.data?.message);
        }
      }

      onClose();
    },
  });

  return (
    <>
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
    </>
  );
};

export default DepartmentForm;
