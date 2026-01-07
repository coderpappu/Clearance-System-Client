import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateStudentAccMutation,
  useGetDepartmentsQuery,
  useGetInstituteQuery,
  useGetStudentDetailsQuery,
  useUpdateStudentMutation,
} from "../../api/apiSlice";

const groupList = ["A1", "B1", "A2", "B2"];
const shiftList = ["1st Shift", "2nd Shift"];

const StudentForm = ({ selectedStudentId, onClose }) => {
  const [createStudent] = useCreateStudentAccMutation();
  const { data: institute } = useGetInstituteQuery();
  const { data: departmentList } = useGetDepartmentsQuery();
  const [updateStudent] = useUpdateStudentMutation();

  const {
    data: studentDetails,
    isLoading,
    isError,
  } = useGetStudentDetailsQuery(selectedStudentId);

  const validationSchema = Yup.object({
    name: Yup.string().required("Student name is required"),
    registrationNo: Yup.string().required("Registration number is required"),
    boardRoll: Yup.string().required("Board roll is required"),
    department_id: Yup.string().required("Department is required"),
    shift: Yup.string().required("Shift is required"),
    session: Yup.string().required("Session is required"),
    group: Yup.string(), // Optional
    birthDate: Yup.date(), // Optional
    phoneNumber: Yup.string(), // Optional
    district: Yup.string(), // Optional
    upazila: Yup.string(), // Optional
    mother_name: Yup.string(), // Optional
    father_name: Yup.string(), // Optional
  });

  // Local state for initial values
  const [initialValues, setInitialValues] = useState({
    name: "",
    registrationNo: "",
    boardRoll: "",
    department_id: "",
    shift: "",
    session: "",
    group: "",
    birthDate: "",
    phoneNumber: "",
    district: "",
    upazila: "",
    mother_name: "",
    father_name: "",
  });

  // Update initial values once data is fetched
  useEffect(() => {
    if (!isLoading && studentDetails?.data) {
      setInitialValues({
        name: studentDetails?.data.name || "",
        registrationNo: studentDetails?.data.registrationNo || "",
        boardRoll: studentDetails?.data.boardRoll || "",
        department_id: studentDetails?.data?.department?.id || "",
        shift: studentDetails?.data.shift || "",
        session: studentDetails?.data.session || "",
        group: studentDetails?.data.group || "",
        birthDate: studentDetails?.data.birthDate || "",
        phoneNumber: studentDetails?.data.phoneNumber || "",
        district: studentDetails?.data.district || "",
        upazila: studentDetails?.data.upazila || "",
        mother_name: studentDetails?.data.mother_name || "",
        father_name: studentDetails?.data.father_name || "",
      });
    }
  }, [isLoading, studentDetails]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!selectedStudentId) {
        try {
          await createStudent({
            ...values,
            institute_id: institute?.[0]?.id,
          }).unwrap();
          toast.success("Student registered successfully!");
        } catch (error) {
          toast.error("Failed to register student. Please try again.");
        }
      } else {
        try {
          await updateStudent({
            id: studentDetails?.data?.id,
            ...values,
            institute_id: institute?.[0]?.id,
          }).unwrap();
          toast.success("Student registered successfully!");
        } catch (error) {
          toast.error("Failed to register student. Please try again.");
        }
      }
      onClose();
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="grid gap-6 grid-cols-1 md:grid-cols-2"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Student Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`w-full bg-gray-50 border ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Student Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Mother's Name */}
        <div>
          <label
            htmlFor="mother_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mother's Name
          </label>
          <input
            type="text"
            name="mother_name"
            id="mother_name"
            className={`w-full bg-gray-50 border ${
              formik.touched.mother_name && formik.errors.mother_name
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.mother_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Mother's Name"
          />
          {formik.touched.mother_name && formik.errors.mother_name ? (
            <div className="text-red-500 text-sm">
              {formik.errors.mother_name}
            </div>
          ) : null}
        </div>

        {/* Father's Name */}
        <div>
          <label
            htmlFor="father_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Father's Name
          </label>
          <input
            type="text"
            name="father_name"
            id="father_name"
            className={`w-full bg-gray-50 border ${
              formik.touched.father_name && formik.errors.father_name
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.father_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Father's Name"
          />
          {formik.touched.father_name && formik.errors.father_name ? (
            <div className="text-red-500 text-sm">
              {formik.errors.father_name}
            </div>
          ) : null}
        </div>

        {/* Registration Number */}
        <div>
          <label
            htmlFor="registrationNo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Registration No.
          </label>
          <input
            type="text"
            name="registrationNo"
            id="registrationNo"
            className={`w-full bg-gray-50 border ${
              formik.touched.registrationNo && formik.errors.registrationNo
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.registrationNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Registration Number"
          />
          {formik.touched.registrationNo && formik.errors.registrationNo ? (
            <div className="text-red-500 text-sm">
              {formik.errors.registrationNo}
            </div>
          ) : null}
        </div>
        {/* Board Roll */}
        <div>
          <label
            htmlFor="boardRoll"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Board Roll
          </label>
          <input
            type="text"
            name="boardRoll"
            id="boardRoll"
            className={`w-full bg-gray-50 border ${
              formik.touched.boardRoll && formik.errors.boardRoll
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.boardRoll}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Board Roll"
          />
          {formik.touched.boardRoll && formik.errors.boardRoll ? (
            <div className="text-red-500 text-sm">
              {formik.errors.boardRoll}
            </div>
          ) : null}
        </div>
        {/* Department Dropdown */}
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
              formik.touched.department && formik.errors.department
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
            value={formik.values.department_id} // Incorrect field reference
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Department</option>
            {departmentList?.data?.map((department, idx) => (
              <option key={idx} value={department?.id}>
                {department?.name}
              </option>
            ))}
          </select>

          {formik.touched.department && formik.errors.department ? (
            <div className="text-red-500 text-sm">
              {formik.errors.department}
            </div>
          ) : null}
        </div>

        {/* Group Input */}
        <div>
          <label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Group
          </label>
          <input
            type="text"
            name="group"
            id="group"
            placeholder="Enter group (e.g., A1, B1, A2, B2)"
            className={`w-full bg-gray-50 border ${
              formik.touched.group && formik.errors.group
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700 dark:text-white`}
            value={formik.values.group}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.group && formik.errors.group ? (
            <div className="text-red-500 text-sm">{formik.errors.group}</div>
          ) : null}
        </div>

        {/* Shift Input */}
        <div>
          <label
            htmlFor="shift"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Shift
          </label>
          <input
            type="text"
            name="shift"
            id="shift"
            placeholder="Enter shift (e.g., 1st Shift, 2nd Shift)"
            className={`w-full bg-gray-50 border ${
              formik.touched.shift && formik.errors.shift
                ? "border-red-500"
                : "border-gray-300"
            } text-gray-900 rounded-lg p-3 dark:bg-gray-700 dark:text-white`}
            value={formik.values.shift}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.shift && formik.errors.shift ? (
            <div className="text-red-500 text-sm">{formik.errors.shift}</div>
          ) : null}
        </div>
        {/* Remaining Fields */}
        {[
          { id: "session", label: "Session" },

          { id: "birthDate", label: "Birth Date", type: "date" },
          { id: "phoneNumber", label: "Phone Number" },
          { id: "district", label: "District" },
          { id: "upazila", label: "Upazila" },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.id}
              id={field.id}
              className={`w-full bg-gray-50 border ${
                formik.touched[field.id] && formik.errors[field.id]
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values[field.id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field.label}
            />
            {formik.touched[field.id] && formik.errors[field.id] ? (
              <div className="text-red-500 text-sm">
                {formik.errors[field.id]}
              </div>
            ) : null}
          </div>
        ))}

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            {selectedStudentId ? "Update Student" : "Register Student"}
          </button>
        </div>
      </form>
    </>
  );
};

export default StudentForm;
