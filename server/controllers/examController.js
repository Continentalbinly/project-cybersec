const Exam = require("../models/examModel");

// Create an exam
const createExamController = async (req, res) => {
  try {
    const newExam = await Exam.create(req.body);
    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam: newExam,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({
      success: false,
      message: "Error creating exam",
      error: error.message,
    });
  }
};

// Get all exams
const getExamsController = async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.status(200).json({
      success: true,
      message: "Exams retrieved successfully",
      exams,
    });
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching exams",
      error: error.message,
    });
  }
};

// Get exam by ID
const getExamByIdController = async (req, res) => {
  const { examId } = req.params;
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Exam retrieved successfully",
      exam,
    });
  } catch (error) {
    console.error("Error fetching exam by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching exam",
      error: error.message,
    });
  }
};

// Update exam by ID
const updateExamController = async (req, res) => {
  const { examId } = req.params;
  try {
    const updatedExam = await Exam.findByIdAndUpdate(examId, req.body, {
      new: true,
    });
    if (!updatedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      exam: updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({
      success: false,
      message: "Error updating exam",
      error: error.message,
    });
  }
};

// Delete exam by ID
const deleteExamController = async (req, res) => {
  const { examId } = req.params;
  try {
    const deletedExam = await Exam.findByIdAndDelete(examId);
    if (!deletedExam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
      exam: deletedExam,
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting exam",
      error: error.message,
    });
  }
};

module.exports = {
  createExamController,
  getExamsController,
  getExamByIdController,
  updateExamController,
  deleteExamController,
};
