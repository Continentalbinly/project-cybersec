import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddLesson() {
  const { id } = useParams(); // Retrieve the `id` parameter from the URL
  const navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:8080/api/v1";

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lab, setLab] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lessonData = {
      course_id: id, // Use the `id` parameter from the URL
      title: lessonTitle,
      description: lessonContent,
      lab: lab,
      question: question,
      answer: answer,
      score: score,
    };

    try {
      const response = await axios.post("/lesson/createlesson", lessonData);
      if (response.data.success) {
        console.log("Lesson created successfully:", response.data.lesson);
        setLessonTitle("");
        setLessonContent("");
        setLab("");
        setQuestion("");
        setAnswer("");
        setScore("");
        alert("Lesson created successfully!");
        navigate(-1); // Navigate back to the previous page
      } else {
        console.error("Error creating lesson:", response.data.message);
        alert("Error creating lesson: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">Add Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="lessonTitle" className="text-lg font-medium">
            Lesson Title:
          </label>
          <input
            type="text"
            id="lessonTitle"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lessonContent" className="text-lg font-medium">
            Lesson Content:
          </label>
          <textarea
            id="lessonContent"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            className="border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="lab" className="text-lg font-medium">
            Lab:
          </label>
          <input
            type="text"
            id="lab"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="question" className="text-lg font-medium">
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="answer" className="text-lg font-medium">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="score" className="text-lg font-medium">
            Score:
          </label>
          <input
            type="number"
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
}

export default AddLesson;
