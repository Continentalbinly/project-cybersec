const RedeemRequest = require("../models/RedeemRequestModel");
const User = require("../models/userModel");

const createRedeemRequestController = async (req, res) => {
  try {
    const redeemRequest = new RedeemRequest(req.body);
    await redeemRequest.save();
    res.status(201).send({ success: true, redeemRequest });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

const getRedeemRequestsController = async (req, res) => {
  try {
    const redeemRequests = await RedeemRequest.find({});
    res.status(200).send({ success: true, redeemRequests });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const approveRedeemRequestController = async (req, res) => {
  try {
    const redeemRequest = await RedeemRequest.findByIdAndUpdate(
      req.params.requestId,
      { status: "approved" },
      { new: true }
    );
    if (!redeemRequest) {
      return res
        .status(404)
        .send({ success: false, error: "Request not found" });
    }
    res.status(200).send({ success: true, redeemRequest });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const rejectRedeemRequestController = async (req, res) => {
  try {
    const redeemRequest = await RedeemRequest.findByIdAndUpdate(
      req.params.requestId,
      { status: "rejected" },
      { new: true }
    );

    if (!redeemRequest) {
      return res
        .status(404)
        .send({ success: false, error: "Request not found" });
    }

    // Find the user and return the points
    const user = await User.findById(redeemRequest.userId);
    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }

    user.point += redeemRequest.pointRequire;
    await user.save();

    res.status(200).send({ success: true, redeemRequest, user });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  createRedeemRequestController,
  getRedeemRequestsController,
  approveRedeemRequestController,
  rejectRedeemRequestController,
};
