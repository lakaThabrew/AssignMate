# AssignMate Pro

Rubric-aware academic evaluation platform powered by Google Gemini.

## Overview

AssignMate Pro helps students and lecturers evaluate assignment quality against explicit rubric criteria.

- Lecturers can create and manage rubrics, including AI-assisted rubric generation.
- Students can upload PDF or DOCX assignments for AI-based criterion-by-criterion feedback.
- The platform provides strengths, weaknesses, missing criteria, estimated scoring, and analytics views.

## Core Features

- Role-based user flow (student and lecturer)
- Rubric management with AI-assisted parsing
- Assignment upload and analysis (PDF, DOCX)
- Evaluation history and dashboard analytics
- Feedback panels for strengths, weaknesses, and missing criteria
- Logging and basic auth flows (register, login, password reset token flow)

## Tech Stack

- Frontend: React + Vite, Recharts, Three.js
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- AI: Google Gemini (`@google/genai`)
- Utilities: multer, mammoth, pdf-parse, winston

## Project Structure

```text
AssignMate/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- hooks/
|   |   |-- pages/
|   |   |-- services/
|   |   `-- utils/
|   `-- package.json
|-- backend/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- server.js
|   |-- seed.js
|   |-- .env.example
|   `-- package.json
`-- package.json
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local instance or MongoDB Atlas)
- Gemini API key: https://aistudio.google.com/app/apikey

## Setup

1. Install dependencies at all levels.

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

2. Create backend environment file.

macOS/Linux:

```bash
cp backend/.env.example backend/.env
```

Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

3. Update `backend/.env` values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/assignmate
GEMINI_API_KEY=your_gemini_api_key_here
```

## Run

Run frontend and backend together from the project root:

```bash
npm run dev
```

Default local URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Available Scripts

Root (`package.json`):

- `npm run dev` - run frontend and backend concurrently
- `npm run frontend` - run frontend dev server
- `npm run backend` - run backend server

Frontend (`frontend/package.json`):

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Backend (`backend/package.json`):

- `npm start`
- `npm run dev`
- `npm run seed`

## API Base Routes

- `/api/auth`
- `/api/evaluate`
- `/api/history`
- `/api/rubrics`
- `/api/analytics`
- `/api/logs`

## Notes

- Frontend build may warn about large chunk sizes; this is a performance warning, not a build failure.
- The frontend has its own Vite template README in `frontend/README.md`; this file is the main project README.

## License

MIT
