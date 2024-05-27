const express = require("express");
const {
  createRedeemRequestController,
  getRedeemRequestsController,
  approveRedeemRequestController,
  rejectRedeemRequestController,
} = require("../controllers/redeemRequestController");

const router = express.Router();

// Create a redeem request
router.post("/createrequest", createRedeemRequestController);

// Get all redeem requests
router.get("/getrequests", getRedeemRequestsController);

// Approve a redeem request by ID
router.post("/approve/:requestId", approveRedeemRequestController);

// Reject a redeem request by ID
router.post("/reject/:requestId", rejectRedeemRequestController);

module.exports = router;
