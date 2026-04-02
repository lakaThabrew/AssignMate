# AssignMate Pro

Rubric-aware academic evaluation platform powered by Google Gemini AI.

## 1. Document Purpose

This README presents AssignMate Pro in the required hackathon field-announcement style. It includes the problem statement, solution, team information, technical approach, architecture summary, and project run instructions.

## 2. Introduction

Academic assignment evaluation is often manual, time-consuming, and inconsistent across large student groups. AssignMate Pro is an education technology platform that helps students and lecturers evaluate assignment quality against structured rubric criteria using AI assistance.

## 3. Industry Domain (Selected by Team)

Education Technology (EdTech) and Generative AI.

## 4. Industry Selection Rules (Applied)

- The selected domain is directly related to teaching and learning workflows.
- The solution addresses a practical educational pain point with measurable impact.
- The same domain is consistently used across problem definition, system design, and implementation.

## 5. Objective of Industry Selection

- Define a clear problem around assignment quality and rubric alignment.
- Build a feasible system that supports both students and lecturers.
- Use AI as a practical assistant, not as a replacement for academic judgment.

## 6. Post-Selection Development Guidelines

- Development starts immediately after domain selection.
- Progress is tracked through regular commits and clear version history.
- Features are implemented incrementally and validated through lint/build checks.

## 7. Innovation and Solution Requirements

AssignMate Pro addresses a real gap in current academic workflows:

- Students usually receive rubric-based feedback too late.
- Lecturers spend significant time on repeated rubric interpretation and manual comments.

Innovation included in this solution:

- AI-assisted rubric creation from natural language descriptions.
- Criterion-by-criterion assignment analysis with feedback categories.
- Score-oriented insights and trend visibility through analytics panels.

The project is not only a basic upload-and-grade app; it combines structured rubric modeling with meaningful AI-generated feedback to improve pre-submission quality.

## 8. Technology and Development Flexibility

- AI is used as a supporting component for rubric parsing and evaluation.
- External APIs are used where relevant (Google Gemini).
- Open-source tools are integrated with project-specific logic and customization.

## 9. Development Policy

- Full coding and implementation were performed during the competition timeline.
- Work is maintained in a public GitHub repository.
- Commit history and branch usage are preserved for transparency.

## 10. GitHub Repository Requirement Compliance

This repository follows required hackathon expectations:

- Public repository with ongoing updates.
- Regular commits with logical progression.
- Structured project layout.
- README includes problem statement, proposed solution, team details, technical stack, architecture overview, and run steps.

## 11. Technical Approach

Approach categories used in this project:

- Artificial Intelligence and data-assisted evaluation workflows
- Digital platform architecture for student and lecturer use
- Automation of rubric interpretation and first-pass feedback generation
- Scalable service structure with separate frontend and backend layers

## 12. Final Hackathon Day Plan

Planned final-day execution:

- Demonstrate full student and lecturer flows
- Show live rubric creation and assignment evaluation
- Present analytics and feedback outputs
- Handle technical viva with architecture and implementation decisions

## 13. Final Presentation and Evaluation Plan

Presentation alignment with required format:

- 10-minute product presentation and live demo
- 5-minute technical viva
- Demo scope focuses on complete workflow and real value delivery

Cloud deployment is optional; architecture planning and deployment strategy can still be presented.

## 14. Evaluation Criteria Mapping

### 60% Technical Core

- Problem Identification: inefficient rubric-based grading and delayed feedback
- Innovation: AI rubric parsing + criterion-level assignment feedback
- Technical Implementation: full-stack web platform with integrated AI service
- System Design: modular frontend, REST backend, MongoDB persistence

### 30% Advanced Concepts

- Cloud and scalability readiness through separated service architecture
- Code quality controls via lint/build validation
- Security fundamentals in auth and API handling
- Entrepreneurial value through reusable institutional workflow support

### 10% Communication

- Clear demo story from problem to measurable outcome
- Focused technical explanation for design and AI usage decisions

## 15. Rules and Compliance

- The solution is original and domain-aligned.
- Development evidence is maintained through repository history.
- Team follows event rules and judge decisions.

---

## Problem Statement

Manual assignment evaluation consumes lecturer time and often delays actionable feedback to students. Students need earlier rubric-aligned guidance before final submission to reduce revision cycles and improve quality.

## Proposed Solution

AssignMate Pro is a rubric-aware academic evaluation platform where:

- Lecturers create or refine rubrics (including AI-assisted rubric generation).
- Students upload PDF or DOCX assignments.
- The system evaluates work against rubric criteria and returns structured feedback, score indicators, and improvement guidance.

## Team Details

- Team Name: EchoBinary
- University: University of Moratuwa
- Selected Domain: Education Technology (EdTech) and Generative AI

Team roles:

- Team Lead and Full Stack Developer: EchoBinary Team Member
- AI Researcher and Prompt Engineer: EchoBinary Team Member
- UI and UX Designer and Frontend Developer: EchoBinary Team Member
- Backend Architect and Database Engineer: EchoBinary Team Member

## Technology Stack and Architecture Overview

Technology stack:

- Frontend: React, Vite, Recharts, Three.js, Lucide React
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- AI Engine: Google Gemini via @google/genai
- Supporting libraries: multer, mammoth, pdf-parse, winston

High-level architecture:

- React frontend for role-specific UI, visualization, and upload flow
- Express backend REST APIs for auth, evaluation, rubrics, history, analytics, and logs
- MongoDB for users, rubrics, and evaluation records
- Gemini integration for rubric parsing and assignment analysis

## Instructions to Run the Project

Prerequisites:

- Node.js 18 or later
- npm
- MongoDB local instance or Atlas connection
- Gemini API key from https://aistudio.google.com/app/apikey

Install dependencies:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

Create environment file:

macOS/Linux:

```bash
cp backend/.env.example backend/.env
```

Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

Set environment values in backend/.env:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/assignmate
GEMINI_API_KEY=your_gemini_api_key_here
```

Run the system from project root:

```bash
npm run dev
```

Default local endpoints:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Backend API base routes:

- /api/auth
- /api/evaluate
- /api/history
- /api/rubrics
- /api/analytics
- /api/logs

## License

MIT
