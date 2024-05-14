import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Addlesson() {
  const { id } = useParams();
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lesson submitted:", { lessonTitle, lessonContent });
    setLessonTitle("");
    setLessonContent("");
  };

  return (
    <div>
      <h2>Add Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lessonTitle">Lesson Title:</label>
          <input
            type="text"
            id="lessonTitle"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lessonContent">Lesson Content:</label>
          <textarea
            id="lessonContent"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Lesson</button>
      </form>
    </div>
  );
}

export default Addlesson;
