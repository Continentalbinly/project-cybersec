const Lesson = require("../models/lessonModel");

// Create a lesson
const createLessonController = async (req, res) => {
  try {
    const newLesson = await Lesson.create(req.body);
    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson: newLesson,
    });
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({
      success: false,
      message: "Error creating lesson",
      error: error.message,
    });
  }
};

// Get all lessons
const getLessonsController = async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.status(200).json({
      success: true,
      message: "Lessons retrieved successfully",
      lessons,
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lessons",
      error: error.message,
    });
  }
};

// Get lesson by ID
const getLessonByIdController = async (req, res) => {
  const { lessonId } = req.params;
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lesson retrieved successfully",
      lesson,
    });
  } catch (error) {
    console.error("Error fetching lesson by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lesson",
      error: error.message,
    });
  }
};

// Update lesson by ID
const updateLessonController = async (req, res) => {
  const { lessonId } = req.params;
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, req.body, {
      new: true,
    });
    if (!updatedLesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).json({
      success: false,
      message: "Error updating lesson",
      error: error.message,
    });
  }
};

// Delete lesson by ID
const deleteLessonController = async (req, res) => {
  const { lessonId } = req.params;
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
      lesson: deletedLesson,
    });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting lesson",
      error: error.message,
    });
  }
};

module.exports = {
  createLessonController,
  getLessonsController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController,
};
