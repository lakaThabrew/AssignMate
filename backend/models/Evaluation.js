const mongoose = require("mongoose");

const RubricBreakdownSchema = new mongoose.Schema({
  criterion: String,
  status: String,
  score: String
}, { _id: false });

const EvaluationSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  scorePredicted: { type: Number, required: true },
  strengths: [String],
  weaknesses: [String],
  missingCriteria: [String],
  suggestions: [String],
  plagiarismRisk: String,
  rubricBreakdown: [RubricBreakdownSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Evaluation", EvaluationSchema);
