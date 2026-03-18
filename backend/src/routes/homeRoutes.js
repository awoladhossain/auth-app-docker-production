const express = require("express");
const protect = require("../middleware/auth");

const router = express.Router();

// ── Public Route ──────────────────────────────
// GET /api/home/public
router.get("/public", (req, res) => {
  res.json({
    success: true,
    message: "This is a public route, anyone can see it",
  });
});

// ── Private Route ─────────────────────────────
// GET /api/home/private  (protect middleware দিলাম)
router.get("/private", protect, (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.user.name}! This is a private route`,
    user: req.user,
  });
});

module.exports = router;
