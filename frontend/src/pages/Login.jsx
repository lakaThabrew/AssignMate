import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { BookOpen, GraduationCap, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { setRole, setIsLoggedIn, setUserInfo } = useRole();

  const [tab, setTab]           = useState('signin');      // 'signin' | 'signup'
  const [role, setLocalRole]    = useState('student');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'signup' && !name.trim()) {
      return setError('Please enter your full name.');
    }
    if (!email.trim()) return setError('Please enter your email.');
    if (password.length < 4) return setError('Password must be at least 4 characters.');

    const finalName = tab === 'signup' ? name : (email.split('@')[0] || 'User');
    setUserInfo({ name: finalName, email });
    setRole(role);
    setIsLoggedIn(true);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff',
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    width: '100%',
    outline: 'none',
    fontSize: '0.95rem',
    marginBottom: 0,
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
          }}>
            <BookOpen size={30} color="#fff" />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>
            AssignMate <span className="header-accent">Pro</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
            AI-powered academic evaluation platform
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ marginBottom: 0 }}>

          {/* Sign In / Sign Up tabs */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)',
            borderRadius: '10px', padding: '4px', marginBottom: '1.5rem',
          }}>
            {['signin', 'signup'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                style={{
                  flex: 1, padding: '0.55rem', border: 'none', cursor: 'pointer',
                  borderRadius: '8px', fontWeight: '600', fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  background: tab === t
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                    : 'transparent',
                  color: tab === t ? '#fff' : '#888',
                }}
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name — signup only */}
            {tab === 'signup' && (
              <div>
                <label style={{ fontSize: '0.82rem', color: '#aaa', marginBottom: '6px', display: 'block' }}>Full Name</label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Samantha Perera"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#aaa', marginBottom: '6px', display: 'block' }}>Email Address</label>
              <input
                style={inputStyle}
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#aaa', marginBottom: '6px', display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  style={{ ...inputStyle, paddingRight: '3rem' }}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#666',
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role selector */}
            <div>
              <label style={{ fontSize: '0.82rem', color: '#aaa', marginBottom: '8px', display: 'block' }}>Select Role</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { key: 'student',  label: 'Student',  Icon: GraduationCap, color: 'var(--color-primary)' },
                  { key: 'lecturer', label: 'Lecturer', Icon: ShieldCheck,   color: 'var(--color-secondary)' },
                ].map(({ key, label, Icon, color }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLocalRole(key)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', padding: '0.7rem', borderRadius: '10px', cursor: 'pointer',
                      border: `2px solid ${role === key ? color : 'rgba(255,255,255,0.1)'}`,
                      background: role === key ? `${color}18` : 'transparent',
                      color: role === key ? color : '#666',
                      fontWeight: role === key ? '700' : '400',
                      transition: 'all 0.2s', fontSize: '0.9rem',
                    }}
                  >
                    <Icon size={18} /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', background: 'rgba(231,76,60,0.1)', padding: '0.6rem 0.875rem', borderRadius: '8px' }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '0.25rem' }}
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account & Continue'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.78rem', marginTop: '1.25rem' }}>
          AssignMate Pro · EchoBinary · University of Moratuwa
        </p>
      </div>
    </div>
  );
}
