import { useEffect, useState } from "react";
import axios from "axios";

export const useAuthGuest = () => {
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuestData = async () => {
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
          if (response.data.success && response.data.user.role === "guest") {
            setIsGuest(true);
          } else {
            setIsGuest(false);
          }
        } else {
          setIsGuest(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, []);
  return { isGuest, loading, error };
};
