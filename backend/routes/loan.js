import express from "express";
import Loan from "../models/Loan.js";

const router = express.Router();

// Apply Loan
router.post("/apply", async (req, res) => {
  try {
    const { userId, amount, tenure, purpose } = req.body;

    const loan = await Loan.create({
      userId,
      amount,
      tenure,
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