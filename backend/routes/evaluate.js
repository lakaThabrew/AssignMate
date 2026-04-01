const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const mammoth = require("mammoth");
const { evaluateAssignmentWithRubric } = require("../utils/gemini");
const Evaluation = require("../models/Evaluation");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("assignment"), async (req, res) => {
  try {
    const rubricText = req.body.rubricText;
    const file = req.file;

    if (!file || !rubricText) {
      if (file) fs.unlinkSync(file.path);
      return res.status(400).json({ error: "File and rubric text are required" });
    }

    // Read the uploaded file
    const dataBuffer = fs.readFileSync(file.path);
    
    // Parse PDF/DOCX text
    let assignmentText = "";
    if (file.originalname.toLowerCase().endsWith('.pdf')) {
      const data = await pdfParse(dataBuffer);
      assignmentText = data.text;
    } else if (file.originalname.toLowerCase().endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer: dataBuffer });
      assignmentText = result.value;
    } else {
      assignmentText = dataBuffer.toString('utf-8');
    }

    // Evaluate
    console.log("Evaluating document...", file.originalname);
    let evaluationData;
    try {
      evaluationData = await evaluateAssignmentWithRubric(assignmentText, rubricText);
    } catch (aiError) {
      console.error("AI Evaluation failed, using safe fallback:", aiError);
      evaluationData = {
        scorePredicted: 0,
        strengths: [],
        weaknesses: ["AI analysis failed for this document."],
        missingCriteria: [],
        suggestions: ["Try re-uploading or simplifying the rubric."],
        plagiarismRisk: "Unknown",
        rubricBreakdown: []
      };
    }
    
    // Save to database
    const newDoc = new Evaluation({
      assignmentName: file.originalname,
      ...evaluationData
    });
    const savedEvaluation = await newDoc.save();

    // Clean up file
    try {
      fs.unlinkSync(file.path);
    } catch(e) {}

    res.json(savedEvaluation);
  } catch (error) {
    console.error("Evaluation Route Error:", error);
    try {
      if (req.file) fs.unlinkSync(req.file.path);
    } catch(e){}
    res.status(500).json({ error: "Failed to evaluate assignment." });
  }
});

module.exports = router;
