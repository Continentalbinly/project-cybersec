import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = "http://localhost:8080/api/v1";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("@auth"));
        const token = authData?.token; 
        console.log("Token retrieved from localStorage:", token);
        if (token) {
          const response = await axios.get("/auth/fetchuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            console.log("User data fetched successfully");
            setAuthenticated(true);
          } else {
            console.log("Failed to fetch user data");
            setAuthenticated(false);
          }
        } else {
          console.log("No token found in localStorage");
          setAuthenticated(false);
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

  return { authenticated, loading, error };
};

