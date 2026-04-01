import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Results from './pages/Results';
import RubricBuilder from './pages/RubricBuilder';
import History from './pages/History';
import Login from './pages/Login';
import { BookOpen, Home, Upload as UploadIcon, BarChart2, UserCircle, Settings, LogOut } from 'lucide-react';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

function AppContent() {
  const { role, setRole, isLoggedIn, setIsLoggedIn } = useRole();

  if (!isLoggedIn) {
    return (
      <div className="app">
        <main className="container" style={{ marginTop: '2rem' }}>
          <Login />
        </main>
      </div>
    );
  }

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
            
            <div style={{ marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div 
                style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.8rem', color: '#aaa', display: 'flex', alignItems: 'center', gap: '5px' }}
                title={`Currently in ${role} mode`}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: role === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)' }}></div>
                {role.toUpperCase()}
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: 'rgba(255,255,255,0.2)', color: '#aaa' }}
              >
                <LogOut size={16} /> Logout
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [role, setRole] = useState('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <RoleContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default App;
