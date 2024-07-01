import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hook/useAuth";

function MyCertificate() {
  const { userData } = useAuthContext();
  const [certificates, setCertificates] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/certificate/get"
      );
      console.log("API Response:", response.data);
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleOpenRequestForm = (courseId) => {
    setSelectedCourseId(courseId);
    setShowRequestForm(true);
  };

  const handleCreateRequest = async () => {
    try {
      const response = await axios.post("/certificate/request/post", {
        userId: userData.userId,
        courseId: selectedCourseId,
      });
      console.log("Request created successfully:", response.data);
      setShowRequestForm(false);
    } catch (error) {
      console.error("Error creating request:", error.response?.data || error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <h5>ໃບຢັ້ງຢືນ</h5>
      </div>
      <div className="bg-white mt-5 rounded-lg shadow p-4 md:p-6 h-screen dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate._id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h3 className="text-gray-600 text-lg font-semibold">
                {certificate.name}
              </h3>
              <p className="text-gray-600">{certificate.description}</p>
              <p className="text-gray-600">
                ຄະແນນທີ່ຕ້ອງການ: {certificate.minimumScore}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleOpenRequestForm(certificate.courseId)}
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-600"
                >
                  ຂໍໃບຢັ້ງຢືນ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRequestForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 3h13.856a2 2 0 001.789-2.894l-6.938-13a2 2 0 00-3.578 0l-6.938 13A2 2 0 015.082 16z"
                />
              </svg>
              <h2 className="text-gray-600 text-lg font-semibold">ຄຳເຕືອນ</h2>
            </div>
            <p className="text-lg mb-4 text-gray-600">
              ຫຼັງຈາກທ່ານສົ່ງຄຳຂໍໄປແລ້ວ ທ່ານຈະບໍ່ສາມາດສົ່ງຄຳຂໍໄດ້ອີກ
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCreateRequest}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
              >
                ຢືນຢັນການຂໍ
              </button>
              <button
                onClick={() => setShowRequestForm(false)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-red-600 ml-2"
              >
                ຍົກເລີກ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyCertificate;
