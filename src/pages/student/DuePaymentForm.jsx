import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  useCreateDuePaymentMutation,
  useGetDeptByUserDetailsQuery,
  useGetDuePaymentDetailsQuery,
} from "../../api/apiSlice.js";
import getUserDetails from "../../utils/getUserDetails.js";

const DuePaymentForm = ({ selectedId, studentId, onClose }) => {
  const { userId } = getUserDetails();
  const [createDuePayment] = useCreateDuePaymentMutation();

  const { data: duePayment } = useGetDuePaymentDetailsQuery(selectedId);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    department_id: Yup.string().required("Department is required"),
    clearanceCategoryId: Yup.string().required("Lab is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be a positive number")
      .typeError("Amount must be a number"),
  });

  const { data: user } = useGetDeptByUserDetailsQuery(userId);

  const departments = user || [];

  const [labs, setLabs] = useState([]);

  return (
    <Formik
      initialValues={{
        department_id: duePayment?.data?.department_id || "",
        clearanceCategoryId: duePayment?.data?.clearanceCategoryId || "",
        amount: duePayment?.data?.amount || "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await createDuePayment({ ...values, student_id: studentId }).unwrap();
        onClose();
      }}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => {
        useEffect(() => {
          if (user && user.data && user.data.length > 0) {
            const selectedDept = user.data.find(
              (dept) => dept.id === values.department_id
            );

            if (selectedDept) {
              setLabs(selectedDept.ClearanceCategory);
            } else {
              setLabs([]);
            }
          }
        }, [values.department_id, user]);

        return (
          <Form>
            {/* Department Field */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Department
              </label>
              <select
                name="department_id"
                id="department_id"
                className={`w-full bg-gray-50 border ${
                  touched.department && errors.department
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={values.department_id}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Department</option>
                {departments?.data?.map((dept, idx) => (
                  <option key={idx} value={dept?.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {touched.department && errors.department ? (
                <div className="text-red-500 text-sm">{errors.department}</div>
              ) : null}
            </div>

            {/* Lab Field */}
            <div className="mt-4">
              <label
                htmlFor="clearanceCategoryId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Lab
              </label>
              <select
                name="clearanceCategoryId"
                id="clearanceCategoryId"
                className={`w-full bg-gray-50 border ${
                  touched.lab && errors.lab
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={values.clearanceCategoryId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Lab</option>
                {labs.map((lab, idx) => (
                  <option key={idx} value={lab?.id}>
                    {lab?.name}
                  </option>
                ))}
              </select>
              {touched.lab && errors.lab ? (
                <div className="text-red-500 text-sm">{errors.lab}</div>
              ) : null}
            </div>

            {/* Amount Field */}
            <div className="mt-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Amount
              </label>
              <Field
                type="text"
                name="amount"
                id="amount"
                className={`w-full bg-gray-50 border ${
                  touched.amount && errors.amount
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                placeholder="Enter amount"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DuePaymentForm;
