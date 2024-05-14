import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../hook/useAuth"; // Import the hook directly

const Login = () => {
  const { setAuthState } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (userId && passWord && isGuest) {
      handleGuestLogin();
    }
    return setIsGuest(false);
  }, [userId, passWord, isGuest]); // Only trigger the effect when userId or passWord changes

  const generateRandomCredentials = () => {
    const randomUserId = `guest_${Math.floor(Math.random() * 100000)}`;
    const randomPassWord = Math.random().toString(36).slice(-8);
    const randomUserName = "Guest";
    const randomUserSurname = "Guest";
    const randomUserBirthday = new Date();
    const randomUserEmail = `guest${Math.floor(
      Math.random() * 100000
    )}@example.com`;

    setUserId(randomUserId);
    setPassWord(randomPassWord);
    setUserName(randomUserName);
    setUserSurname(randomUserSurname);
    setUserBirthday(randomUserBirthday);
    setUserEmail(randomUserEmail);
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      generateRandomCredentials();
      console.log(userId);
      await axios.post("/auth/register", {
        userName,
        userSurname,
        userBirthday,
        userEmail,
        userId,
        passWord,
        role: "guest",
      });
      const loginResponse = await axios.post("/auth/login", {
        userId,
        passWord,
      });
      setAuthState(loginResponse.data);
      console.log("Guest Login success:", loginResponse.data);
      localStorage.setItem("@auth", JSON.stringify(loginResponse.data));
    } catch (error) {
      console.error("Guest Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!userId || !passWord) {
        alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/auth/login", { userId, passWord });
      console.log("Login Response:", data);
      if (data.user && data.user.status == 1) {
        alert("ເຂົ້າສູ່ລະບົບສຳເລັດ");
        setAuthState(data);
        localStorage.setItem("@auth", JSON.stringify(data));
        window.location.reload();
      } else {
        alert("ກະລຸນາລໍຖ້າແອັດມິນອະນຸມັດເຂົ້າໃຊ້ງານ");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
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
        onClick={() => {
          generateRandomCredentials();
          setIsGuest(true);
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Guest"}
      </button>
    </div>
  );
};

export default Login;
