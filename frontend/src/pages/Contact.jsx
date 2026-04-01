import React from 'react';
import { Mail, Github, Linkedin, Twitter, Users, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const teamMembers = [
    { name: 'Member 1 Name', role: 'Team Lead / Full Stack Developer', img: 'https://via.placeholder.com/150' },
    { name: 'Member 2 Name', role: 'AI Researcher / Prompt Engineer', img: 'https://via.placeholder.com/150' },
    { name: 'Member 3 Name', role: 'UI/UX Designer / Frontend Dev', img: 'https://via.placeholder.com/150' },
    { name: 'Member 4 Name', role: 'Backend Architect / Database Engineer', img: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      <div className="header-light">
        <h1>Meet the <span className="header-accent">Team</span></h1>
        <p style={{ color: '#aaa', marginTop: '10px' }}>The minds behind AssignMate Pro.</p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '3rem' }}>
        {teamMembers.map((member, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem auto' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', borderRadius: '50%', transform: 'scale(1.1)' }}></div>
              <img 
                src={member.img} 
                alt={member.name} 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '5px solid var(--color-bg)', position: 'relative', zIndex: 1 }}
              />
            </div>
            <h3>{member.name}</h3>
            <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>{member.role}</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Github size={18} color="#aaa" style={{ cursor: 'pointer' }} />
              <Linkedin size={18} color="#aaa" style={{ cursor: 'pointer' }} />
              <Mail size={18} color="#aaa" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={24} color="var(--color-primary)" /> Get in Touch
          </h2>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Message" rows="5"></textarea>
            <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={24} color="var(--color-secondary)" /> Contact Info
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                <Mail size={24} color="var(--color-primary)" />
              </div>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Email Us</p>
                <p style={{ fontWeight: 'bold' }}>hello@assignmate.pro</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                <Phone size={24} color="var(--color-secondary)" />
              </div>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Call Us</p>
                <p style={{ fontWeight: 'bold' }}>+94 123 456 789</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                <Users size={24} color="var(--color-accent)" />
              </div>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Office</p>
                <p style={{ fontWeight: 'bold' }}>Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
