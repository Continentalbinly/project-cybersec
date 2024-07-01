const mongoose = require("mongoose"); // Import mongoose

const Certificate = require("../models/certificateModel");
const CertificateRequest = require("../models/certificateRequestModel");
const User = require("../models/userModel"); // Adjusted import

// Create a new certificate
exports.createCertificate = async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all certificates
exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a certificate
exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a certificate request
exports.createCertificateRequest = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Check if there's a pending or approved certificate request for the user
    const existingRequest = await CertificateRequest.findOne({
      userId,
      status: { $in: ["Pending", "Approved"] },
    });

    if (existingRequest) {
      return res.status(407).json({
        message: "You already have a pending or approved certificate request.",
      });
    }

    // Fetch the certificate to get the minimum score
    const certificate = await Certificate.findOne({ courseId });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const minimumScore = certificate.minimumScore;

    // Fetch the user by userId (which is a string)
    const user = await User.findOne({ userId });

    if (!user || user.score < minimumScore) {
      return res
        .status(403)
        .json({ message: "User does not meet the minimum score requirement." });
    }
    // Deduct the minimum score from the user's total score
    user.score -= minimumScore;
    await user.save();

    // Create the certificate request
    const certificateRequest = new CertificateRequest({
      userId: user.userId, // Assuming you want to store the userId in the request
      courseId,
      status: "Pending",
    });

    await certificateRequest.save();
    res.status(201).json(certificateRequest);
  } catch (error) {
    console.error("Error creating certificate request:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all certificate requests
exports.getCertificateRequests = async (req, res) => {
  try {
    const certificateRequests = await CertificateRequest.find()
      .populate("userId") // Assuming userId is a reference to User model
      .populate("courseId"); // Assuming courseId is a reference to another model if needed
    res.status(200).json(certificateRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve or reject a certificate request
exports.updateCertificateRequestStatus = async (req, res) => {
  try {
    const certificateRequest = await CertificateRequest.findById(req.params.id);
    if (!certificateRequest) {
      return res.status(404).json({ message: "Certificate request not found" });
    }
    certificateRequest.status = req.body.status;
    certificateRequest.adminResponseDate = Date.now();
    await certificateRequest.save();
    res.status(200).json(certificateRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
