import React, { useState } from 'react';
import { useRole } from '../App';
import { BookOpen, User, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { setRole, setIsLoggedIn } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role) => {
    // For demo/hackathon purposes, we skip real backend auth check for now
    // and just set the user as logged in with the selected role.
    setRole(role);
    setIsLoggedIn(true);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '3rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(207, 109, 252, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <BookOpen size={40} color="var(--color-secondary)" />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AssignMate <span className="header-accent">Pro</span></h1>
          <p style={{ color: '#aaa' }}>Select your role to enter the portal</p>
        </div>

        <div style={{ display: 'grid', gap: '15px', marginBottom: '2rem' }}>
          <button 
            onClick={() => handleLogin('student')}
            className="card" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              padding: '1.5rem', 
              marginBottom: 0, 
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              textAlign: 'left',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <div style={{ background: 'var(--color-primary)', padding: '10px', borderRadius: '12px', color: 'var(--color-dark)' }}>
              <GraduationCap size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Student Portal</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>Upload & analyze assignments</p>
            </div>
            <ArrowRight size={18} color="#555" />
          </button>

          <button 
            onClick={() => handleLogin('lecturer')}
            className="card" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              padding: '1.5rem', 
              marginBottom: 0, 
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              textAlign: 'left',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-secondary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
          >
            <div style={{ background: 'var(--color-secondary)', padding: '10px', borderRadius: '12px', color: 'var(--color-dark)' }}>
              <ShieldCheck size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Lecturer Portal</h3>
              <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>Rubrics & batch analytics</p>
            </div>
            <ArrowRight size={18} color="#555" />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#666' }}>
          By continuing, you agree to our <span style={{ color: 'var(--color-primary)' }}>Terms of Service</span> and <span style={{ color: 'var(--color-primary)' }}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
