import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function Exam() {
  const [answers, setAnswers] = useState(Array(5).fill('')); // Assuming 5 SQL injection questions
  const [collectEffect, setCollectEffect] = useState(false);
  const [submittedIndexes, setSubmittedIndexes] = useState([]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (index) => {
    // Submit answer for a specific question
    console.log(`Answer for question ${index + 1} submitted:`, answers[index]);
    // You can implement your logic to submit answer to the server
    if (answers[index].toLowerCase() === 'banana') {
      setSubmittedIndexes([...submittedIndexes, index]);
    } else {
      // If answer is incorrect, you can set a flag to indicate incorrect submission
      setAnswers([...answers]); // This line is to force a re-render
      setSubmittedIndexes([...submittedIndexes]);
    }
  };

  useEffect(() => {
    if (submittedIndexes.length === 5) {
      setCollectEffect(true);
    }
  }, [submittedIndexes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">SQL Injection Examination</h2>
      <form>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Question 1: What is SQL injection?</h3>
          <input
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            type="text"
            value={answers[0]}
            onChange={(e) => handleAnswerChange(0, e.target.value)}
            placeholder="Your answer..."
          />
          {submittedIndexes.includes(0) && (
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex items-center"
            >
              <FaCheckCircle className="mr-2" />
              correct
            </button>
          )}
          {!submittedIndexes.includes(0) && (
            <div>
              <button
                type="button"
                onClick={() => handleSubmit(0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Submit
              </button>
              {answers[0].toLowerCase() !== 'banana' && (
                <p className="text-red-500">Incorrect answer. Try again!</p>
              )}
            </div>
          )}
        </div>
        {/* Repeat similar structure for other questions */}
      </form>
      {collectEffect && (
        <div className="mt-4 bg-green-200 p-4 rounded-md">
          <p className="text-green-800 font-bold">Congratulations! You collected all bananas!</p>
        </div>
      )}
    </div>
  );
}

export default Exam;
