import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useGetDeptByUserDetailsQuery } from "../../api/apiSlice.js";
import getUserDetails from "../../utils/getUserDetails.js";

const DuePaymentForm = () => {
  const { userId } = getUserDetails();
  //   const userId = userDetails ? userDetails.user_id : null;

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    department: Yup.string().required("Department is required"),
    lab: Yup.string().required("Lab is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be a positive number")
      .typeError("Amount must be a number"),
  });

  const { data: user } = useGetDeptByUserDetailsQuery(userId);

  const departments = user ? user?.data?.map((dept) => dept.name) : [];

  const [labs, setLabs] = useState([]);

  return (
    <Formik
      initialValues={{
        department: "",
        lab: "",
        amount: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => {
        useEffect(() => {
          if (user && user.data && user.data.length > 0) {
            const selectedDept = user.data.find(
              (dept) => dept.name === values.department
            );
            if (selectedDept) {
              setLabs(selectedDept.ClearanceCategory.map((cat) => cat.name));
            } else {
              setLabs([]);
            }
          }
        }, [values.department, user]);

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
                name="department"
                id="department"
                className={`w-full bg-gray-50 border ${
                  touched.department && errors.department
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Department</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
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
                htmlFor="lab"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Lab
              </label>
              <select
                name="lab"
                id="lab"
                className={`w-full bg-gray-50 border ${
                  touched.lab && errors.lab
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={values.lab}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Lab</option>
                {labs.map((lab, idx) => (
                  <option key={idx} value={lab}>
                    {lab}
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
