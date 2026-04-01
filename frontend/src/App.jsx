import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Results from './pages/Results';
import { BookOpen, Home, Upload as UploadIcon, BarChart2 } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="logo">
              <BookOpen size={28} />
              AssignMate Pro
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Home size={18}/> Dashboard</span></Link>
              <Link to="/upload" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><UploadIcon size={18}/> New Evaluation</span></Link>
              <Link to="/results" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><BarChart2 size={18}/> Results</span></Link>
            </div>
          </div>
        </nav>

        <main className="container" style={{ marginTop: '2rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
