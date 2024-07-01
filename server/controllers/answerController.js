const userModel = require("../models/userModel");
const lessonModel = require("../models/lessonModel");
const submissionModel = require("../models/submissionModel");

const submitAnswerController = async (req, res) => {
  try {
    const { userId, lessonId, answer } = req.body;

    // Check if the user has already submitted an answer for this lesson
    const existingSubmission = await submissionModel.findOne({
      userId,
      lessonId,
    });

    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        message: "Answer already submitted for this lesson",
      });
    }

    // Fetch the lesson to get the correct answer and point value
    const lesson = await lessonModel.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Check if the provided answer is correct
    if (lesson.answer !== answer) {
      return res.status(400).json({
        success: false,
        message: "Incorrect answer",
      });
    }

    // Find user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user points
    user.point += lesson.point;

    // Add the lesson to taskTaken array
    user.taskTaken.push({ lessonId });

    await user.save();

    // Record the submission
    await submissionModel.create({ userId, lessonId });

    res.status(200).json({
      success: true,
      message: "Answer submitted successfully. Points added.",
      user,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return res.status(500).json({
      success: false,
      message: "Error submitting answer",
      error: error.message,
    });
  }
};

module.exports = {
  submitAnswerController,
};
