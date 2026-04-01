const express = require("express");
const Evaluation = require("../models/Evaluation");
const router = express.Router();

// Get recent evaluations (history)
router.get("/", async (req, res) => {
  try {
    const evaluations = await Evaluation.find().sort({ createdAt: -1 }).limit(10);
    res.json(evaluations);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to load history." });
  }
});

module.exports = router;
