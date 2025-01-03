const mongoose = require("mongoose");

const shareableFolder = new mongoose.Schema({
  email: { type: String, required: true }, // Email of the invitee
  accessType: { type: String, enum: ["view", "edit"], required: true }, // Access type
  link: { type: String, required: true }, // The unique link generated
  createdAt: { type: Date, default: Date.now }, // Timestamp for link creation
  expiresAt: { type: Date }, // Optional: Add expiry for the link
});

module.exports = mongoose.model("ShareableFolder", shareableFolder);
