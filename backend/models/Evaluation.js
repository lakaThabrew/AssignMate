const mongoose = require("mongoose");

const RubricBreakdownSchema = new mongoose.Schema({
  criterion: String,
  weight: Number,
  status: { type: String, enum: ['met', 'partial', 'missing'], default: 'missing' },
  score: String,
  coveragePercent: Number,
  supportingEvidence: String
}, { _id: false });

const EvaluationSchema = new mongoose.Schema({
  assignmentName: { type: String, required: true },
  userEmail: { type: String, default: null, index: true },
  userName: { type: String, default: "" },
  userRole: { type: String, enum: ["student", "lecturer"], default: "student" },
  isGuest: { type: Boolean, default: true },
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
