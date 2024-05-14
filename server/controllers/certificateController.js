const Certificate = require("../models/certificateModel");

// Request certificate
const requestCertificateController = async (req, res) => {
  const { userId, examId, score } = req.body;
  try {
    const certificate = await Certificate.create({ userId, examId, score });
    res.status(201).json({
      success: true,
      message: "Certificate request created successfully",
      certificate,
    });
  } catch (error) {
    console.error("Error creating certificate request:", error);
    res.status(500).json({
      success: false,
      message: "Error creating certificate request",
      error: error.message,
    });
  }
};

// Get all certificate requests
const getCertificateRequestsController = async (req, res) => {
  try {
    const certificateRequests = await Certificate.find({ approved: false });
    res.status(200).json({
      success: true,
      message: "Certificate requests retrieved successfully",
      certificateRequests,
    });
  } catch (error) {
    console.error("Error fetching certificate requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching certificate requests",
      error: error.message,
    });
  }
};

// Approve certificate request
const approveCertificateController = async (req, res) => {
  const { certificateId } = req.params;
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      certificateId,
      { approved: true },
      { new: true }
    );
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate request not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Certificate request approved successfully",
      certificate,
    });
  } catch (error) {
    console.error("Error approving certificate request:", error);
    res.status(500).json({
      success: false,
      message: "Error approving certificate request",
      error: error.message,
    });
  }
};

module.exports = {
  requestCertificateController,
  getCertificateRequestsController,
  approveCertificateController,
};
