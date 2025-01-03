const express = require("express");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const User = require("../schema/user.schema");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth.middleware");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require("../controllers/auth.controller");
const {
  inviteUser,
  accessShareableLink,
} = require("../controllers/invitation.controller");

const router = express.Router();

// Register a user
router.post(
  "/register",
  [
    check("userName", "userName is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// Update a user
router.put(
  "/updateUser",
  auth,
  [
    // Validate fields only if they are present in the request
    check("userName")
      .optional()
      .not()
      .isEmpty()
      .withMessage("userName is required"),
    check("email")
      .optional()
      .isEmail()
      .withMessage("Please include a valid email"),
    check("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the updateUser controller function
    updateUser(req, res);
  }
);

router.get("/getUser", auth, getUser);

// Login a user
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const transporter = nodemailer.createTransport(
  {
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-password", // Replace with your email password
    },
  },
  accessShareableLink
);

// Send invite email
router.post(
  "/invite/send",
  async (req, res) => {
    try {
      const { email, accessType } = req.body;

      // Email content
      const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Invitation to Access Folder",
        text: `You have been granted ${accessType} access to a folder. Click the link below to access it.`,
        html: `<p>You have been granted <strong>${accessType}</strong> access to a folder.</p>
             <p>Click <a href="your-link-here">here</a> to access it.</p>`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Invite sent successfully" });
    } catch (error) {
      console.error("Error sending invite:", error);
      return res.status(500).json({ error: "Failed to send invite" });
    }
  },
  inviteUser
);

router.post("/invite/generate-link", async (req, res) => {
  try {
    const { email, accessType } = req.body;

    // Create a unique link (you can customize this further)
    const link = `http://localhost:8000/access/${uuidv4()}?email=${email}&accessType=${accessType}`;

    // Optionally save this link to the database if needed
    // Example:
    // await ShareableLink.create({ email, accessType, link });

    return res.status(200).json({ link });
  } catch (error) {
    console.error("Error generating shareable link:", error);
    return res.status(500).json({ error: "Failed to generate link" });
  }
});

module.exports = router;
