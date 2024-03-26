import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./screen/page/Home";
import Login from "./screen/auth/Login";
import Register from "./screen/auth/Register";
import Feuature from "./screen/page/Feuature";
import PrivateRoutes from "./Routes/privateRoutes";
import PublicRoutes from "./Routes/publicRoutes";
import Error from "./screen/page/error";
import PageManager from "./screen/PageManager";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PageManager>
                <PrivateRoutes />
              </PageManager>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/feuature" element={<Feuature />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
