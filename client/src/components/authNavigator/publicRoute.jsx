import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
const PublicRoute = ({ children }) => {
  const [state] = useContext(AuthContext);
  const isAuthenticated = state?.user && state?.token;
  console.log("Check user in Private: ", isAuthenticated);
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
