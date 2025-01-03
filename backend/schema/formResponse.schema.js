const mongoose = require("mongoose");

// FormResponse Schema
const formResponseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form", // Reference to the Form model
    required: true,
  },
  responses: [
    {
      label: { type: String, required: true }, // Label of the question/field
      answer: { type: mongoose.Schema.Types.Mixed, required: true }, // User's response
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Timestamp when the response was saved
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the response was last updated
});

formResponseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const FormResponse = mongoose.model("FormResponse", formResponseSchema);

module.exports = FormResponse;
