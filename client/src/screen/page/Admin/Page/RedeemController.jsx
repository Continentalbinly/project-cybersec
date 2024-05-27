import React, { useState, useEffect } from "react";
import axios from "axios";
import RedeemForm from "./forms/RedeemForm";
import { useAuthContext } from "../../../../hook/useAuth";

const RedeemController = () => {
  const { userData, setAuthState } = useAuthContext();
  const [redeems, setRedeems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRedeem, setSelectedRedeem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("view");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchRedeems();
    fetchRequests();
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

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/redeemrequest/getrequests"
      );
      if (response.data.success) {
        setRequests(response.data.redeemRequests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
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

  const handleApprove = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/v1/redeemrequest/approve/${requestId}`
      );
      fetchRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/redeemrequest/reject/${requestId}`
      );
      if (response.data.success) {
        setAuthState((prevState) => ({
          ...prevState,
          userData: {
            ...prevState.userData,
            points: response.data.user.points,
          },
        }));
        fetchRequests();
      } else {
        console.error("Error rejecting request:", response.data.error);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (filterStatus === "") return true;
    return request.status === filterStatus;
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            onClick={() => setActiveTab("view")}
            className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
              activeTab === "view"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            ຄຳຂໍສົ່ງລາງວັນ
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`ml-2 py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
              activeTab === "manage"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            ຈັດການ ຂອງລາງວັນ
          </button>
        </div>
      </div>

      {activeTab === "view" ? (
        <div>
          <h2 className="text-xl font-bold mb-4">ຄຳຂໍ</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Redeem Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests
                    .filter((request) => request.status === "pending")
                    .map((request) => (
                      <tr key={request._id}>
                        <td className="px-6 py-4">{request.redeemName}</td>
                        <td className="px-6 py-4">{request.userName}</td>
                        <td className="px-6 py-4">{request.email}</td>
                        <td className="px-6 py-4">{request.location}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleApprove(request._id)}
                            className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            className="bg-red-500 text-white py-1 px-2 rounded"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4 mt-5">
            <h2 className="text-xl font-bold mb-4">ປະຫວັດການເຄື່ອນໄຫວ</h2>
            <button
              onClick={() => setFilterStatus("")}
              className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                filterStatus === ""
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`ml-2 py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                filterStatus === "approved"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`ml-2 py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                filterStatus === "rejected"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Rejected
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Redeem Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests &&
                  filteredRequests.map((request) => (
                    <tr key={request._id}>
                      <td className="px-6 py-4">{request.redeemName}</td>
                      <td className="px-6 py-4">{request.userName}</td>
                      <td className="px-6 py-4">{request.email}</td>
                      <td className="px-6 py-4">{request.location}</td>
                      <td className="px-6 py-4">{request.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        activeTab ===
        "manage"(
          <div>
            <div className="flex justify-start mb-4">
              <button
                onClick={handleCreate}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
              >
                ເພີ່ມຂອງລາງວັນ
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redeems.map((redeem) => (
                <div
                  key={redeem._id}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
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
        )
      )}
    </div>
  );
};

export default RedeemController;
