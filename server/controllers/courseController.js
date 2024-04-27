const courseModel = require("../models/courseModel");

// CRUD operations for courses
const createCourseController = async (req, res) => {
    try {
      const newCourse = await courseModel.create(req.body);
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course: newCourse,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({
        success: false,
        message: "Error creating course",
        error: error.message,
      });
    }
  };
  
  const getCoursesController = async (req, res) => {
    try {
      const courses = await courseModel.find({});
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        courses,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching courses",
        error: error.message,
      });
    }
  };
  
  const getCourseByIdController = async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await courseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Course retrieved successfully",
        course,
      });
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching course",
        error: error.message,
      });
    }
  };
  
  const updateCourseController = async (req, res) => {
    const { courseId } = req.params;
    try {
      const updatedCourse = await courseModel.findByIdAndUpdate(
        courseId,
        req.body,
        { new: true }
      );
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({
        success: false,
        message: "Error updating course",
        error: error.message,
      });
    }
  };
  
  const deleteCourseController = async (req, res) => {
    const { courseId } = req.params;
    try {
      const deletedCourse = await courseModel.findByIdAndDelete(courseId);
      if (!deletedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        course: deletedCourse,
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting course",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createCourseController,
    getCoursesController,
    getCourseByIdController,
    updateCourseController,
    deleteCourseController,
  };