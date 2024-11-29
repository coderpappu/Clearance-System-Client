import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import ClearanceCategoryForm from "./pages/clearance/CategoryForm";
import ClearanceCategoryCard from "./pages/clearance/ClearanceCategoryCard";
import DepartmentCard from "./pages/department/DepartmentCard";
import DepartmentForm from "./pages/DepartmentForm";
import InstituteCard from "./pages/Institute/InstituteCard";
import InstituteRegistrationForm from "./pages/IntituteRegistration";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import StudentList from "./pages/StudentList";
import StudentRegistrationForm from "./pages/StudentRegForm";
import LoginForm from "./pages/UserLogin";
import UserRegistration from "./pages/UserRegistration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap all routes inside Layout
    children: [
      {
        path: "/",
        element: <App />,
      },

      {
        path: "/institute/registration",
        element: <InstituteRegistrationForm />,
      },
      {
        path: "/institute/profile",
        element: <InstituteCard />,
      },

      {
        path: "/institute/adddepartment",
        element: <DepartmentForm />,
      },
      {
        path: "/department/list",
        element: <DepartmentCard />,
      },

      {
        path: "/institute/clearance/addcategory",
        element: <ClearanceCategoryForm />,
      },
      {
        path: "/clearance/category",
        element: <ClearanceCategoryCard />,
      },

      {
        path: "/student/registration",
        element: <StudentRegistrationForm />,
      },
      {
        path: "/student/list",
        element: <StudentList />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <UserRegistration />, // Wrap all routes inside Layout
  },

  {
    path: "/signin",
    element: <LoginForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
