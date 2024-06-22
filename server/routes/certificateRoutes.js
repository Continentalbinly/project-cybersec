const express = require("express");
const router = express.Router();
const {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
  createCertificateRequest,
  getCertificateRequests,
  updateCertificateRequestStatus
} = require("../controllers/certificateController");

// Certificate routes
router.post("/create", createCertificate);
router.get("/get", getCertificates);
router.get("/:id", getCertificateById);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

// Certificate request routes
router.post("/request/post", createCertificateRequest); // Create a certificate request
router.get("/request/get", getCertificateRequests); // Get all certificate requests
router.put("/request/get/:id", updateCertificateRequestStatus); // Update certificate request status

module.exports = router;
