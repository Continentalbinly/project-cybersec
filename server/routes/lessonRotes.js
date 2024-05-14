const express = require("express");
const {
  createLessonController,
  getLessonsController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController,
} = require("../controllers/lessonController");

const router = express.Router();

// Create a lesson
router.post("/createlesson", createLessonController);

// Get all lessons
router.get("/getlessons", getLessonsController);

// Get lesson by ID
router.get("/:lessonId", getLessonByIdController);

// Update lesson by ID
router.put("/:lessonId", updateLessonController);

// Delete lesson by ID
router.delete("/:lessonId", deleteLessonController);

module.exports = router;
