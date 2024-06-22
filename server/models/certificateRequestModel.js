const mongoose = require("mongoose");

const CertificateRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    adminResponseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CertificateRequest", CertificateRequestSchema);
