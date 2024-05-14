const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  course_id: {
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
  lab: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    require: true,
  },
  answer: {
    type: String,
    require: true,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
