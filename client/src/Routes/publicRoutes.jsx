import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

function PublicRoutes() {
  const { authenticated, loading, error } = useAuth();

  if (loading) {
    // Optional: You can render a loading indicator while checking the authentication status
    return <p>Loading...</p>;
  }

  if (error) {
    // Optional: Handle error if any occurred during authentication
    return <p>Error: {error.message}</p>;
  }

  // If user is not authenticated, allow access to public routes, otherwise redirect to home
  return authenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
