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

  // Load initial local storage data
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
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
