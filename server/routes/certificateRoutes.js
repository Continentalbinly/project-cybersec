const express = require("express");
const {
  requestCertificateController,
  getCertificateRequestsController,
  approveCertificateController,
} = require("../controllers/certificateController");

const router = express.Router();

// Request certificate
router.post("/request", requestCertificateController);

// Get all certificate requests (admin)
router.get("/requests", getCertificateRequestsController);

// Approve certificate request (admin)
router.put("/approve/:certificateId", approveCertificateController);

module.exports = router;
