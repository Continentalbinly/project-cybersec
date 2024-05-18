import React, { useState, useEffect } from "react";
import axios from "axios";

const LessonForm = ({ lesson, onClose, onRefresh }) => {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lab, setLab] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    if (lesson) {
      setLessonTitle(lesson.title);
      setLessonContent(lesson.description);
      setLab(lesson.lab);
      setQuestion(lesson.question);
      setAnswer(lesson.answer);
      setScore(lesson.score);
    }
  }, [lesson]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lessonData = {
      title: lessonTitle,
      description: lessonContent,
      lab,
      question,
      answer,
      score,
    };

    try {
      let response;
      if (lesson) {
        response = await axios.put(
          `/lesson/updatelesson/${lesson._id}`,
          lessonData
        );
      } else {
        response = await axios.post("/lesson/createlesson", lessonData);
      }
      if (response.data.success) {
        console.log("Lesson saved successfully:", response.data.lesson);
        onClose();
        onRefresh();
      } else {
        console.error("Error saving lesson:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-full w-3/4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {lesson ? "Edit Lesson" : "Add Lesson"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="flex flex-col ">
            <label
              htmlFor="lessonTitle"
              className="text-lg font-medium text-black"
            >
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
            <label
              htmlFor="lessonContent"
              className="text-lg font-medium text-black"
            >
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
            <label htmlFor="lab" className="text-lg font-medium text-black">
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
            <label
              htmlFor="question"
              className="text-lg font-medium text-black"
            >
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
            <label htmlFor="answer" className="text-lg font-medium text-black">
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
            <label htmlFor="score" className="text-lg font-medium text-black">
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
              {lesson ? "Update Lesson" : "Add Lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;
