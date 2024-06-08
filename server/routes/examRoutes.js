const express = require("express");
const {
  createExamController,
  getExamsController,
  getExamByIdController,
  updateExamController,
  deleteExamController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
  submitAnswerController,
  takeExamController, 
} = require("../controllers/examController");

const router = express.Router();

// Exam routes
router.post("/createexam", createExamController);
router.get("/getexams", getExamsController);
router.get("/:examId", getExamByIdController);
router.put("/:examId", updateExamController);
router.delete("/:examId", deleteExamController);

// Task routes
router.post("/:examId/tasks", createTaskController);
router.put("/tasks/:taskId", updateTaskController);
router.delete("/tasks/:taskId", deleteTaskController);
router.post("/:examId/submit", submitAnswerController);

// Take exam route
router.post("/take/:examId", takeExamController); 

module.exports = router;
