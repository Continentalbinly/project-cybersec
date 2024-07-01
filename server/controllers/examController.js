const Exam = require("../models/examModel");
const Task = require("../models/taskModel");
const User = require("../models/userModel"); // Import the User model

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
    const exams = await Exam.find({}).populate("tasks");
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
    const exam = await Exam.findById(examId).populate("tasks");
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

// Add a task to an exam
const createTaskController = async (req, res) => {
  try {
    const { examId } = req.params;
    const { question, answers, score } = req.body;

    const task = new Task({
      examId,
      question,
      answers,
      score,
    });

    await task.save();

    // Find the exam and add the task
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    }

    exam.tasks.push(task._id);
    await exam.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Update a task in an exam
const updateTaskController = async (req, res) => {
  const { taskId } = req.params;
  const { question, answer, score } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { question, answer, score },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

// Delete a task from an exam
const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const exam = await Exam.findById(deletedTask.examId);
    exam.tasks.pull(taskId);
    await exam.save();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message,
    });
  }
};

const submitAnswerController = async (req, res) => {
  const { examId } = req.params;
  const { userId, answers } = req.body; // Expect userId and answers in the request body

  try {
    const exam = await Exam.findById(examId).populate("tasks");
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    let totalScore = 0;
    let correctAnswersCount = 0;

    for (const { taskId, userAnswer } of answers) {
      const task = exam.tasks.find((t) => t._id.toString() === taskId);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
      const correctAnswerObj = task.answers.find((a) => a.correct === true);
      const correctAnswer = correctAnswerObj.answer;

      console.log(
        `Task ID: ${taskId}, User Answer: ${userAnswer}, Correct Answer: ${correctAnswer}`
      );

      if (correctAnswer === userAnswer) {
        totalScore += task.score;
        correctAnswersCount++;
      }
    }

    // Update user score
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.score += totalScore; // Add the score to user's points

    // Update exams statistics
    const examStatisticsIndex = user.examsStatistics.findIndex(
      (stat) => stat.examId.toString() === examId
    );

    const currentDate = new Date();

    if (examStatisticsIndex !== -1) {
      // If the user has already taken this exam, update the score and createdAt
      user.examsStatistics[examStatisticsIndex].score += totalScore;
    } else {
      // Otherwise, add a new entry for this exam
      user.examsStatistics.push({
        examId: examId,
        score: totalScore,
        createdAt: currentDate,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Answers submitted successfully",
      score: totalScore,
      correctAnswersCount,
    });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting answers",
      error: error.message,
    });
  }
};

// Take an exam
const takeExamController = async (req, res) => {
  const { examId } = req.params;
  const { userId, pointsToDeduct } = req.body;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user has already taken the exam
    if (user.examsTaken.includes(examId)) {
      return res.status(400).json({
        success: false,
        message: "You have already taken this exam",
      });
    }

    if (user.point < pointsToDeduct) {
      return res.status(400).json({
        success: false,
        message: "Insufficient points",
      });
    }

    user.point -= pointsToDeduct;
    user.examsTaken.push(examId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Exam taken successfully",
    });
  } catch (error) {
    console.error("Error taking exam:", error);
    res.status(500).json({
      success: false,
      message: "Error taking exam",
      error: error.message,
    });
  }
};
//get User Taken Exam
const getUserExamsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("examsTaken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User exams retrieved successfully",
      examsTaken: user.examsTaken,
    });
  } catch (error) {
    console.error("Error fetching user exams:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user exams",
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
  createTaskController,
  deleteTaskController,
  updateTaskController,
  submitAnswerController,
  takeExamController,
  getUserExamsController,
};
