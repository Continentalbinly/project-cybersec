const mongoose = require("mongoose");

const redeemRequestSchema = new mongoose.Schema({
  redeemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Redeem",
    required: true,
  },
  redeemName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  express: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pointRequire: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RedeemRequest = mongoose.model("RedeemRequest", redeemRequestSchema);
module.exports = RedeemRequest;
