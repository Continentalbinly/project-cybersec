import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (
        !userName ||
        !userSurname ||
        !userBirthday ||
        !userEmail ||
        !userId ||
        !passWord
      ) {
        setError("Please fill all fields.");
        setLoading(false);
        return;
      }

      const response = await axios.post("/auth/register", {
        userName,
        userSurname,
        userBirthday,
        userEmail,
        userId,
        passWord,
        role: "user",
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
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <input
          type="text"
          className="px-4 py-2 rounded dark:text-white text-black"
          placeholder="First Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="px-4 py-2 rounded dark:text-white text-black"
          placeholder="Last Name"
          value={userSurname}
          onChange={(e) => setUserSurname(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 rounded dark:text-white text-black"
          placeholder="Birthday"
          value={userBirthday}
          onChange={(e) => setUserBirthday(e.target.value)}
        />
        <input
          type="email"
          className="px-4 py-2 rounded dark:text-white text-black"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="text"
          className="px-4 py-2 rounded dark:text-white text-black"
          placeholder="UserID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          className="px-4 py-2 rounded dark:text-white text-black"
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
