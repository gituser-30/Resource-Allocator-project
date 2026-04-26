// backend/routes/user.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();



// PUT /update-profile/:id
router.put("/update-profile/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName: req.body.fullName,
        dob: req.body.dob,
        department: req.body.department, // ⭐ ADD THIS
      },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.json({ success: false, msg: "Error updating profile" });
  }
});


// ✅ Change password
router.put("/change-password/:id", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, msg: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ success: true, msg: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
