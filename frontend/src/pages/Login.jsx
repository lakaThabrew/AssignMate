import React, { useState } from 'react';
import { useRole } from '../App';
import { BookOpen, User, GraduationCap, ArrowRight, ShieldCheck, Mail, Lock, UserPlus } from 'lucide-react';

export default function Login() {
  const { setRole, setIsLoggedIn, setUserInfo } = useRole();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role) => {
    // For demo/hackathon purposes, we use the name from input or a default
    const finalName = name || (role === 'student' ? 'Student User' : 'Lecturer User');
    setUserInfo({ name: finalName, email });
    setRole(role);
    setIsLoggedIn(true);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(207, 109, 252, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <BookOpen size={40} color="var(--color-secondary)" />
          </div>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>AssignMate <span className="header-accent">Pro</span></h1>
          <p style={{ color: '#aaa' }}>{isSignup ? 'Create your professional account' : 'Welcome back! Select your role'}</p>
        </div>

        {isSignup ? (
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '5px', display: 'block' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} style={{ paddingLeft: '45px' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '5px', display: 'block' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input type="email" placeholder="john@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} style={{ paddingLeft: '45px' }} />
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '5px', display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '45px' }} />
              </div>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: '#aaa', textAlign: 'center', marginBottom: '1rem' }}>Choose your default portal:</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => handleLogin('student')}
                className="btn btn-primary" 
                style={{ flex: 1, gap: '5px' }}
              >
                <GraduationCap size={20} /> Student
              </button>
              <button 
                onClick={() => handleLogin('lecturer')}
                className="btn btn-secondary" 
                style={{ flex: 1, gap: '5px' }}
              >
                <ShieldCheck size={20} /> Lecturer
              </button>
            </div>
            <button onClick={() => setIsSignup(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textAlign: 'center', marginTop: '1rem' }}>
              Already have an account? Sign In
            </button>
          </div>
        ) : (
          <>
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
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ background: 'var(--color-primary)', padding: '10px', borderRadius: '12px', color: 'var(--color-dark)' }}>
                  <GraduationCap size={24} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Student Portal</h3>
                  <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>View your progress & feedback</p>
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
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ background: 'var(--color-secondary)', padding: '10px', borderRadius: '12px', color: 'var(--color-dark)' }}>
                  <ShieldCheck size={24} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Lecturer Portal</h3>
                  <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>Create rubrics & manage class</p>
                </div>
                <ArrowRight size={18} color="#555" />
              </button>
            </div>
            <button onClick={() => setIsSignup(true)} className="btn btn-outline" style={{ width: '100%', gap: '10px' }}>
              <UserPlus size={20} /> Create New Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
