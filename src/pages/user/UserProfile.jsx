import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useChangeUserPasswordMutation,
  useGetUserDetailsQuery,
} from "../../api/apiSlice";
import Button from "../student/Button";
import InfoBox from "../student/InfoBox";

const UserProfile = () => {
  const [selected, setSelected] = useState("1");
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetUserDetailsQuery(id);
  const [changePassword] = useChangeUserPasswordMutation();

  const handleSelect = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    if (isError) {
      console.error("Error fetching user details");
    }
  }, [isError]);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await changePassword({ id, ...values }).unwrap();
        toast.success("Password changed successfully!");
      } catch (error) {
        toast.error("Failed to change password. Please try again.");
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user details</div>;

  return (
    <div>
      <div className="w-full p-5  mb-1 rounded-md bg-white dark:bg-dark-card flex flex-wrap justify-between ">
        <div className="flex flex-wrap justify-between items-center w-[50%]">
          <div className="w-[20%] mr-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-blue-500  flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-600 dark:text-white">
                {user?.data?.first_name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="w-[75%]">
            <h1 className="font-poppins text-2xl dark:text-dark-text-color font-semibold">
              {user?.data?.first_name + " " + user?.data?.last_name}
            </h1>
            <h3 className="text-[15px] font-medium  text-[#686767] dark:text-dark-text-color">
              {user?.data?.role}
            </h3>
            <h3 className="text-[15px] mt-2 font-semibold  text-[#3c3c3c] dark:text-dark-text-color">
              Email : {user?.data?.email}
            </h3>
          </div>
        </div>
        <div className="w-[50%] border-l-2 border-dotted border-[#cacaca]">
          <InfoBox title="Address" data={user?.address} />
          <InfoBox title="City" data={user?.city} />
          <InfoBox title="Country" data={user?.country} />
          <InfoBox title="Postal Code" data={user?.postalCode} />
        </div>
      </div>
      <div className="w-full  rounded-md bg-white dark:bg-dark-card flex flex-wrap ">
        <Button
          button_id="1"
          isActive={selected == "1"}
          handleSelect={handleSelect}
          title={"Details"}
        />
        <Button
          button_id="2"
          isActive={selected == "2"}
          handleSelect={handleSelect}
          title={"Settings"}
        />
      </div>

      {selected == "1" && <div>{/* Add user details component here */}</div>}
      {selected == "2" && (
        <div className="p-5">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Change Password
          </h3>
          <form
            onSubmit={formik.handleSubmit}
            className="grid gap-6 grid-cols-1 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className={`w-full bg-gray-50 border ${
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Current Password"
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.currentPassword}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className={`w-full bg-gray-50 border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="New Password"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.newPassword}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`w-full bg-gray-50 border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg p-3 dark:bg-gray-700`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
