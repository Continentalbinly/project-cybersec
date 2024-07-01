const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add userName"],
      trim: true,
    },
    userSurname: {
      type: String,
      required: [true, "Please add userSurname"],
      trim: true,
    },
    userBirthday: {
      type: Date,
      required: [true, "Please add userBirthday"],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, "Please add userEmail"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "Please add userId"],
      unique: true,
      trim: true,
    },
    passWord: {
      type: String,
      required: [true, "Please add passWord"],
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      trim: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    point: {
      type: Number,
      default: 0,
    },
    taskTaken: [
      {
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
          required: true,
        },
        correctAnswer: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    examsStatistics: [
      {
        examId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exam",
          required: true,
        },
        score: {
          type: Number,
          default: 0,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    userImg: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/174/296/png-transparent-anonymous-logo-hacktivism-anonymous-mask-white-people-monochrome.png",
    },
    status: {
      type: Number,
      default: 0,
    },
    examsTaken: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
