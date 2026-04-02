const express = require("express");
const Evaluation = require("../models/Evaluation");
const router = express.Router();

const logger = require("../utils/logger");

function getRequesterContext(req) {
  const email = String(req.headers["x-user-email"] || "").trim().toLowerCase();
  const roleRaw = String(req.headers["x-user-role"] || "student").trim().toLowerCase();
  const role = roleRaw === "lecturer" ? "lecturer" : "student";

  return { email, role };
}

// Get recent evaluations (history)
router.get("/", async (req, res) => {
  try {
    const { email, role } = getRequesterContext(req);
    const query = email
      ? { userEmail: email }
      : { isGuest: true, userRole: role };

    const evaluations = await Evaluation.find(query).sort({ createdAt: -1 }).limit(20);
    res.json(evaluations);
  } catch (err) {
    logger.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to load history." });
  }
});

// Get single evaluation by ID
router.get("/:id", async (req, res) => {
  try {
    const { email, role } = getRequesterContext(req);
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) return res.status(404).json({ error: "Not found" });

    const isOwner = email && evaluation.userEmail === email;
    const isSameGuestRole = !email && evaluation.isGuest && evaluation.userRole === role;
    if (!isOwner && !isSameGuestRole) {
      return res.status(403).json({ error: "You are not allowed to access this evaluation." });
    }

    res.json(evaluation);
  } catch (err) {
    logger.error("Error fetching single evaluation:", err);
    res.status(500).json({ error: "Failed to load evaluation." });
  }
});

module.exports = router;
