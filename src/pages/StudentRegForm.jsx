import { useFormik } from "formik";
import * as Yup from "yup";

const StudentRegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      studentName: "",
      registrationNo: "",
      boardRoll: "",
      shift: "",
      session: "",
      group: "",
      birthDate: "",
      phoneNumber: "",
      district: "",
      upazila: "",
      department: "",
    },
    validationSchema: Yup.object({
      studentName: Yup.string().required("Student name is required"),
      registrationNo: Yup.string().required("Registration number is required"),
      boardRoll: Yup.string().required("Board roll is required"),
      shift: Yup.string().required("Shift is required"),
      session: Yup.string().required("Session is required"),
      group: Yup.string().required("Group is required"),
      birthDate: Yup.string().required("Birthdate is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      district: Yup.string().required("District is required"),
      upazila: Yup.string().required("Upazila is required"),
      department: Yup.string().required("Department is required"),
    }),
    onSubmit: (values) => {},
  });

  const departments = ["HR", "Finance", "IT", "Marketing"]; // Sample data
  const groups = ["A", "B", "C", "D"]; // Sample data
  const shifts = ["Morning", "Evening", "Night"]; // Sample data
  const sessions = ["2024", "2023", "2022"]; // Sample data

  return (
    <div className="max-w-6xl mx-auto p-6 my-7 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Student Registration Form
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Name */}
          <div>
            <label
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              id="studentName"
              className={`w-full bg-gray-50 border ${
                formik.touched.studentName && formik.errors.studentName
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.studentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter student name"
            />
            {formik.touched.studentName && formik.errors.studentName && (
              <div className="text-red-500 text-sm">
                {formik.errors.studentName}
              </div>
            )}
          </div>

          {/* Registration Number */}
          <div>
            <label
              htmlFor="registrationNo"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Registration Number
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
              placeholder="Enter registration number"
            />
            {formik.touched.registrationNo && formik.errors.registrationNo && (
              <div className="text-red-500 text-sm">
                {formik.errors.registrationNo}
              </div>
            )}
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
              placeholder="Enter board roll"
            />
            {formik.touched.boardRoll && formik.errors.boardRoll && (
              <div className="text-red-500 text-sm">
                {formik.errors.boardRoll}
              </div>
            )}
          </div>

          {/* Shift */}
          <div>
            <label
              htmlFor="shift"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Shift
            </label>
            <select
              name="shift"
              id="shift"
              className={`w-full bg-gray-50 border ${
                formik.touched.shift && formik.errors.shift
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.shift}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select shift" />
              {shifts.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
            {formik.touched.shift && formik.errors.shift && (
              <div className="text-red-500 text-sm">{formik.errors.shift}</div>
            )}
          </div>

          {/* Session */}
          <div>
            <label
              htmlFor="session"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Session
            </label>
            <select
              name="session"
              id="session"
              className={`w-full bg-gray-50 border ${
                formik.touched.session && formik.errors.session
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.session}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select session" />
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
            {formik.touched.session && formik.errors.session && (
              <div className="text-red-500 text-sm">
                {formik.errors.session}
              </div>
            )}
          </div>

          {/* Group */}
          <div>
            <label
              htmlFor="group"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Group
            </label>
            <select
              name="group"
              id="group"
              className={`w-full bg-gray-50 border ${
                formik.touched.group && formik.errors.group
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.group}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select group" />
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {formik.touched.group && formik.errors.group && (
              <div className="text-red-500 text-sm">{formik.errors.group}</div>
            )}
          </div>

          {/* Birthdate */}
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Birthdate
            </label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              className={`w-full bg-gray-50 border ${
                formik.touched.birthDate && formik.errors.birthDate
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.birthDate && formik.errors.birthDate && (
              <div className="text-red-500 text-sm">
                {formik.errors.birthDate}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className={`w-full bg-gray-50 border ${
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>

          {/* District */}
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              District
            </label>
            <input
              type="text"
              name="district"
              id="district"
              className={`w-full bg-gray-50 border ${
                formik.touched.district && formik.errors.district
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter district"
            />
            {formik.touched.district && formik.errors.district && (
              <div className="text-red-500 text-sm">
                {formik.errors.district}
              </div>
            )}
          </div>

          {/* Upazila */}
          <div>
            <label
              htmlFor="upazila"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Upazila
            </label>
            <input
              type="text"
              name="upazila"
              id="upazila"
              className={`w-full bg-gray-50 border ${
                formik.touched.upazila && formik.errors.upazila
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.upazila}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter upazila"
            />
            {formik.touched.upazila && formik.errors.upazila && (
              <div className="text-red-500 text-sm">
                {formik.errors.upazila}
              </div>
            )}
          </div>

          {/* Department */}
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
              <option value="" label="Select department" />
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {formik.touched.department && formik.errors.department && (
              <div className="text-red-500 text-sm">
                {formik.errors.department}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
