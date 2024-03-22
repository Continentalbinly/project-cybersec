import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!userName || !userId || !passWord) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        userName,
        userId,
        passWord,
      });
      alert(data && data.message);
      navigation.navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="px-4 py-2 bg-white rounded text-[#50d71e]"
          placeholder="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="px-4 py-2 bg-white rounded text-[#50d71e]"
          placeholder="Userid"
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
      <button
        className="px-6 py-3 bg-blue-500 rounded mt-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Register"}
      </button>
      <p className="mt-4">
        Already Have Account!{" "}
        <Link to="/login" className="text-red-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
