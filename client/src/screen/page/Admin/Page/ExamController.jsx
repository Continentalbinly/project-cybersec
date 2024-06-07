import React, { useState, useEffect } from "react";
import axios from "axios";
import ExamForm from "./forms/ExamForm";
import TaskForm from "./forms/TaskForm";
import TaskList from "./components/TaskListComponent";

function ExamController() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showExamForm, setShowExamForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("/exam/getexams");
      setExams(response.data.exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleDeleteExam = async (examId) => {
    try {
      await axios.delete(`/exam/${examId}`);
      fetchExams();
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setShowExamForm(true);
  };

  const handleCloseExamForm = () => {
    setSelectedExam(null);
    setShowExamForm(false);
  };

  const handleAddTask = (exam) => {
    setSelectedExam(exam);
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setSelectedTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/exam/tasks/${taskId}`);
      fetchExams();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Exam Controller</h1>
      <button
        onClick={() => setShowExamForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add New Exam
      </button>
      <div className="mt-4">
        {exams.map((exam) => (
          <div key={exam._id} className="border p-4 rounded mb-4">
            <h2 className="text-xl font-semibold">{exam.title}</h2>
            <p>{exam.description}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEditExam(exam)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteExam(exam._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <TaskList
                tasks={exam.tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
              <button
                onClick={() => handleAddTask(exam)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-2"
              >
                Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
      {showExamForm && (
        <ExamForm
          exam={selectedExam}
          onClose={handleCloseExamForm}
          onRefresh={fetchExams}
        />
      )}
      {showTaskForm && selectedExam && (
        <TaskForm
          examId={selectedExam._id}
          task={selectedTask}
          onClose={handleCloseTaskForm}
          onRefresh={fetchExams}
        />
      )}
    </div>
  );
}

export default ExamController;
