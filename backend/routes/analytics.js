const express = require("express");
const Evaluation = require("../models/Evaluation");
const logger = require("../utils/logger");
const router = express.Router();

// Get aggregated analytics for lecturers
router.get("/summary", async (req, res) => {
  try {
    const totalEvaluations = await Evaluation.countDocuments();

    if (totalEvaluations === 0) {
      return res.json({
        total: 0,
        avgScore: 0,
        scoreDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 },
        plagiarismSummary: { Low: 0, Medium: 0, High: 0 },
        commonWeaknesses: []
      });
    }

    const evaluations = await Evaluation.find();

    let totalScore = 0;
    const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    const plagiarism = { Low: 0, Medium: 0, High: 0 };
    const weaknessesMap = {};

    evaluations.forEach(evaluation => {
      // AVG Score
      totalScore += evaluation.scorePredicted;

      // Distribution
      if (evaluation.scorePredicted >= 80) distribution.A++;
      else if (evaluation.scorePredicted >= 70) distribution.B++;
      else if (evaluation.scorePredicted >= 60) distribution.C++;
      else if (evaluation.scorePredicted >= 50) distribution.D++;
      else distribution.F++;

      // Plagiarism
      const risk = evaluation.plagiarismRisk || "Low";
      plagiarism[risk] = (plagiarism[risk] || 0) + 1;

      // Weaknesses
      (evaluation.weaknesses || []).forEach(w => {
        weaknessesMap[w] = (weaknessesMap[w] || 0) + 1;
      });
    });

    const commonWeaknesses = Object.entries(weaknessesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([text, count]) => ({ text, count }));

    res.json({
      total: totalEvaluations,
      avgScore: Math.round(totalScore / totalEvaluations),
      scoreDistribution: distribution,
      plagiarismSummary: plagiarism,
      commonWeaknesses
    });
  } catch (err) {
    logger.error("Analytics error:", err);
    res.status(500).json({ error: "Failed to generate analytics." });
  }
});

module.exports = router;
