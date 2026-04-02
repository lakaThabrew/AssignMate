const express = require("express");
const Evaluation = require("../models/Evaluation");
const router = express.Router();

const logger = require("../utils/logger");

// Get recent evaluations (history)
router.get("/", async (req, res) => {
  try {
    const evaluations = await Evaluation.find().sort({ createdAt: -1 }).limit(10);
    res.json(evaluations);
  } catch (err) {
    logger.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to load history." });
  }
});

// Get single evaluation by ID
router.get("/:id", async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) return res.status(404).json({ error: "Not found" });
    res.json(evaluation);
  } catch (err) {
    logger.error("Error fetching single evaluation:", err);
    res.status(500).json({ error: "Failed to load evaluation." });
  }
});

module.exports = router;
