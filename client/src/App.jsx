import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Home from "./screen/page/Home";
import Login from "./screen/auth/Login";
import Register from "./screen/auth/Register";
import ProtectedRoute from "./components/authNavigator/protectedRoute";
import PublicRoute from "./components/authNavigator/publicRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
