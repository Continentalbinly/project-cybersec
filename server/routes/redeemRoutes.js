const express = require("express");
const {
  createRedeemController,
  getRedeemsController,
  getRedeemByIdController,
  updateRedeemController,
  deleteRedeemController,
} = require("../controllers/redeemController");

const router = express.Router();

// Create a redeem request
router.post("/createredeem", createRedeemController);

// Get all redeem requests
router.get("/getredeems", getRedeemsController);

// Get redeem request by ID
router.get("/:redeemId", getRedeemByIdController);

// Update redeem request by ID
router.put("/:redeemId", updateRedeemController);

// Delete redeem request by ID
router.delete("/:redeemId", deleteRedeemController);

module.exports = router;
