import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

function PrivateRoutes() {
  const { authenticated, loading, error } = useAuth();

  if (loading) {
    // Optional: You can render a loading indicator while checking the authentication status
    return <p>Loading...</p>;
  }

  if (error) {
    // Optional: Handle error if any occurred during authentication
    return <p>Error: {error.message}</p>;
  }

  // If user is authenticated, allow access to private routes, otherwise redirect to login
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
