import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../../../hook/useAuth";

const RedeemRequestForm = ({
  redeemId,
  redeemName,
  redeemPoint,
  onClose,
  onRefresh,
}) => {
  const { userData, setUserData } = useAuthContext();
  const [formData, setFormData] = useState({
    redeemName: redeemName,
    userId: userData._id,
    userName: userData.userName,
    email: userData.userEmail,
    pointRequire: redeemPoint,
    location: "",
    phone: "",
    express: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userData.point < redeemPoint) {
          alert("Point Not Enough");
        } else {
          const response = await axios.post(
            "http://localhost:8080/api/v1/redeemrequest/createrequest",
            {
              ...formData,
              redeemId,
            }
          );
          if (response.data.success) {
            const updatePointsResponse = await axios.post(
              "http://localhost:8080/api/v1/auth/update-user-points",
              {
                userId: userData._id,
                pointsToDeduct: redeemPoint,
              }
            );
            if (updatePointsResponse.data.success) {
              setUserData((prevUserData) => ({
                ...prevUserData,
                points: prevUserData.points - redeemPoint,
              }));
              onRefresh();
              onClose();
            } else {
              console.error(
                "Error updating user points:",
                updatePointsResponse.data.message
              );
            }
          }
        }
      } catch (error) {
        console.error("Error creating request:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.express) {
      errors.express = "Express is required";
    }
    if (!data.location) {
      errors.location = "Location is required";
    }
    if (!data.phone) {
      errors.phone = "Phone is required";
    }
    return errors;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-black font-bold mb-4">ແລກຂອງລາງວັນ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="express">
              ຂົນສົ່ງ
            </label>
            <input
              type="text"
              name="express"
              value={formData.express}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.express ? "border-red-500" : ""
              }`}
            />
            {errors.express && (
              <p className="text-red-500 text-sm">{errors.express}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              ສະຖານທີ່ຈັດສົ່ງ
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.location ? "border-red-500" : ""
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              ເບີໂທ
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              ແລກ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedeemRequestForm;
