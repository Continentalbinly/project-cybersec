import React, { useState, useEffect } from "react";
import axios from "axios";
import RedeemForm from "./forms/RedeemForm";

const RedeemController = () => {
  const [redeems, setRedeems] = useState([]);
  const [selectedRedeem, setSelectedRedeem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchRedeems();
  }, []);

  const fetchRedeems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/redeem/getredeems"
      );
      if (response.data.success) {
        setRedeems(response.data.redeems);
      }
    } catch (error) {
      console.error("Error fetching redeems:", error);
    }
  };

  const handleCreate = () => {
    setSelectedRedeem(null);
    setIsFormVisible(true);
  };

  const handleEdit = (redeem) => {
    setSelectedRedeem(redeem);
    setIsFormVisible(true);
  };

  const handleDelete = async (redeemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/redeem/${redeemId}`);
      fetchRedeems();
    } catch (error) {
      console.error("Error deleting redeem:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Redeem Controller</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
        >
          Create New Redeem
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {redeems.map((redeem) => (
          <div key={redeem._id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-gray-600 text-lg font-semibold">{redeem.itemsName}</h3>
            <p className="text-gray-600">Quantity: {redeem.qty}</p>
            <img
              src={redeem.imageUrl}
              alt={redeem.itemsName}
              className="w-full h-40 object-cover mt-2"
            />
            <p className="text-gray-600">Points: {redeem.points}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleEdit(redeem)}
                className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(redeem._id)}
                className="bg-red-500 text-white font-semibold py-1 px-2 rounded-lg transition duration-300 ease-in-out hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormVisible && (
        <RedeemForm
          redeem={selectedRedeem}
          onClose={() => setIsFormVisible(false)}
          onRefresh={fetchRedeems}
        />
      )}
    </div>
  );
};

export default RedeemController;
