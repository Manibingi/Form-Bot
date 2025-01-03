const express = require("express");
const {
  createFolder,
  createFormBot,
  getFolders,
  deleteFolderById,
} = require("../controllers/folder.controller");
const router = express.Router();
const auth = require("../middlewares/auth.middleware"); // Middleware for user authentication

// Route to create a new folder
router.post("/create-folder", auth, createFolder);

// Route to create a form bot in a folder
router.post("/create-form-bot", auth, createFormBot);

// Route to get all folders of the user
router.get("/folders/:id", auth, getFolders);

// Define the route for fetching forms by folder ID

router.delete("/folder/:folderId", deleteFolderById);

module.exports = router;
