const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  lesson_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
  },
});

module.exports = mongoose.model("Task", taskSchema);
