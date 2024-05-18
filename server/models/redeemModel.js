const mongoose = require("mongoose");

const redeemSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // status: {
  //   type: String,
  //   enum: ["Pending", "Accepted", "Rejected"],
  //   default: "Pending",
  // },
  // deliveryAddress: {
  //   type: String,
  //   required: true,
  // },
  // recipientName: {
  //   type: String,
  //   required: true,
  // },
  // phoneNumber: {
  //   type: String,
  //   required: true,
  // },
  itemsName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Redeem", redeemSchema);
