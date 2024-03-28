import { Outlet, Navigate } from "react-router-dom";
import { useAuthAdmin } from "../hook/useAuthAdmin";

function AdminRoutes() {
  const { isAdmin, loading, error } = useAuthAdmin();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/access-denied" />;
}

export default AdminRoutes;
