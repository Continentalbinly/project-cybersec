const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    MenuName: {
      type: String,
      required: [true, "Please add MenuName"],
      trim: true,
    },
    Categlory: {
      type: String,
      required: [true, "Please add Categlory"],
      trim: true,
    },
    Price: {
      type: Number,
      required: [true, "Please add Price"],
      trim: true,
    },
    ImageURL: {
      type: String,
      required: [true, "Please add ImageURL"],
      trim: true,
    },
    Priority: {
      type: Number,
    },
    createBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Menu", menuSchema);
