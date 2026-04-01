import React from 'react';
import { ShieldCheck, Target, Zap, Award, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div>
      <div className="header-light">
        <h1>About <span className="header-accent">AssignMate Pro</span></h1>
        <p style={{ color: '#aaa', marginTop: '10px' }}>The next generation of AI-driven academic evaluation.</p>
      </div>

      <div className="card" style={{ padding: '3rem' }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Our <span style={{ color: 'var(--color-primary)' }}>Mission</span></h2>
            <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>
              AssignMate Pro was born out of a desire to bridge the gap between student effort and academic expectations. 
              We believe that constructive, instant feedback is the key to mastering any subject. 
              By leveraging cutting-edge Generative AI, we provide students with the insights they need to excel 
              long before they hit the final submit button.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'var(--color-primary)', filter: 'blur(60px)', opacity: 0.3 }}></div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'center', padding: '3rem' }}>
              <BookOpen size={80} color="var(--color-primary)" style={{ margin: '0 auto' }} />
              <h3 style={{ marginTop: '1.5rem' }}>Empowering Education</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="card">
          <Zap size={32} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
          <h3>Instant Evaluation</h3>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Stop waiting weeks for feedback. Get deep analysis on your assignment in under 30 seconds.</p>
        </div>
        <div className="card">
          <Target size={32} color="var(--color-secondary)" style={{ marginBottom: '1rem' }} />
          <h3>Rubric Aware</h3>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Our AI understands your specific lecturer requirements, ensuring you hit every single criterion.</p>
        </div>
        <div className="card">
          <ShieldCheck size={32} color="#2ecc71" style={{ marginBottom: '1rem' }} />
          <h3>Integrity First</h3>
          <p style={{ color: '#aaa', marginTop: '10px' }}>Built-in plagiarism pattern detection helps you maintain the highest standards of original work.</p>
        </div>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(193, 191, 255, 0.1), rgba(207, 109, 252, 0.1))', textAlign: 'center' }}>
        <Award size={48} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h2>Award-Winning AI Architecture</h2>
        <p style={{ color: '#ccc', maxWidth: '700px', margin: '1rem auto' }}>
          AssignMate Pro utilizes a proprietary LLM layering technique that cross-references document embeddings 
          with structured rubric criteria, providing 95% accuracy in score prediction compared to human graders.
        </p>
      </div>
    </div>
  );
}
