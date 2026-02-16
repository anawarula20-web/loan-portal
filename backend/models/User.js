import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "customer"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);