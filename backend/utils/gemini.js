const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key" });

const logger = require("./logger");

async function evaluateAssignmentWithRubric(assignmentText, rubricText, academicLevel = "University Undergraduate") {
  if (!process.env.GEMINI_API_KEY) {
    logger.warn("No GEMINI_API_KEY found. Returning mock evaluation.");
    return getMockEvaluation();
  }

  try {
    // Detect if rubric is structured JSON or plain text
    let parsedRubric;
    try { parsedRubric = JSON.parse(rubricText); } catch { parsedRubric = null; }

    const rubricSection = parsedRubric
      ? parsedRubric.map(c => `- ${c.name} (${c.weight}%): ${c.description || ''}`).join('\n')
      : rubricText;

    const prompt = `
      System: You are an expert academic evaluator for ${academicLevel} level assignments.

      RUBRIC CRITERIA:
      ${rubricSection}

      STUDENT ASSIGNMENT TEXT:
      ${assignmentText.substring(0, 28000)}

      TASK: Perform a rigorous, criterion-by-criterion evaluation. For each criterion:
      1. Find direct evidence in the assignment text (quote or paraphrase).
      2. Judge if the criterion is fully met, partial, or missing.
      3. Calculate a numeric score based on the criterion weight.

      RULES:
      - scorePredicted must be an integer 0-100, weighted sum of all criteria scores.
      - strengths: specific positive observations from the text (min 3).
      - weaknesses: specific problems or gaps found (min 2).
      - missingCriteria: criteria that are absent or severely underdeveloped.
      - suggestions: actionable improvements the student should make (min 3).
      - plagiarismRisk: "Low", "Medium", or "High" based on writing style, repetition, generic phrasing.
      - rubricBreakdown: one entry per criterion with a supporting evidence quote from the text.

      OUTPUT (strict JSON only, no markdown):
      {
        "scorePredicted": number,
        "strengths": string[],
        "weaknesses": string[],
        "missingCriteria": string[],
        "suggestions": string[],
        "plagiarismRisk": "Low" | "Medium" | "High",
        "rubricBreakdown": [
          {
            "criterion": string,
            "weight": number,
            "status": "met" | "partial" | "missing",
            "score": string,
            "coveragePercent": number,
            "supportingEvidence": string
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: "high" },
      },
    });

    const text = response.text.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    logger.error("Gemini 3 Evaluation error:", error);
    throw error;
  }
}

function getMockEvaluation() {
  return {
    scorePredicted: 85,
    strengths: ["Clear introduction", "Good use of academic references"],
    weaknesses: ["Methodology section lacks statistical validation detail"],
    missingCriteria: ["Code snippets were not included in the appendix"],
    suggestions: ["Elaborate on the dataset selection process", "Include code snippets"],
    plagiarismRisk: "Low",
    rubricBreakdown: [
      { criterion: "Introduction", weight: 20, status: "met", score: "20/20", coveragePercent: 95, supportingEvidence: "Mock evidence" },
      { criterion: "Methodology", weight: 30, status: "partial", score: "20/30", coveragePercent: 55, supportingEvidence: "Mock evidence" },
      { criterion: "Formatting", weight: 10, status: "missing", score: "5/10", coveragePercent: 10, supportingEvidence: "Mock evidence" }
    ]
  };
}

async function parseRubricText(rawText) {
  if (!process.env.GEMINI_API_KEY) {
    return [
      { name: 'Introduction', weight: 20, description: 'Clearly state the purpose' },
      { name: 'Analysis', weight: 40, description: 'Deep dive into findings' },
      { name: 'Conclusion', weight: 20, description: 'Summary of outcomes' },
      { name: 'Formatting', weight: 20, description: 'APA style compliance' },
    ];
  }

  try {
    const prompt = `
      Task: Convert the raw text below into a structured academic rubric.
      Text:
      ${rawText}

      Requirements:
      1. Identify individual grading components (criteria).
      2. For each, give a clear name and long description of what constitutes a good job.
      3. Assign an integer weight (0-100) such that the TOTAL SUM OF ALL WEIGHTS EQUALS EXACTLY 100.
      
      Output Schema:
      [
        {
          "name": string,
          "description": string,
          "weight": number
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: "low" },
      },
    });

    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    logger.error("Gemini 3 Rubric Parsing error:", error);
    throw error;
  }
}

module.exports = { evaluateAssignmentWithRubric, parseRubricText };
