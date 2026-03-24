import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, mobile, email, dob, password } = req.body;

    const existing = await User.findOne({ mobile, $or: [{ email }] });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      mobile,
      email,
      dob,
      password,
      role: "customer"
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { mobile, password, role } = req.body;

    const user = await User.findOne({ mobile, password, role });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials or wrong role selected"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;