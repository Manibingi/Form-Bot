const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  formBots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FormBot",
    },
  ],
});

module.exports = mongoose.model("Folder", folderSchema);