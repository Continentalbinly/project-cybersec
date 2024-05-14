const express = require("express");
const {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/taskController");

const router = express.Router();

// Create a task
router.post("/createtask", createTaskController);

// Get all tasks
router.get("/gettasks", getTasksController);

// Get task by ID
router.get("/:taskId", getTaskByIdController);

// Update task by ID
router.put("/:taskId", updateTaskController);

// Delete task by ID
router.delete("/:taskId", deleteTaskController);

module.exports = router;
