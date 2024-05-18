import React, { useState } from "react";

function MyCertificate() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    // Logic to check if the score is under permission
    // For demonstration, let's assume the score is not under permission
    setShowMessage(true);
  };

  return (
    <div>
      <button
        className="btn px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleClick}
      >
        ຂໍໃບຢັ້ງຢືນ
      </button>
      {showMessage && (
        <p className="text-red-500 mt-2">
          Your score is not under permission to request a certificate.
        </p>
      )}
    </div>
  );
}

export default MyCertificate;
