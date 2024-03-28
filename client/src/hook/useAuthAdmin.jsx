import { useEffect, useState } from "react";
import axios from "axios";

export const useAuthAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("@auth"));
        const token = authData?.token;
        console.log("Token localStorage:", token);

        if (token) {
          const response = await axios.get("/auth/fetchuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Role from Api:", response.data.user.role);
          if (response.data.success && response.data.user.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { isAdmin, loading, error };
};
