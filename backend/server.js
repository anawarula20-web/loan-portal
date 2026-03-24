import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import loanRoutes from "./routes/loan.js";

dotenv.config();

const app = express();

// CORS (production ready)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://loan-portal-phi.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Health check route for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Dynamic Port (Render ke liye important)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));