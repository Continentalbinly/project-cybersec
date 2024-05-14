const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam", // Reference to the Exam model
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
