const express = require("express");
const {
  createExamController,
  getExamsController,
  getExamByIdController,
  updateExamController,
  deleteExamController,
} = require("../controllers/examController");

const router = express.Router();

// Create an exam
router.post("/createexam", createExamController);

// Get all exams
router.get("/getexams", getExamsController);

// Get exam by ID
router.get("/:examId", getExamByIdController);

// Update exam by ID
router.put("/:examId", updateExamController);

// Delete exam by ID
router.delete("/:examId", deleteExamController);

module.exports = router;
