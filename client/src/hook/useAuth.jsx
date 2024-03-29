import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

// Create a context to store authentication and user data
const AuthContext = createContext();

export const useAuth = () => {
  const [state, setState] = useState({
    authenticated: false,
    loading: true,
    error: null,
    userData: null,
  });

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
            console.log("User data fetched successfully", response.data.user);
            setState(prevState => ({
              ...prevState,
              authenticated: true,
              userData: response.data.user,
              loading: false, // Moved loading state update here
            }));
          } else {
            console.log("Failed to fetch user data");
            setState(prevState => ({
              ...prevState,
              authenticated: false,
              loading: false, // Moved loading state update here
            }));
          }
        } else {
          console.log("No token found in localStorage");
          setState(prevState => ({
            ...prevState,
            authenticated: false,
            loading: false, // Moved loading state update here
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setState(prevState => ({
          ...prevState,
          error,
          loading: false, // Moved loading state update here
        }));
      }
    };

    fetchUserData();
  }, []);

  const setAuthState = (newState) => {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  return { ...state, setAuthState }; // Return user data and setAuthState function
};

// Provider component to wrap the App and provide authentication context
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to use the authentication context in components
export const useAuthContext = () => useContext(AuthContext);
