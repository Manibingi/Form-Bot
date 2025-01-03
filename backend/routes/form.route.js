const express = require("express");
const router = express.Router();

const {
  getFormsByFolderId,
  updateFormById,
  deleteFormById,
  getFormById,
  shareForm,
  getSharedForm,
  saveFormResponse,
  getFormResponses,
} = require("../controllers/form.controller");

router.get("/:folderId/forms", getFormsByFolderId);

router.get("/form/:formId", getFormById);

router.put("/form/:formId", updateFormById);
router.delete("/form/:formId", deleteFormById);

router.post("/share/:formId", shareForm);
// Route to get form by shareable link
router.get("/share/:linkId", getSharedForm);

router.post("/save-response", saveFormResponse);
router.get("/resonses/:formId", getFormResponses);

module.exports = router;
