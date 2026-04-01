import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, Upload as UploadIcon, BarChart2, Info, Mail, Settings, LogOut } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export default function Navbar() {
  const { role, isLoggedIn, setIsLoggedIn } = useRole();

  if (!isLoggedIn) return null;

  return (
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
          <Link to="/about" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Info size={18}/> About</span></Link>
          <Link to="/contact" className="nav-link"><span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><Mail size={18}/> Contact</span></Link>
          
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
  );
}
