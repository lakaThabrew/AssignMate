const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { evaluateAssignmentWithRubric } = require("../utils/gemini");
const Evaluation = require("../models/Evaluation"); // ADDED
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("assignment"), async (req, res) => {
  try {
    const rubricText = req.body.rubricText;
    const file = req.file;

    if (!file || !rubricText) {
      return res.status(400).json({ error: "File and rubric text are required" });
    }

    // Read the uploaded file
    const dataBuffer = fs.readFileSync(file.path);
    
    // Parse PDF text
    let assignmentText = "";
    if (file.originalname.endsWith('.pdf')) {
      const data = await pdfParse(dataBuffer);
      assignmentText = data.text;
    } else {
      assignmentText = dataBuffer.toString('utf-8');
    }

    // Evaluate
    console.log("Evaluating document...", file.originalname);
    const evaluationData = await evaluateAssignmentWithRubric(assignmentText, rubricText);
    
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
