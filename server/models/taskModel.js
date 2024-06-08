const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      answer: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
