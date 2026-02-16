import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: Number,
  tenure: Number,
  purpose: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);