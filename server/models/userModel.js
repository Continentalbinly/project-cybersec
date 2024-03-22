const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add userName"],
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
      default: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
