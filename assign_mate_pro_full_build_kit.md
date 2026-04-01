# 🚀 AssignMate Pro – Full Hackathon Build Kit

---

# 📌 1. Project Overview

**AssignMate Pro** is a rubric-aware academic evaluation system that analyzes student assignments against lecturer requirements to provide:
- Strengths
- Missing criteria
- Weak sections
- Improvement suggestions
- Plagiarism/originality risk
- Predicted grade

---

# 🎯 2. Target Users

## 👨‍🎓 Students
- Upload assignments
- Upload rubric
- Get feedback before submission

## 👨‍🏫 Lecturers
- Create rubric templates
- Review submissions faster
- Identify common weak areas

---

# 🔥 3. Full Feature List

## Core Features
- Assignment upload (PDF/DOCX)
- Rubric upload / creation
- Rubric parsing → structured criteria
- Section-wise analysis
- Requirement coverage detection
- AI feedback generation
- Score prediction
- Plagiarism risk detection

## Advanced Features
- Learning analytics (track weak areas over time)
- Multi-assignment history
- Lecturer dashboard with batch insights
- Highlight missing rubric criteria
- Explainable scoring system

## Optional (Stretch)
- Multi-language support
- Domain-specific evaluation (e.g., CS assignments)
- AI-generated improvement rewrite

---

# 🏗️ 4. System Architecture

## Flow
Upload → Extract Text → Parse Rubric → Analyze → Score → Feedback → Dashboard

## Components
- Frontend (React / Next.js)
- Backend API (FastAPI / Node)
- AI Engine (LLM + embeddings)
- Database (Firebase / MongoDB)
- File Processor (PDF/DOCX parser)

---

# 🗄️ 5. Database Schema

## Users
- id
- name
- email
- role (student/lecturer)

## Assignments
- id
- user_id
- title
- file_url
- extracted_text
- created_at

## Rubrics
- id
- user_id
- title
- criteria (JSON)

## Evaluations
- id
- assignment_id
- rubric_id
- score
- strengths
- weaknesses
- missing
- suggestions
- plagiarism_score

## History
- user_id
- past_scores
- weak_patterns

---

# 🖥️ 6. Page-by-Page UI Plan

## 1. Landing Page
- Project intro
- Login / Signup

## 2. Dashboard
- Student: recent analyses
- Lecturer: class overview

## 3. Upload Page
- Upload assignment
- Upload/select rubric

## 4. Results Page
- Score breakdown (charts)
- Strengths / Weaknesses
- Missing criteria
- Suggestions

## 5. Rubric Builder
- Add criteria
- Assign weights

## 6. History Page
- Past submissions
- Performance trends

---

# ⚙️ 7. Development Phases

## Phase 1 – MVP
- UI + upload
- Basic analysis (mock)

## Phase 2 – Core AI
- Rubric parser
- Feedback generation

## Phase 3 – Advanced
- Score prediction
- Plagiarism detection

## Phase 4 – Polish
- UI improvements
- Dashboard charts

---

# 🤖 8. Antigravity Prompt Pack

## Prompt 1 – Scaffold App
Build a full-stack web app called AssignMate Pro with student and lecturer roles, dashboards, upload system, and results page.

## Prompt 2 – Database
Design database schema for users, assignments, rubrics, and evaluations.

## Prompt 3 – Rubric Parser
Create a module that converts rubric text into structured criteria with weights.

## Prompt 4 – Analysis Engine
Implement assignment analysis comparing text with rubric criteria.

## Prompt 5 – Feedback Engine
Generate strengths, weaknesses, missing parts, and suggestions.

## Prompt 6 – Plagiarism
Add similarity scoring using embeddings.

## Prompt 7 – UI
Improve UI with charts, cards, and dashboards.

---

# 🧠 9. FINAL MASTER PROMPT (USE THIS IN ANTIGRAVITY)

Build a production-ready full-stack web application called AssignMate Pro.

Goal:
Create a rubric-aware academic evaluation platform for students and lecturers.

Core Features:
- Upload assignment (PDF/DOCX)
- Upload or create rubric
- Parse rubric into structured criteria
- Analyze assignment vs rubric
- Generate strengths, weaknesses, missing criteria
- Provide improvement suggestions
- Predict score
- Show plagiarism/originality risk
- Store results history

Users:
- Students: upload + feedback
- Lecturers: rubric + review

Tech Stack:
- Frontend: React or Next.js
- Backend: FastAPI or Node.js
- Database: Firebase or MongoDB

UI Requirements:
- Clean academic dashboard
- Score visualization
- Highlight missing rubric criteria

Important:
- Do NOT build a chatbot
- Use structured scoring logic
- Modular architecture
- Clean, maintainable code

Start by scaffolding the full project and then implement features step-by-step.

---

# 🏁 DONE

You can now paste this into Antigravity and start building 🚀

