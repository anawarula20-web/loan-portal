import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  loanType: {
    type: String,
    required: true
  },
  requiredAmount: {
    type: Number,
    required: true
  },
  pan: {
    type: String,
    required: true,
    uppercase: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  }, // Store file path
  uploadPan: {
    type: String,
    required: true
  },
  purpose: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);