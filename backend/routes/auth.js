const express = require("express");
const argon2 = require("argon2"); // ✅ replaced bcrypt
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto"); // needed for forgot password
const User = require("../models/User");

const router = express.Router();

// ================= Multer Setup =================
const profileDir = path.join(__dirname, "..", "uploads", "profiles");

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// ================= REGISTER =================
router.post("/register", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { fullName, email, password, dob } = req.body;

    // check existing user (optimized)
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 hash password using Argon2
    const hashedPassword = await argon2.hash(password);

    const user = new User({
      fullName,
      email,
      dob,
      password: hashedPassword,
      profilePhoto: req.file ? req.file.filename : null,
      verified: true
    });

    await user.save();

    res.json({ success: true, message: "User registered successfully!" });

  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 optimized query (only needed fields)
    const user = await User.findOne({ email })
      .select("+password email verified role fullName profilePhoto department");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in"
      });
    }

    // 🔐 verify password using Argon2
    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🎯 lightweight JWT (important for speed)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    // ❗ remove password before sending response
    user.password = undefined;

    return res.json({
      success: true,
      user,
      token
    });

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15;

    await user.save();

    // (Email sending optional)

    res.json({
      success: true,
      message: "Reset token generated"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;