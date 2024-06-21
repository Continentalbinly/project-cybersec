import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ examId, task, onClose, onRefresh }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ answer: "", correct: false }]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (task) {
      setQuestion(task.question);
      setAnswers(task.answers);
      setScore(task.score);
    } else {
      resetForm();
    }
  }, [task]);

  const resetForm = () => {
    setQuestion("");
    setAnswers([{ answer: "", correct: false }]);
    setScore(0);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].correct = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await axios.put(`/exam/tasks/${task._id}`, {
          question,
          answers,
          score,
        });
      } else {
        await axios.post(`/exam/${examId}/tasks`, { question, answers, score });
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-full w-3/4">
        <h2 className="text-2xl font-semibold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Answers</label>
            {answers.map((answerObj, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={answerObj.answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mr-2 flex-grow px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={answerObj.correct}
                    onChange={(e) =>
                      handleCorrectChange(index, e.target.checked)
                    }
                    className="mr-2"
                  />
                  Correct
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setAnswers([...answers, { answer: "", correct: false }])
              }
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Answer
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Score</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {task ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
