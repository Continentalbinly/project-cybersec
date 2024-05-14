const Redeem = require("../models/redeemModel");

// Create a redeem request
const createRedeemController = async (req, res) => {
  try {
    const newRedeem = await Redeem.create(req.body);
    res.status(201).json({
      success: true,
      message: "Redeem request created successfully",
      redeem: newRedeem,
    });
  } catch (error) {
    console.error("Error creating redeem request:", error);
    res.status(500).json({
      success: false,
      message: "Error creating redeem request",
      error: error.message,
    });
  }
};

// Get all redeem requests
const getRedeemsController = async (req, res) => {
  try {
    const redeems = await Redeem.find({});
    res.status(200).json({
      success: true,
      message: "Redeem requests retrieved successfully",
      redeems,
    });
  } catch (error) {
    console.error("Error fetching redeem requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching redeem requests",
      error: error.message,
    });
  }
};

// Get redeem request by ID
const getRedeemByIdController = async (req, res) => {
  const { redeemId } = req.params;
  try {
    const redeem = await Redeem.findById(redeemId);
    if (!redeem) {
      return res.status(404).json({
        success: false,
        message: "Redeem request not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Redeem request retrieved successfully",
      redeem,
    });
  } catch (error) {
    console.error("Error fetching redeem request by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching redeem request",
      error: error.message,
    });
  }
};

// Update redeem request by ID
const updateRedeemController = async (req, res) => {
  const { redeemId } = req.params;
  try {
    const updatedRedeem = await Redeem.findByIdAndUpdate(redeemId, req.body, {
      new: true,
    });
    if (!updatedRedeem) {
      return res.status(404).json({
        success: false,
        message: "Redeem request not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Redeem request updated successfully",
      redeem: updatedRedeem,
    });
  } catch (error) {
    console.error("Error updating redeem request:", error);
    res.status(500).json({
      success: false,
      message: "Error updating redeem request",
      error: error.message,
    });
  }
};

// Delete redeem request by ID
const deleteRedeemController = async (req, res) => {
  const { redeemId } = req.params;
  try {
    const deletedRedeem = await Redeem.findByIdAndDelete(redeemId);
    if (!deletedRedeem) {
      return res.status(404).json({
        success: false,
        message: "Redeem request not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Redeem request deleted successfully",
      redeem: deletedRedeem,
    });
  } catch (error) {
    console.error("Error deleting redeem request:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting redeem request",
      error: error.message,
    });
  }
};

module.exports = {
  createRedeemController,
  getRedeemsController,
  getRedeemByIdController,
  updateRedeemController,
  deleteRedeemController,
};
