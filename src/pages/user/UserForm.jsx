import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useGetDepartmentsQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../api/apiSlice";

const roles = ["Admin", "SuperAdmin", "User", "Manager"];

const UserForm = ({ selectedUserId, onClose }) => {
  const [updateUser] = useUpdateUserMutation();
  const {
    data: userDetails,
    isLoading,
    isError,
  } = useGetUserDetailsQuery(selectedUserId);
  const { data: departments } = useGetDepartmentsQuery();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
    department_id: Yup.string().optional(),
  });

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    department_id: "",
  });

  useEffect(() => {
    if (!isLoading && userDetails?.data) {
      setInitialValues({
        first_name: userDetails?.data.first_name || "",
        last_name: userDetails?.data.last_name || "",
        email: userDetails?.data.email || "",
        role: userDetails?.data.role || "",
        department_id: userDetails?.data?.department_id || "",
      });
    }
  }, [isLoading, userDetails]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateUser({ id: selectedUserId, ...values }).unwrap();
        toast.success("User updated successfully!");
        onClose();
      } catch (error) {
        toast.error("Failed to update user. Please try again.");
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user details</div>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid gap-6 grid-cols-1 md:grid-cols-2"
    >
      {/* First Name */}
      <div>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          className={`w-full bg-gray-50 border ${
            formik.touched.first_name && formik.errors.first_name
              ? "border-red-500"
              : "border-gray-300"
          } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="First Name"
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
        ) : null}
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          className={`w-full bg-gray-50 border ${
            formik.touched.last_name && formik.errors.last_name
              ? "border-red-500"
              : "border-gray-300"
          } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Last Name"
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
        ) : null}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`w-full bg-gray-50 border ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Role
        </label>
        <select
          name="role"
          id="role"
          className={`w-full bg-gray-50 border ${
            formik.touched.role && formik.errors.role
              ? "border-red-500"
              : "border-gray-300"
          } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Role</option>
          {roles.map((role, idx) => (
            <option key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div className="text-red-500 text-sm">{formik.errors.role}</div>
        ) : null}
      </div>

      {/* department */}
      <div>
        <label
          htmlFor="department_id"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Department
        </label>
        <select
          name="department_id"
          id="department_id"
          className={`w-full bg-gray-50 border ${
            formik.touched.department_id && formik.errors.department_id
              ? "border-red-500"
              : "border-gray-300"
          } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
          value={formik.values.department_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Department</option>
          {departments?.data?.map((department, idx) => (
            <option key={idx} value={department?.id}>
              {department?.name}
            </option>
          ))}
        </select>
        {formik.touched.department_id && formik.errors.department_id ? (
          <div className="text-red-500 text-sm">
            {formik.errors.department_id}
          </div>
        ) : null}
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Update User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
