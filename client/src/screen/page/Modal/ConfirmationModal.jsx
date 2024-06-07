import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, requiredPoints }) => {
  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-black">
        <div className="bg-white p-6 rounded-md shadow-md">
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
            <h2 className="text-lg font-semibold">ຄຳເຕືອນ</h2>
          </div>
          <div className="modal-content py-4 text-center">
            <p className="mb-4 text-black">
              ບົດເສັງນີ້ຕ້ອງການໃຊ້ {requiredPoints} ແຕ້ມໃນການເຂົ້າເສັງ
              ທ່ານຕ້ອງການເສັງ ຫຼື ບໍ່?
            </p>
            <button
              onClick={onConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
            >
              ຕົກລົງ
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-400 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-500"
            >
              ຍົກເລີກ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
