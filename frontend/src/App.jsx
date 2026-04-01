import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Results from './pages/Results';
import RubricBuilder from './pages/RubricBuilder';
import History from './pages/History';
import { BookOpen, Home, Upload as UploadIcon, BarChart2, UserCircle, Settings } from 'lucide-react';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

function AppContent() {
  const { role, setRole } = useRole();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <BookOpen size={28} />
            AssignMate Pro
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Home size={18}/> {role === 'student' ? 'Student' : 'Lecturer'} Portal</span></Link>
            {role === 'student' ? (
              <Link to="/upload" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><UploadIcon size={18}/> New Evaluation</span></Link>
            ) : (
              <Link to="/rubrics" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Settings size={18}/> Rubric Builder</span></Link>
            )}
            <Link to="/results" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><BarChart2 size={18}/> History</span></Link>
            
            <div style={{ marginLeft: '10px', borderLeft: '1px solid #333', paddingLeft: '20px', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setRole(role === 'student' ? 'lecturer' : 'student')}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Switch to {role === 'student' ? 'Lecturer' : 'Student'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container" style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/rubrics" element={<RubricBuilder />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/results" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [role, setRole] = useState('student'); // Default role
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default App;
