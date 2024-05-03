const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   taskNumber: {
//     type: Number,
//     required: true,
//   },
//   question: {
//     type: String,
//     required: true,
//   },
//   point: {
//     type: Number,
//     required: true,
//   },
// });

// const lessonSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   lab: {
//     type: String,
//     required: true,
//   },
//   tasks: [taskSchema],
// });

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      default: "https://cxotoday.com/wp-content/uploads/2023/05/Cybersecurity.jpeg"
    },
    requirements: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
