import React from "react";
import { useNavigate } from "react-router-dom";

function LoginResult() {
  const navigate = useNavigate();

  const handleGoback = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Please wait for admin approve!</h1>
      <button
        type="button"
        onClick={handleCancel}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ml-4"
      >
        ກັບເຂົ້າສູ່ລະບົບ
      </button>
    </div>
  );
}

export default LoginResult;
