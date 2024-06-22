import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

function AdminOperatorPage() {
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    courseId: "",
    name: "",
    description: "",
    expiryDate: "",
    minimumScore: 0,
  });
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    userId: "",
    courseId: "",
  });

  useEffect(() => {
    fetchCertificates();
    fetchRequests();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get("/certificate/get");
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get("/certificate/request/get");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate({ ...newCertificate, [name]: value });
  };

  const handleRequestInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleCreateCertificate = async () => {
    console.log("Creating certificate with data:", newCertificate);
    try {
      const response = await axios.post("/certificate/create", newCertificate);
      console.log("Certificate created successfully:", response.data);
      fetchCertificates();
      setNewCertificate({
        courseId: "",
        name: "",
        description: "",
        expiryDate: "",
        minimumScore: 0,
      });
    } catch (error) {
      console.error("Error creating certificate:", error.response.data);
    }
  };

  const handleCreateRequest = async () => {
    console.log("Creating request with data:", newRequest);
    try {
      const response = await axios.post(
        "/certificate/request/post",
        newRequest
      );
      console.log("Request created successfully:", response.data);
      fetchRequests();
      setNewRequest({
        userId: "",
        courseId: "",
      });
    } catch (error) {
      console.error("Error creating request:", error.response.data);
    }
  };

  const handleUpdateCertificate = async () => {
    try {
      await axios.put(
        `/certificate/${editingCertificate._id}`,
        editingCertificate
      );
      fetchCertificates();
      setEditingCertificate(null);
    } catch (error) {
      console.error("Error updating certificate:", error);
    }
  };

  const handleDeleteCertificate = async (id) => {
    try {
      await axios.delete(`/certificate/${id}`);
      fetchCertificates();
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleApproveRequest = async (id) => {
    try {
      await axios.put(`/certificate/request/get/${id}`, {
        status: "Approved",
      });
      fetchRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      await axios.put(`/certificate/request/get/${id}`, {
        status: "Rejected",
      });
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Operator Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-white">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Create Certificate
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="courseId"
            value={newCertificate.courseId}
            onChange={handleInputChange}
            placeholder="Course ID"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="name"
            value={newCertificate.name}
            onChange={handleInputChange}
            placeholder="Certificate Name"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <textarea
            name="description"
            value={newCertificate.description}
            onChange={handleInputChange}
            placeholder="Certificate Description"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="date"
            name="expiryDate"
            value={newCertificate.expiryDate}
            onChange={handleInputChange}
            placeholder="Expiry Date"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="number"
            name="minimumScore"
            value={newCertificate.minimumScore}
            onChange={handleInputChange}
            placeholder="Minimum Score"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
        </div>
        <button
          onClick={handleCreateCertificate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Certificate
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-white">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Create Certificate Request
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="userId"
            value={newRequest.userId}
            onChange={handleRequestInputChange}
            placeholder="User ID"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="courseId"
            value={newRequest.courseId}
            onChange={handleRequestInputChange}
            placeholder="Course ID"
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
        </div>
        <button
          onClick={handleCreateRequest}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Request
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black">
        <h2 className="text-2xl font-semibold mb-4">Certificate List</h2>
        <ul>
          {certificates.map((certificate) => (
            <li key={certificate._id} className="mb-4">
              <h3 className="text-xl font-semibold">{certificate.name}</h3>
              <p>{certificate.description}</p>
              <p>Course ID: {certificate.courseId}</p>
              <p>Minimum Score: {certificate.minimumScore}</p>
              <p>Expiry Date: {certificate.expiryDate}</p>
              <button
                onClick={() => setEditingCertificate(certificate)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCertificate(certificate._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {editingCertificate && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-white">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Edit Certificate
          </h2>
          <div className="mb-4">
            <input
              type="text"
              name="courseId"
              value={editingCertificate.courseId}
              onChange={(e) =>
                setEditingCertificate({
                  ...editingCertificate,
                  courseId: e.target.value,
                })
              }
              placeholder="Course ID"
              className="w-full px-4 py-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="name"
              value={editingCertificate.name}
              onChange={(e) =>
                setEditingCertificate({
                  ...editingCertificate,
                  name: e.target.value,
                })
              }
              placeholder="Certificate Name"
              className="w-full px-4 py-2 border rounded-md mb-2"
            />
            <textarea
              name="description"
              value={editingCertificate.description}
              onChange={(e) =>
                setEditingCertificate({
                  ...editingCertificate,
                  description: e.target.value,
                })
              }
              placeholder="Certificate Description"
              className="w-full px-4 py-2 border rounded-md mb-2"
            />
            <input
              type="date"
              name="expiryDate"
              value={editingCertificate.expiryDate}
              onChange={(e) =>
                setEditingCertificate({
                  ...editingCertificate,
                  expiryDate: e.target.value,
                })
              }
              placeholder="Expiry Date"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="number"
              name="minimumScore"
              value={editingCertificate.minimumScore}
              onChange={(e) =>
                setEditingCertificate({
                  ...editingCertificate,
                  minimumScore: e.target.value,
                })
              }
              placeholder="Minimum Score"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleUpdateCertificate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Certificate
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black">
        <h2 className="text-2xl font-semibold mb-4">Certificate Requests</h2>
        <table className="table-auto w-full">
          <tbody>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Course ID</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="mb-4">
                    <td className="border px-4 py-2">{request.userId}</td>
                    <td className="border px-4 py-2">{request.courseId}</td>
                    <td className="border px-4 py-2">{request.status}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleApproveRequest(request._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOperatorPage;
