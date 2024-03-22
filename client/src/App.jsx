import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Home from "./screen/page/Home";
import Login from "./screen/auth/Login";
import Register from "./screen/auth/Register";
import ProtectedRoute from "./components/authNavigator/protectedRoute";
import PublicRoute from "./components/authNavigator/publicRoute";
import PageManager from "./screen/PageManager";
import Feuature from "./screen/page/Feuature";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageManager>
                <Home />
              </PageManager>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feuature"
          element={
            <ProtectedRoute>
              <PageManager>
                <Feuature />
              </PageManager>
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
