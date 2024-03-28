import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Context creation
const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  // Global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // Default axios setting
  axios.defaults.baseURL = "http://localhost:8080/api/v1";

  useEffect(() => {
    const loadLocalStorageData = async () => {
      try {
        let data = localStorage.getItem("@auth");
        if (data) {
          let { user, token } = JSON.parse(data);
          setState({ ...state, user, token });
        }
      } catch (error) {
        console.error("Error loading local storage data:", error);
      }
    };

    loadLocalStorageData();
    const handleStorageChange = () => {
      loadLocalStorageData(); // Refresh data when storage changes
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
