import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
const ProtectedRoute = ({ children }) => {
  const [state] = useContext(AuthContext);
  const isAuthenticated = state?.user && state?.token;
  console.log("Check user in Private: ", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
