const express = require("express");
const {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
} = require("../controllers/courseController");

// Router object
const router = express.Router();

// Create
router.post("/createcourse", createCourseController);

// Fetch all courses
router.get("/getcourse", getCoursesController);

// Fetch course by ID
router.get("/:courseId", getCourseByIdController);

// Update course by ID
router.put("/:courseId", updateCourseController);

// Delete course by ID
router.delete("/:courseId", deleteCourseController);

// Export router
module.exports = router;
