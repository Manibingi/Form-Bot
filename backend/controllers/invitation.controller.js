// controllers/invitationController.js
const User = require("../schema/user.schema");
const ShareableLink = require("../schema/folderShare.schema");
const Folder = require("../schema/folder.schema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Helper function to generate unique links
const generateUniqueLink = () => {
  return `http://localhost:8000/invite/${crypto
    .randomBytes(20)
    .toString("hex")}`;
};

// Helper function to send email
const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

// Invite a user to access a folder
exports.inviteUser = async (req, res) => {
  const { email, accessType, folderId } = req.body;

  try {
    // Check if the user is registered
    const user = await User.findOne({ email });

    if (user) {
      // Add the registered user to the folder's sharedWith
      const folder = await Folder.findById(folderId);
      if (!folder) return res.status(404).json({ message: "Folder not found" });

      const alreadyShared = folder.sharedWith.find(
        (entry) => entry.email === email
      );

      if (!alreadyShared) {
        folder.sharedWith.push({ email, accessType });
        await folder.save();
      }

      // Send an email notification
      await sendEmail(
        email,
        "You have been invited to access a folder",
        `You have been granted ${accessType} access to the folder: ${folder.name}`
      );

      return res
        .status(200)
        .json({ message: "Invitation sent to registered user" });
    } else {
      // Generate a shareable link for unregistered user
      const link = generateUniqueLink();

      const newLink = new ShareableLink({
        email,
        accessType,
        link,
      });
      await newLink.save();

      // Send an email with the link
      await sendEmail(
        email,
        "Invitation to access a folder",
        `You have been invited to access a folder. Use the following link to register and gain ${accessType} access: ${link}`
      );

      return res.status(200).json({
        message: "Invitation sent to unregistered user",
        link,
      });
    }
  } catch (error) {
    console.error("Error inviting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle accessing the shareable link
exports.accessShareableLink = async (req, res) => {
  const { token } = req.params;

  try {
    const link = await ShareableLink.findOne({
      link: `http://localhost:8000/invite/${token}`,
    });

    if (!link)
      return res.status(404).json({ message: "Invalid or expired link" });

    // Redirect the user to register or login
    res.status(200).json({
      message: "Valid link",
      email: link.email,
      accessType: link.accessType,
    });
  } catch (error) {
    console.error("Error accessing shareable link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
