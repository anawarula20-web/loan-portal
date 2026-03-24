import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  role: {
    type: String,
    default: "customer"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);