import React, { useEffect, useState } from "react";
import axios from "axios";
import RedeemRequestForm from "../page/Admin/Page/forms/RedeemRequestForm";

function RedeemShop() {
  const [redeems, setRedeems] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRedeemId, setSelectedRedeemId] = useState(null);
  const [selectedRedeemName, setSelectedRedeemName] = useState(null);
  const [selectedRedeemRqPoint, setSelectedRedeemRqPoint] = useState(null);

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

  useEffect(() => {
    fetchRedeems();
  }, []);

  const handleOpenRequestForm = (redeemId, redeemName, redeemPoint) => {
    setSelectedRedeemId(redeemId);
    setSelectedRedeemName(redeemName);
    setSelectedRedeemRqPoint(redeemPoint);
    setShowRequestForm(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <h5>ແລກຂອງລາງວັນ</h5>
      </div>
      <div className="bg-white mt-5 rounded-lg shadow p-4 md:p-6 h-screen dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {redeems.map((redeem) => (
            <div key={redeem._id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-gray-600 text-lg font-semibold">
                {redeem.itemsName}
              </h3>
              <p className="text-gray-600">Quantity: {redeem.qty}</p>
              <img
                src={redeem.imageUrl}
                alt={redeem.itemsName}
                className="w-full h-40 object-cover mt-2"
              />
              <p className="text-gray-600">Points: {redeem.points}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() =>
                    handleOpenRequestForm(
                      redeem._id,
                      redeem.itemsName,
                      redeem.points
                    )
                  }
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-600"
                >
                  ແລກ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRequestForm && (
        <RedeemRequestForm
          redeemId={selectedRedeemId}
          redeemName={selectedRedeemName}
          redeemPoint={selectedRedeemRqPoint}
          onClose={() => setShowRequestForm(false)}
          onRefresh={fetchRedeems} // Pass fetchRedeems as a prop
        />
      )}
    </>
  );
}

export default RedeemShop;
