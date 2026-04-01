const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

async function evaluateAssignmentWithRubric(assignmentText, rubricText) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("No GEMINI_API_KEY found. Returning mock evaluation.");
    return getMockEvaluation();
  }
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json" }
    });
    
    const prompt = `
      System: You are an expert academic evaluator for university-level assignments.
      Task: Analyze the provided student assignment against the grading rubric.
      
      Rubric:
      ${rubricText}
      
      Assignment Content:
      ${assignmentText.substring(0, 30000)}
      
      Instructions:
      1. Predict a score (0-100) based on how well the assignment meets rubric criteria.
      2. Identify specific strengths and critical missing parts.
      3. Evaluate plagiarism risk based on structural patterns and external knowledge.
      4. Break down each rubric criterion and its fulfillment status.
      
      Output Schema:
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
            "status": "met" | "partial" | "missing",
            "score": string
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/gi, "").replace(/```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Evaluation error:", error);
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
    plagiarismRisk: "Low (Mock Match 10%)",
    rubricBreakdown: [
      { criterion: "Introduction", status: "met", score: "20/20" },
      { criterion: "Methodology", status: "partial", score: "20/30" },
      { criterion: "Formatting", status: "missing", score: "5/10" }
    ]
  };
}

module.exports = { evaluateAssignmentWithRubric };
