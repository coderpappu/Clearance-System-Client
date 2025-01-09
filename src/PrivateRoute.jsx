import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  console.log("check the ", token);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
