import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLoginUserMutation } from "../api/apiSlice";
import devCompany from "../assets/company.png";
import Logo from "../assets/cpi_logo.png";
import devCompanyDark from "../assets/darkCompany.png";
const LoginForm = () => {
  const navigate = useNavigate();

  const [userLogin] = useLoginUserMutation();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "pappudey@gmail.com",
    password: "12345678",
  };

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await userLogin(values).unwrap();

        localStorage.setItem("token", data?.data?.token);

        toast.success("Login Successful!");

        // Small delay to ensure token is set before navigation
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      } catch (error) {
        toast.error("Failed to login. Please check your credentials.");
      }
    },
  });

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-24 h-24 mr-2" src={Logo} alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={`bg-gray-50 border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up here
                  </a>
                </p> */}
              </form>
              {/* Quick Links for Students */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                  Quick Links for Students
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/student-verify")}
                    className="flex-1 text-black bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-white dark:hover:bg-blue-900/30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors"
                  >
                    Check Due Payment
                  </button>
                  <button
                    onClick={() => navigate("/refund-confirmation")}
                    className="flex-1 text-black bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-white dark:hover:bg-green-900/30 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center transition-colors"
                  >
                    Check Refund Status
                  </button>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="w-[200px] mt-28 flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <p className="text-sm text-dark-card dark:bg-dark-text-color">
              Developed By :{" "}
            </p>
            <img
              src={isDarkMode ? devCompanyDark : devCompany}
              alt="Codex Devware"
              className="mt-3"
            />
          </div>
        </div>
      </section>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginForm;
