import React, { useState, useEffect } from "react";
import axios from "axios";

const RedeemForm = ({ redeem, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    itemsName: "",
    qty: "",
    imageUrl: "",
    points: "",
  });

  useEffect(() => {
    if (redeem) {
      setFormData(redeem);
    }
  }, [redeem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (redeem) {
        await axios.put(
          `http://localhost:8080/api/v1/redeem/${redeem._id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/v1/redeem/createredeem",
          formData
        );
      }
      onClose();
      onRefresh();
    } catch (error) {
      console.error("Error saving redeem request:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {redeem ? "Edit Redeem" : "Create Redeem"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              name="itemsName"
              value={formData.itemsName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Points</label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedeemForm;
