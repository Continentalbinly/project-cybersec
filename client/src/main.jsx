// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hook/useAuth.jsx";
import { WarningProvider } from "./context/WarningContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WarningProvider>
        <App />
      </WarningProvider>
    </AuthProvider>
  </React.StrictMode>
);
