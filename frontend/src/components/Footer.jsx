import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ marginTop: '5rem', padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="grid-2" style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
          <div>
            <Link to="/" className="logo" style={{ marginBottom: '1.5rem', textDecoration: 'none' }}>
              <BookOpen size={28} /> AssignMate Pro
            </Link>
            <p style={{ color: '#aaa', maxWidth: '350px', lineHeight: '1.8' }}>
              Empowering students and lecturers with state-of-the-art AI academic evaluation tools. 
              Improve your results, instantly.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Dashboard</Link></li>
              <li><Link to="/about" style={{ color: '#aaa', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: '#aaa', textDecoration: 'none' }}>Contact Team</Link></li>
              <li><Link to="/results" style={{ color: '#aaa', textDecoration: 'none' }}>History</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: '#fff' }}>Connect With Us</h4>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Github size={24} color="#aaa" style={{ cursor: 'pointer' }} />
              <Twitter size={24} color="#aaa" style={{ cursor: 'pointer' }} />
              <Linkedin size={24} color="#aaa" style={{ cursor: 'pointer' }} />
            </div>
            <p style={{ marginTop: '2rem', color: '#555', fontSize: '0.9rem' }}>
              © 2024 AssignMate Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
