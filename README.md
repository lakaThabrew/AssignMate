# AssignMate Pro

## Selected Domain
Education Technology (EdTech) & Generative AI

## Problem Statement
Grading academic assignments is a time-consuming and manual process for educators. Furthermore, students often lack detailed pre-submission feedback on how well their work aligns with the complex criteria defined in an assignment rubric. This leaves a gap in formative assessment, causing students to miss key requirements and causing educators to spend excess time reiterating missing components rather than providing higher-level guidance.

## Proposed Solution
AssignMate Pro is a rubric-aware academic evaluation system driven by Generative AI and Document Analysis methods. It allows lecturers to upload or generate structured grading rubrics. Students can upload their assignments (PDF/DOCX) prior to final submission to receive detailed, automated AI-generated feedback. The system breaks down the assignment against each criteria block in the rubric, highlighting strengths, weaknesses, missing criteria, predicted scores, and potential plagiarism risks. This gives lecturers a detailed class overview and saves grading time, while helping students improve their submissions iteratively.

## Team Details
- **Team Name**: [Insert Team Name Here]
- **Members**: [Insert Members Here]
- **University**: [Insert University Here]
- **Selected Domain**: Education Technology (EdTech) & Generative AI

## Technology Stack & Architecture Overview
- **Frontend**: React.js (Vite), CSS/Vanilla styling with modern UI considerations.
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **AI Integration**: Google Generative AI (Gemini APIs) for advanced rubric parsing, feedback generation, and embeddings.
- **Document Parsing**: `pdf-parse` for robust PDF extraction.
- **Architecture**: A modular Client-Server Model where the React UI securely communicates with a RESTful Express API. The backend processes document uploads locally, extracts content, and delegates reasoning tasks to the LLM layer before persisting results to MongoDB.

## Instructions on How to Run the Project

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Google Gemini API Key

### Backend Setup
1. Navigate to the `backend` directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the `backend` folder and add:
   \`\`\`env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   \`\`\`
4. Start the backend development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup
1. Navigate to the `frontend` directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open the displayed `localhost` link in your browser.
