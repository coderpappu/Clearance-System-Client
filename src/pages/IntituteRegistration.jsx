import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useCreateInstituteMutation } from "../api/apiSlice";
const InstituteRegistrationForm = () => {
  const [createInstitute] = useCreateInstituteMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Institute name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    district: Yup.string().required("District is required"),
    postCode: Yup.string().required("Postcode is required"),
    postOffice: Yup.string().required("Post office is required"),
    country: Yup.string().required("Country is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    postCode: "",
    postOffice: "",
    country: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      try {
        await createInstitute(values).unwrap();
        toast.success("Institute registered successfully!");
      } catch (error) {
        toast.error("Failed to register Institute. Please try again.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg dark:bg-gray-800 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Register Institute
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid gap-6 grid-cols-1 md:grid-cols-2"
        >
          {/* Name Field */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Institute Name
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
              placeholder="Institute Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Email Field */}
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

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={`w-full bg-gray-50 border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>

          {/* Address Field */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className={`w-full bg-gray-50 border ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Address"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            ) : null}
          </div>

          {/* District Field */}
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
              placeholder="District"
            />
            {formik.touched.district && formik.errors.district ? (
              <div className="text-red-500 text-sm">
                {formik.errors.district}
              </div>
            ) : null}
          </div>

          {/* Postcode Field */}
          <div>
            <label
              htmlFor="postCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Postcode
            </label>
            <input
              type="text"
              name="postCode"
              id="postCode"
              className={`w-full bg-gray-50 border ${
                formik.touched.postCode && formik.errors.postCode
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.postCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Postcode"
            />
            {formik.touched.postCode && formik.errors.postCode ? (
              <div className="text-red-500 text-sm">
                {formik.errors.postCode}
              </div>
            ) : null}
          </div>

          {/* Post Office Field */}
          <div>
            <label
              htmlFor="postOffice"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Post Office
            </label>
            <input
              type="text"
              name="postOffice"
              id="postOffice"
              className={`w-full bg-gray-50 border ${
                formik.touched.postOffice && formik.errors.postOffice
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.postOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Post Office"
            />
            {formik.touched.postOffice && formik.errors.postOffice ? (
              <div className="text-red-500 text-sm">
                {formik.errors.postOffice}
              </div>
            ) : null}
          </div>

          {/* Country Field */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className={`w-full bg-gray-50 border ${
                formik.touched.country && formik.errors.country
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Country"
            />
            {formik.touched.country && formik.errors.country ? (
              <div className="text-red-500 text-sm">
                {formik.errors.country}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Register Institute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstituteRegistrationForm;
