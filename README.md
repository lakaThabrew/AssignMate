# AssignMate Pro 🎓

> **Rubric-aware academic evaluation platform powered by Google Gemini AI**
> Built for the University Hackathon — EdTech & Generative AI Category

---

## 🧩 Selected Domain
**Education Technology (EdTech) & Generative AI**

---

## 🚩 Problem Statement
Grading academic assignments is a time-consuming, manual process for educators. Students often lack detailed pre-submission feedback on how well their work aligns with the rubric criteria — leading to missed requirements and inefficient revision cycles.

---

## 💡 Proposed Solution
**AssignMate Pro** is a rubric-aware academic evaluation system that bridges the gap between student effort and lecturer expectations.

- **Lecturers** create structured grading rubrics (manually or via AI text parsing) and get class-wide analytics.
- **Students** upload their assignments (PDF/DOCX) to receive instant AI-generated feedback — criterion-by-criterion — before final submission.
- The system highlights **strengths**, **weaknesses**, **missing criteria**, predicts a **score**, and flags **plagiarism risk**.

---

## 👥 Team Details

| Role | Name |
|------|------|
| Team Lead / Full Stack Developer | Member 1 |
| AI Researcher / Prompt Engineer | Member 2 |
| UI/UX Designer / Frontend Dev | Member 3 |
| Backend Architect / DB Engineer | Member 4 |

- **Team Name**: EchoBinary 
- **University**: University of Moratuwa
- **Domain**: Education Technology (EdTech) & Generative AI

---

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), Recharts, Three.js, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| AI Engine | Google Gemini 1.5 Pro & Flash API |
| File Parsing | `pdf-parse`, `mammoth` (DOCX) |
| Dev Tooling | Concurrently, dotenv, multer |

### Architecture
```
┌────────────────────────────────────────────┐
│               React Frontend               │
│  (Vite · Recharts · Three.js · Context)    │
└───────────────────┬────────────────────────┘
                    │ REST API
┌───────────────────▼────────────────────────┐
│           Node.js / Express Backend         │
│  /api/evaluate  /api/history  /api/rubrics  │
└──────────┬──────────────────┬──────────────┘
           │                  │
    ┌──────▼──────┐   ┌───────▼───────┐
    │   MongoDB   │   │  Gemini AI    │
    │  (Mongoose) │   │  (LLM Layer)  │
    └─────────────┘   └───────────────┘
```

---

## ✨ Key Features

- 🔐 **Role-Based Authentication** — Student & Lecturer portals with account creation
- 📋 **AI Rubric Builder** — Generate structured criteria from raw text using Gemini
- 📄 **Document Upload** — Supports PDF and DOCX assignment files
- 🤖 **Deep AI Analysis** — Per-criterion evaluation with evidence quotes and coverage %
- 📊 **Rich Visualizations** — Radial score gauge, criteria bar chart, score history trend
- 💬 **Tabbed Feedback** — Strengths, Weaknesses, Missing Parts, and Suggestions
- 🛡 **Plagiarism Risk** — AI-powered originality detection flag
- 🧠 **Personalized Dashboard** — Role-specific stats and recent evaluation history

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Google Gemini API Key — [Get one here](https://aistudio.google.com/app/apikey)

### Quick Start (Recommended)
```bash
# 1. Clone the repo and install root dependencies
npm install

# 2. Set up backend environment
cp backend/.env.example backend/.env
# Edit backend/.env and add your GEMINI_API_KEY and MONGO_URI

# 3. Install all dependencies
cd backend && npm install
cd ../frontend && npm install && cd ..

# 4. Run both servers simultaneously
npm run dev
```
> The frontend will be available at `http://localhost:5173`
> The backend API runs at `http://localhost:5000`

### Backend `.env` Variables
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/assign_mate_pro
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📁 Project Structure

```
AssignMate/
├── frontend/
│   └── src/
│       ├── components/     # Navbar, Footer, Charts, FeedbackPanel, Hero
│       ├── context/        # RoleContext (global auth + role state)
│       ├── hooks/          # useEvaluations (custom data hook)
│       ├── pages/          # Dashboard, Upload, Results, History, About, Contact
│       └── services/       # api.js (centralized Axios service layer)
├── backend/
│   ├── models/             # Evaluation.js, Rubric.js (Mongoose schemas)
│   ├── routes/             # evaluate.js, history.js, rubrics.js
│   └── utils/              # gemini.js (AI evaluation + rubric parsing)
└── package.json            # Concurrently dev script
```

---

## 📸 App Screenshots

> _Add screenshots of the Login page, Dashboard, and Results page here_

---

## 📜 License
MIT — Built for educational and hackathon purposes.
