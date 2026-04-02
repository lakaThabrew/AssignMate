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
  const filePath = req.file ? req.file.path : null;
  
  try {
    const { rubricText, academicLevel } = req.body;
    const file = req.file;

    if (!file || !rubricText) {
      if (filePath) fs.unlinkSync(filePath);
      return res.status(400).json({ error: "File and rubric text are required" });
    }

    // Read the uploaded file
    const dataBuffer = fs.readFileSync(filePath);
    
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

    if (!assignmentText || assignmentText.trim().length < 10) {
      throw new Error("Could not extract meaningful text from the document.");
    }

    // Evaluate
    console.log("Evaluating document...", file.originalname, "Level:", academicLevel);
    let evaluationData;
    try {
      evaluationData = await evaluateAssignmentWithRubric(assignmentText, rubricText, academicLevel);
    } catch (aiError) {
      console.error("AI Evaluation failed:", aiError);
      throw new Error("AI Engine failed to process this document. Please try again later.");
    }
    
    // Save to database
    const newDoc = new Evaluation({
      assignmentName: file.originalname,
      ...evaluationData
    });
    const savedEvaluation = await newDoc.save();

    // Clean up file immediately after success
    if (filePath) {
      fs.unlink(filePath, () => {}); // Async cleanup
    }

    res.json(savedEvaluation);
  } catch (error) {
    console.error("Evaluation Route Error:", error);
    // Cleanup on error
    if (filePath) {
      try { fs.unlinkSync(filePath); } catch(e){}
    }
    res.status(500).json({ error: error.message || "Failed to evaluate assignment." });
  }
});

module.exports = router;
