const express = require("express");
const {
  createLessonController,
  getLessonsController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController,
  getLessonDetailByIdController,
} = require("../controllers/lessonController");

const { submitAnswerController } = require("../controllers/answerController"); // Import the controller

const router = express.Router();

// Create a lesson
router.post("/createlesson", createLessonController);

// Get all lessons
router.get("/getlessons", getLessonsController);

// Get lessons by course ID
router.get("/:courseId", getLessonByIdController);

// Get lesson detail by lesson ID
router.get("/detail/:lessonId", getLessonDetailByIdController);

// Update lesson by ID
router.put("/:lessonId", updateLessonController);

// Delete lesson by ID
router.delete("/:lessonId", deleteLessonController);

// Submit answer for a lesson
router.post("/submitAnswer", submitAnswerController); // Add this route

module.exports = router;
