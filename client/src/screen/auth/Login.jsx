import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../hook/useAuth"; // Import the hook directly

const Login = () => {
  const { setAuthState } = useAuthContext(); // Use the hook directly

  const [userId, setUserId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!userId || !passWord) {
        alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/auth/login", { userId, passWord });
      setAuthState(data); // Update state with user data directly using setAuthState
      console.log("Login success:", data);
      localStorage.setItem("@auth", JSON.stringify(data)); // Update localStorage key
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
      window.location.reload(); // Reload the page after loading is set to false
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="px-4 py-2 bg-white rounded text-[#50d71e] placeholder-gray-500"
          placeholder="Userid"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          className="px-4 py-2 bg-white rounded text-[#000] placeholder-gray-500"
          placeholder="Password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
      </div>
      <button
        className="px-6 py-3 bg-blue-500 rounded mt-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <p className="mt-4">
        No Have Account?{" "}
        <Link to="/register" className="text-red-500">
          Register
        </Link>
      </p>
      <p>Or</p>
      <button
        className="w-56 py-2 bg-gray-500 rounded mt-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Guest"}
      </button>
    </div>
  );
};

export default Login;
