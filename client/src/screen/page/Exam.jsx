import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./Modal/ConfirmationModal";

function Exam() {
  const [exams, setExams] = useState([]);
  const [takenExams, setTakenExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, setUserData } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
    fetchTakenExams();
    fetchTakenExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("/exam/getexams");
      setExams(response.data.exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const fetchTakenExams = async () => {
    try {
      if (!userData || !userData._id) {
        console.error("User data or user ID not available.");
        return;
      }
  
      const response = await axios.get(`/exam/user/${userData._id}/exams`);
      setTakenExams(response.data.examsTaken.map(exam => exam._id));
    } catch (error) {
      console.error("Error fetching taken exams:", error);
    }
  };
  
  const takeExam = (examId) => {
    setSelectedExamId(examId);
    setIsModalOpen(true);
  };

  const handleConfirmTakeExam = async () => {
    try {
      const userId = userData._id;
      const pointsToDeduct = exams.find(
        (exam) => exam._id === selectedExamId
      ).requiredPoints;
      const response = await axios.post(`/exam/take/${selectedExamId}`, {
        userId,
        pointsToDeduct,
      });
      console.log(response.data);
      setIsModalOpen(false);
      navigate(`/exam/${selectedExamId}`);
    } catch (error) {
      console.error("Error taking exam:", error);
    }
  };

  const handleCancelTakeExam = () => {
    setSelectedExamId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        ບົດສອບເສັງ
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                ຫົວຂໍ້ສອບເສັງ: {exam.title}
              </h2>
              <p className="text-gray-600 mb-4">ລາຍລະອຽດ: {exam.description}</p>
              <p className="text-gray-600 mb-4">
                ຄະແນນທີ່ຕ້ອງການ: {exam.requiredPoints}
              </p>
              <button
                onClick={() => takeExam(exam._id)}
                className={`px-4 py-2 rounded-md transition ${
                  takenExams.includes(exam._id)
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={takenExams.includes(exam._id)}
              >
                {takenExams.includes(exam._id) ? "ເຂົ້າສອບເສັງແລ້ວ" : "ເຂົ້າສອບເສັງ"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedExamId && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onCancel={handleCancelTakeExam}
          onConfirm={handleConfirmTakeExam}
          requiredPoints={
            exams.find((exam) => exam._id === selectedExamId).requiredPoints
          }
        />
      )}
    </div>
  );
}

export default Exam;
