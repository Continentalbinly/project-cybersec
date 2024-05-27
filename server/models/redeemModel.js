const mongoose = require("mongoose");

const redeemSchema = new mongoose.Schema({
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
