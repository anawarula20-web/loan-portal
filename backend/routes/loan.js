import express from "express";
import Loan from "../models/Loan.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Apply Loan
router.post("/apply", upload.single("uploadPan"), async (req, res) => {
  try {
    const { userId, loanType, requiredAmount, pan, purpose } = req.body;
    const panFilePath = req.file ? req.file.path : "uploads/pan";

    const loan = await Loan.create({
      userId,
      loanType,
      requiredAmount,
      pan,
      uploadPan: req.file.path, // Store file path in DB
      purpose
    });

    res.json({ success: true, loan });
  } catch (err) {
    res.status(500).json({ message: "Loan apply failed" });
  }
});

// Get customer loans
router.get("/user/:id", async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.id });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching loans" });
  }
});

// Admin: get all loans
router.get("/all", async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all loans" });
  }
});

// Admin: update status
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Loan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
});

export default router;