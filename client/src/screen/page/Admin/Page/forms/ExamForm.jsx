import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamForm = ({ exam, onClose, onRefresh }) => {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (exam) {
      setTitle(exam.title);
      setDescription(exam.description);
    }
  }, [exam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (exam) {
        await axios.put(`/${exam._id}`, { title, description });
      } else {
        await axios.post("/exam/createexam", { title, description });
      }
      onClose();
      onRefresh();
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-full w-3/4">
        <h2 className="text-xl font-semibold mb-4">
          {exam ? "Update Exam" : "Add New Exam"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-black mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-black mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {exam ? "Update Exam" : "Add Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;
