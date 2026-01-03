import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import "./index.css";
import ClearanceCategoryForm from "./pages/clearance/CategoryForm";
import ClearanceCategoryCard from "./pages/clearance/ClearanceCategoryCard";
import DepartmentCard from "./pages/department/DepartmentCard";
// import DepartmentForm from "./pages/DepartmentForm";
import DashboardStats from "./pages/dashboard/Dashboard";
import InstituteCard from "./pages/Institute/InstituteCard";
import InstituteRegistrationForm from "./pages/IntituteRegistration";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import PaymentCard from "./pages/payment/PaymentCard";
import PaymentVerify from "./pages/payment/PaymentVerify";
import RefundManagement from "./pages/refund/RefundManagement";
import RefundSettings from "./pages/settings/RefundSettings";
import RefundConfirmation from "./pages/student/RefundConfirmation";
import StudentCard from "./pages/student/StudentCard";
import StudentDueCheck from "./pages/student/StudentDueCheck";
import StudentPaymentCard from "./pages/student/StudentPaymentCard";
import StudentProfile from "./pages/student/StudentProfileCard";
import StudentRegistrationForm from "./pages/StudentRegForm";
import UserList from "./pages/user/UserList";
import UserProfile from "./pages/user/UserProfile";
import LoginForm from "./pages/UserLogin";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashboardStats />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardStats />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/profile/:id",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/list",
        element: (
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        ),
      },
      {
        path: "/institute/registration",
        element: (
          <PrivateRoute>
            <InstituteRegistrationForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/institute/profile",
        element: (
          <PrivateRoute>
            <InstituteCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/department/list",
        element: (
          <PrivateRoute>
            <DepartmentCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/institute/clearance/addcategory",
        element: (
          <PrivateRoute>
            <ClearanceCategoryForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/clearance/category",
        element: (
          <PrivateRoute>
            <ClearanceCategoryCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/student/registration",
        element: (
          <PrivateRoute>
            <StudentRegistrationForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/student",
        element: (
          <PrivateRoute>
            <StudentCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/student/profile/:id",
        element: (
          <PrivateRoute>
            <StudentProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-verify",
        element: (
          <PrivateRoute>
            <PaymentVerify />
          </PrivateRoute>
        ),
      },
      {
        path: "/refund-management",
        element: (
          <PrivateRoute>
            <RefundManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/refund-settings",
        element: (
          <PrivateRoute>
            <RefundSettings />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
  // {
  //   path: "/signup",
  //   element: <UserRegistration />,
  // },
  {
    path: "/signin",
    element: <LoginForm />,
  },
  {
    path: "/student-verify",
    element: <StudentDueCheck />,
  },
  {
    path: "/refund-confirmation",
    element: <RefundConfirmation />,
  },
  {
    path: "/student-payment",
    element: <StudentPaymentCard />,
  },
  {
    path: "/payment",
    element: <PaymentCard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
