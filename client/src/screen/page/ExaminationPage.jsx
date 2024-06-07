import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useWarning } from "../../context/WarningContext";
import WarningForm from "./Admin/Page/forms/WariningForm";
import { useAuthContext } from "../../hook/useAuth";

const TakeExamComponent = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const {
    showWarning,
    showWarning2,
    showWarning3,
    openWarning,
    closeWarning,
    openWarning2,
    closeWarning2,
    openWarning3,
    closeWarning3,
  } = useWarning();
  const { userData } = useAuthContext();
  const [exam, setExam] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    fetchExam();
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      openWarning3();
    }
  }, [timeLeft]);

  const fetchExam = async () => {
    try {
      const response = await axios.get(`/exam/${examId}`);
      setExam(response.data.exam);
    } catch (error) {
      console.error("Error fetching exam:", error);
    }
  };

  const handleAnswerChange = (taskId, answer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const index = newAnswers.findIndex((a) => a.taskId === taskId);
      if (index !== -1) {
        newAnswers[index].userAnswer = answer;
      } else {
        newAnswers.push({ taskId, userAnswer: answer });
      }
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    openWarning();
  };

  const handleForceCancel = async () => {
    openWarning2();
  };

  const handleCancel = () => {
    closeWarning();
  };

  const handleCancel2 = () => {
    closeWarning2();
  };

  const handleCancel3 = () => {
    closeWarning3();
    navigate(-1);
  };

  const confirmSubmit = async () => {
    try {
      console.log("Submitting answers:", userAnswers);
      const response = await axios.post(`/exam/${examId}/submit`, {
        userId: userData._id,
        answers: userAnswers,
      });
      closeWarning();
      navigate(-1);
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const confirmSubmitWhenTimeOut = async () => {
    try {
      console.log("Submitting answers:", userAnswers);
      const response = await axios.post(`/exam/${examId}/submit`, {
        userId: userData._id,
        answers: userAnswers,
      });
      setResult(response.data);
      closeWarning3();
      navigate(-1);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const confirmForceCancel = () => {
    handleCancel2();
    navigate(-1);
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-red-600 mb-4 text-2xl text-center">
        ເວລາສອບເສັງ: {formattedTime}
      </h1>

      <h1 className="text-2xl font-semibold mb-4 text-black">
        ຫົວຂໍ້: {exam.title}
      </h1>
      <p className="mb-4 text-black">ລາຍລະອຽດ: {exam.description}</p>
      {exam.tasks.map((task, index) => (
        <div key={task._id} className="border p-4 rounded mb-4 text-black">
          <h2 className="text-xl font-semibold">{`${index + 1}. ${
            task.question
          }`}</h2>{" "}
          {task.answers.map((answer, answerIndex) => (
            <div key={answerIndex} className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`task-${task._id}`}
                  value={answer.answer}
                  onChange={() => handleAnswerChange(task._id, answer.answer)}
                  className="form-radio"
                />
                <span className="ml-2">{answer.answer}</span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-between w-full">
        <button
          onClick={handleForceCancel}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          ຫຍຸດການເສັງ
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          ສົ່ງຄຳຕອບ
        </button>
      </div>

      {showWarning && (
        <WarningForm
          message="ກະລຸນາກວດກາຄຳຕອບຂອງທ່ານໃຫ້ພ້ອມກ່ອນທຳການສົ່ງ!!!"
          onConfirm={confirmSubmit}
          onCancel={handleCancel}
        />
      )}
      {showWarning2 && (
        <WarningForm
          message="ທ່ານຕ້ອງການຫຍຸດຫຼືບໍ່??"
          onConfirm={confirmForceCancel}
          onCancel={handleCancel2}
        />
      )}
      {showWarning3 && (
        <WarningForm
          message="ເວລາໝົດ!!!"
          onConfirm={confirmSubmitWhenTimeOut}
          onCancel={handleCancel3}
        />
      )}
    </div>
  );
};

export default TakeExamComponent;
