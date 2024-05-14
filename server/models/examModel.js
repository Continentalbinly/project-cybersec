const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediumScore: {
    type: Number,
    default: null, // Optional field for medium score requirement
  },
});

module.exports = mongoose.model("Exam", examSchema);
