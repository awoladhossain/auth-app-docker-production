require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();

// ── Middleware ────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// ── DB Connect ────────────────────────────────
connectDB();

// ── Routes ────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

// ── Health Check ──────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "✅ Backend is running!" });
});

// ── 404 Handler ───────────────────────────────
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ── Start ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📌 Environment: ${process.env.NODE_ENV}`);
});
