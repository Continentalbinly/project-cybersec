import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({}) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!userName || !userId || !passWord) {
        setError("Please fill all fields.");
        setLoading(false);
        return;
      }

      const response = await axios.post("/auth/register", {
        userName,
        userId,
        passWord,
      });

      if (response.data && response.data.message) {
        alert(response.data.message);
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="px-4 py-2 bg-white rounded text-[#50d71e]"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="px-4 py-2 bg-white rounded text-[#50d71e]"
          placeholder="UserID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          className="px-4 py-2 bg-white rounded text-[#000]"
          placeholder="Password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="px-6 py-3 bg-blue-500 rounded mt-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Register"}
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
