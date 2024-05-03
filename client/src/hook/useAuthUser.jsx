import { useEffect, useState } from "react";
import axios from "axios";

export const useAuthUser = () => {
  const [isUser, setIsUser] = useState(false);
  const [isUserVerify, setIsUserVerify] = useState(false);
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
          if (response.data.success && response.data.user.role === "user") {
            setIsUser(true);
          } else {
            setIsUser(false);
          }
          if (response.data.success && response.data.user.status === 1) {
            setIsUserVerify(true);
          } else {
            setIsUserVerify(false);
          }
        } else {
          setIsUser(false);
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
  return { isUser, isUserVerify, loading, error };
};
